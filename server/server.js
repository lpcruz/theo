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
const Slack = require('./slack');
const Yelp = require('./yelp');
const Weather = require('./weather');
const SpotifyClient = require('./spotify-client');
const SpotifyAPI = require('./spotify');

class Server {
  constructor() {
    this.clientId = env.SLACK.SLACK_CLIENT_ID;
    this.clientSecret = env.SLACK.SLACK_CLIENT_SECRET;
    this.PORT = 4390;
    this.slack = new Slack();
    this.yelp = new Yelp();
    this.weather = new Weather();
    this.spotify = new SpotifyAPI(SpotifyClient);
  }

  setUp() {
    return this
      .init(this.PORT)
      .auth()
      .get('/')
      .get('/oauth')
      .get('/slack/events')
      .initSlackListener();
  }
    
  async initSlackListener() {
    await app.use('/slack/events', slackEvents.expressMiddleware());
    slackEvents.on('reaction_added', async (message, body) => {
      const playlistSearch = await this.spotify.searchPlaylists(message.reaction);
      const topPlaylist = playlistSearch.body.playlists.items[0];
      this.slack.notify(`I'm feeling like ${message.reaction} too <@${body.event.user}>\nHere's a playlist that has to do with ${message.reaction}:\nPlaylist: ${topPlaylist.name}\nLink: ${topPlaylist.external_urls.spotify}\nEnjoy!\n`)
    });

    await slackEvents.on('app_mention', (message, body) => {
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
            this.slack.notify(`I know a great place to get some${search} called <${biz.url}|${biz.name}>. It has a ${biz.rating}/5 rating:\n\n*${biz.name}*\n${biz.location.display_address}\n\nHere's what someone had to say about it:\n\n"${review}"`); 
          })
        })
      }

      // weather
      if (!message.subtype && message.text.match(PATTERNS.WEATHER)) {
        const location = message.text.split('in').pop();
        this.weather.getTemp(location).then(weather => {
          if (weather.main === undefined) {
            this.slack.notify(`Sorry about that! I can't seem to get the any weather information in${location} at this time.`);
          } else {
            this.slack.notify(`It is currently ${Math.floor(weather.main.temp)}°F in${location} with ${weather.weather[0].description}`);
          }
        })
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
    app.get('/oauth', function(req, res) {
      if (!req.query.code) {
        res.status(500);
        res.send({"Error": "Looks like we're not getting code."});
        console.log("Looks like we're not getting code.");
      } else {
        request({
          url: 'https://slack.com/api/oauth.access',
          qs: {code: req.query.code, client_id: this.clientId, client_secret: this.clientSecret},
          method: 'GET', 
        
        }, function (error, res, body) {
          if (error) {
            console.log(error);
          } else {
            res.json(body);
        
          }
        })
      }
    })
    return this;
  }
}

module.exports = Server;