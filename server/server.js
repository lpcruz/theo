require('dotenv').config();
const express = require('express');
const request = require('request-promise');
const slackEventsApi = require('@slack/events-api');
const figlet = require('figlet');
const app = express();

const env = require('../config/env');
const PATTERNS = require('../shared/patterns');
const slackEvents = slackEventsApi.createEventAdapter(
  env.SLACK.SLACK_SIGNING_SECRET, {
    includeBody: true
  });
const Slack = require('../src/API/Slack');
const Yelp = require('../src/API/Yelp');
const Weather = require('../src/API/Weather');
const SpotifyClient = require('../src/API/SpotifyClient');
const SpotifyAPI = require('../src/API/Spotify');
const Covid19 = require('../src/API/Covid19');

class Server {
  constructor() {
    this.slack = new Slack();
    this.yelp = new Yelp();
    this.weather = new Weather();
    this.spotify = new SpotifyAPI(SpotifyClient);
    this.covid19 = new Covid19(request);
  }

  setUp() {
    return this
      .init(4390)
      .auth()
      .get('/')
      .get('/oauth')
      .get('/slack/events')
      .initSlackListener();
  }
    
  async initSlackListener() {
    await app.use('/slack/events', slackEvents.expressMiddleware());
    // reaction trigger
    await slackEvents.on('reaction_added', async message => {
      const playlistSearch = await this.spotify.searchPlaylists(message.reaction);
      const randomPlaylist = playlistSearch.body.playlists.items[Math.floor(Math.random() * playlistSearch.body.playlists.items.length)];
      this.slack.sharePlaylist({ message, randomPlaylist });
    });

    await slackEvents.on('app_mention', async message => {
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

      // covid19
      if (!message.subtype && message.text.match(PATTERNS.COVID19)) {
        const state = message.text.split('for').pop();
        const covid19StateData = await this.covid19.getCovidDataByState(state)
        this.slack.giveCovidDataByState({ message, covid19StateData });
      }

    });
    return this;
  }  

  init(port) {
    app.listen(port, () => {
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
    app.get(route, function(req,res) {
      res.send(`Server is up and running. Nothing to see here.`);
    })
    return this;
  }

  auth() {
    app.get('/oauth', (req, res) => {
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