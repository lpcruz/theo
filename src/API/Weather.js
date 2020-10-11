'use strict';
class Weather {
  constructor(request, env) {
    this.request = request;
    this.weatherApiKey = env.WEATHER.WEATHER_API_KEY;
  }

  async getTemp(city) {
    const endpoint = `${city}&units=imperial&appid=${this.weatherApiKey}`;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${endpoint}`;
    const res = await this.request(url);
    return JSON.parse(res);
  }
}

module.exports = Weather;
