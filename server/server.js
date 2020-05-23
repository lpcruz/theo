require('dotenv').config();
const express = require('express');
const request = require('request');
const slackEventsApi = require('@slack/events-api');
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

class Server {
  constructor() {
    this.slack = new Slack();
    this.yelp = new Yelp();
    this.weather = new Weather();
    this.spotify = new SpotifyAPI(SpotifyClient);
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
    slackEvents.on('reaction_added', async message => {
      const playlistSearch = await this.spotify.searchPlaylists(message.reaction);
      const randomPlaylist = playlistSearch.body.playlists.items[Math.floor(Math.random() * playlistSearch.body.playlists.items.length)];
      this.slack.sharePlaylist(message, randomPlaylist);
    });

    await slackEvents.on('app_mention', async (message, body) => {
      console.log(`Received a message event: user ${body.event.user} in channel ${body.event.channel} says ${body.event.text}`);
      // greetings
      if (!message.subtype && message.text.match(PATTERNS.GREETINGS)) {
        this.slack.notify(`Hey <@${body.event.user}>!, how are you?`);
      }

      // food & drink
      if (!message.subtype && message.text.match(PATTERNS.SEARCH)) {
        const search = message.text.split('search').pop();
        const location = message.text.split('in').pop();
        this.yelp.getBiz(search, location).then(biz => {
          this.yelp.getBizReviews(biz.alias).then(review => {
            this.slack.shareYelpBusiness(`I know a great place to get some${search} called <${biz.url}|${biz.name}>. It has a ${biz.rating}/5 rating:\n\n*${biz.name}*\n${biz.location.display_address}`, review);
          })
        })
      }

      // weather
      if (!message.subtype && message.text.match(PATTERNS.WEATHER)) {
        const location = message.text.split('in').pop();
        this.weather.getTemp(location).then(weather => {
          if (weather.main === undefined) {
            this.slack.giveTheWeather(`Sorry about that! I can't seem to get the any weather information in${location} at this time.`, weather);
          } else {
            this.slack.giveTheWeather(`Here's the weather in${location}`, weather);
          }
        })
      }

      //spotify
      if (!message.subtype && message.text.match(PATTERNS.SPOTIFY_PLAYLIST)) {
        const query = message.text.split('feeling').pop()
        const playlistSearch = await this.spotify.searchPlaylists(query);
        const randomPlaylist = playlistSearch.body.playlists.items[Math.floor(Math.random() * playlistSearch.body.playlists.items.length)];
        this.slack.sharePlaylist(message, randomPlaylist);
      }

    });
    return this;
  }  

  init(port) {
    app.listen(port, function () {
      console.log(`Bot listening on ${port}`);
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