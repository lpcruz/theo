require('dotenv').config();
const path = require('path');
const figlet = require('figlet');
const cron = require('node-cron');
const env = require('../config/env');
const PATTERNS = require('../shared/patterns');
const Slack = require('../src/API/Slack');
const Yelp = require('../src/API/Yelp');
const Weather = require('../src/API/Weather');
const SpotifyClient = require('../src/API/SpotifyClient');
const SpotifyAPI = require('../src/API/Spotify');
const Spoonacular = require('../src/API/Spoonacular');
const Unsplash = require('../src/API/Unsplash');
const { getWodForToday } = require('../cronjobs/wodbot');

class Server {
  constructor(express, request, slackEventsApi) {
    this.slack = new Slack(request);
    this.slackEvents = slackEventsApi.createEventAdapter(
      env.SLACK.SLACK_SIGNING_SECRET, {
        includeBody: true
      });
    this.yelp = new Yelp();
    this.weather = new Weather();
    this.spotify = new SpotifyAPI(SpotifyClient);
    this.spoonacular = new Spoonacular();
    this.unsplash = new Unsplash();
    this.app = express();
  }

  setUp() {
    return this
      .init(env.PORT || 4390)
      .auth()
      .get('/')
      .get('/oauth')
      .get('/slack/events')
      .initSlackListener();
  }
    
  async initSlackListener() {
    await this.app.use('/slack/events', this.slackEvents.expressMiddleware());
    // reaction trigger
    await this.slackEvents.on('reaction_added', async message => {
      const playlistSearch = await this.spotify.searchPlaylists(message.reaction);
      const randomPlaylist = playlistSearch.body.playlists.items[Math.floor(Math.random() * playlistSearch.body.playlists.items.length)];
      this.slack.sharePlaylist({ message, randomPlaylist });
    });

    await this.slackEvents.on('app_mention', async message => {
      console.log(`Received a message event: user ${message.user} in channel ${message.channel} says ${message.text}`);
      // greetings
      if (!message.subtype && message.text.match(PATTERNS.GREETINGS)) {
        this.slack.greet({ message });
      }

      // food & drink
      if (!message.subtype && message.text.match(PATTERNS.SEARCH)) {
        const search = message.text.split('search').pop();
        const location = message.text.split('in').pop();
        const biz = await this.yelp.getBiz(search, location);
        const review = await this.yelp.getBizReviews(biz.alias);
        this.slack.shareYelpBusiness({ message, search, biz, review });
      }

      // recipes
      if (!message.subtype && message.text.match(PATTERNS.RECIPES)) {
        const query = message.text.split('for').pop().trim();
        const res = await this.spoonacular.getRecipes(query);
        const recipes = JSON.parse(res);
        const randomRecipe = recipes.results[Math.floor(Math.random() * recipes.results.length)];
        const photoSearch = JSON.parse(await this.unsplash.getPhoto(query));
        let photo;
        if (photoSearch.results.length === 0) {
          photo = 'https://previews.123rf.com/images/pavelstasevich/pavelstasevich1811/pavelstasevich181101065/112815953-no-image-available-icon-flat-vector.jpg';
        } else {
          photo = photoSearch.results[0].urls.thumb;
        }
        this.slack.shareRecipeList({ message, query, randomRecipe, photo });
      }

      // recipe based on ingredients
      if (!message.subtype && message.text.match(PATTERNS.INGREDIENTS_BASED_RECIPE)) {
        const query = message.text.split('using').pop().trim().split(',').join('');
        const res = await this.spoonacular.getRecipesBasedOnIngredients(query);
        const recipes = JSON.parse(res);
        const result = recipes[Math.floor(Math.random() * recipes.length)];
        const search = JSON.parse(await this.spoonacular.getRecipes(result.title));
        const randomRecipe = search.results[[Math.floor(Math.random() * recipes.length)]];
        const photo = result.image;
        this.slack.shareRecipeList({ message, query, randomRecipe, photo });
      }

      // weather
      if (!message.subtype && message.text.match(PATTERNS.WEATHER)) {
        const location = message.text.split('in').pop();
        const weather = await this.weather.getTemp(location);
        this.slack.giveTheWeather({ message, location, weather });
      }

      // spotify feelings
      if (!message.subtype && message.text.match(PATTERNS.SPOTIFY_PLAYLIST)) {
        const query = message.text.split('feeling').pop()
        const playlistSearch = await this.spotify.searchPlaylists(query);
        const randomPlaylist = playlistSearch.body.playlists.items[Math.floor(Math.random() * playlistSearch.body.playlists.items.length)];
        this.slack.sharePlaylist({ message, randomPlaylist });
      }

      // help
      if (!message.subtype && message.text.match(PATTERNS.HELP)) {
        this.slack.help({ message });
      }

    });
    return this;
  }

  wod() {
    const freq = '00 18 * * *';
    const callback = () => getWodForToday(env.SLACK.WORKOUTS_URI);
    const options = { timezone: 'America/New_York' };
    cron.schedule(freq, callback, options).start();
  }

  init(port) {
    this.app.listen(port, () => {
      figlet('Theo', (err, data) => {
        if (err) {
          console.log('Something went wrong...');
          console.dir(err);
        }
        console.log(data);
        console.log(`Theo listening on ${port}`);
      });
    })
    return this;
  }

  get(route) {
    this.app.get(route, (req, res) => {
      /* eslint-disable no-undef */
      res.sendFile('index.html', { root: path.join(__dirname, '../public/')});
    })
    return this;
  }

  auth() {
    this.app.get('/oauth', (req, res) => {
      if (!req.query.code) {
        res.status(500);
        res.send({ 'Error': 'Something went wrong with authenticating Slack!' });
        console.log('Something went wrong with authenticating Slack!');
      } else {
        request({
          url: 'https://slack.com/api/oauth.access',
          qs: {
            code: req.query.code,
            client_id: env.SLACK.SLACK_CLIENT_ID,
            client_secret: env.SLACK.SLACK_CLIENT_SECRET
          },
          method: 'GET',
        
        }, (error, res, body) => {
          if (error) {
            console.log(error);
          } else {
            res.json(body);
          }
        })
      }
    });
    return this;
  }
}

module.exports = Server;