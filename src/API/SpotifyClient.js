require('dotenv').config();
const Spotify = require('spotify-web-api-node');

const API = new Spotify({
  /* eslint-disable no-undef */
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET
});

module.exports = API;