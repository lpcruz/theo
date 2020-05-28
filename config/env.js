module.exports = {
  /* eslint-disable no-undef */
  SLACK: {
    SLACK_CLIENT_ID: process.env.SLACK_CLIENT_ID,
    SLACK_CLIENT_SECRET: process.env.SLACK_CLIENT_SECRET,
    SLACK_SIGNING_SECRET: process.env.SLACK_SIGNING_SECRET,
    NOM_NOM_URI: process.env.NOM_NOM_URI,
    MUSIC_URI: process.env.MUSIC_URI,
    ANNOUNCEMENTS_URI: process.env.ANNOUNCEMENTS_URI,
    SPANISH_PRACTICE_URI: process.env.SPANISH_PRACTICE_URI,
    DEV_URI: process.env.DEV_URI,
    WORKOUTS_URI: process.env.WORKOUTS_URI
  },
  
  YELP: {
    YELP_API_KEY: process.env.YELP_API_KEY,
  },

  WEATHER: {
    WEATHER_API_KEY: process.env.WEATHER_API_KEY
  },

  SPOONACULAR: {
    SPOONACULAR_API_KEY: process.env.SPOONACULAR_API_KEY
  }
}