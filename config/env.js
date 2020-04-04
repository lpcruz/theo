module.exports = {
  SLACK: {
    SLACK_CLIENT_ID: process.env.SLACK_CLIENT_ID,
    SLACK_CLIENT_SECRET: process.env.SLACK_CLIENT_SECRET,
    SLACK_SIGNING_SECRET: process.env.SLACK_SIGNING_SECRENT,
    SLACK_URI: process.env.SLACK_URI,
  },
  
  YELP: {
    YELP_API_KEY: process.env.YELP_API_KEY,
  },

  WEATHER: {
    WEATHER_API_KEY: process.env.WEATHER_API_KEY
  }
}