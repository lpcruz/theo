'use strict';
class Weather {
  constructor(request, env) {
    this.request = request;
    this.env = env;
  }

  async getTemp(city) {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${this.env.WEATHER.WEATHER_API_KEY}`;
    const res = await this.request(url);
    return JSON.parse(res)
  }
}

module.exports = Weather;
