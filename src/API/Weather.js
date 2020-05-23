const request = require('request');
const env = require('../../config/env');

class Weather { 
  getTemp(city) {
    return new Promise((resolve) => {
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${env.WEATHER.WEATHER_API_KEY}`
      request(url, function (err, response, body) {
        const json = JSON.parse(body);
        resolve(json);
      })
    })
  }
}

module.exports = Weather;
