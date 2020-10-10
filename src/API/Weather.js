const env = require('../../config/env');

class Weather {
  constructor(request) {
    this.request = request;
  }
  async getTemp(city) {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${env.WEATHER.WEATHER_API_KEY}`;
    const res = await this.request(url);
    return JSON.parse(res)

  }
}

module.exports = Weather;
