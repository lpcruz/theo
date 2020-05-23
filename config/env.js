module.exports = {
  /* eslint-disable no-undef */
  SLACK: {
    SLACK_CLIENT_ID: process.env.SLACK_CLIENT_ID,
    SLACK_CLIENT_SECRET: process.env.SLACK_CLIENT_SECRET,
    SLACK_SIGNING_SECRET: process.env.SLACK_SIGNING_SECRET,
    NOM_NOM_URI: process.env.NOM_NOM_URI,
    MUSIC_URI: process.env.MUSIC_URI
  },
  
  YELP: {
    YELP_API_KEY: process.env.YELP_API_KEY,
  },

  WEATHER: {
    WEATHER_API_KEY: process.env.WEATHER_API_KEY
  }
}