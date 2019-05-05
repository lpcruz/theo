const request = require('request');

class Weather { 
    getTemp(city) {
        return new Promise((resolve, reject) => {
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.WEATHER_API_KEY}`
            request(url, function (err, response, body) {
                const json = JSON.parse(body);
                resolve(json);
              })
          })
        }
}

module.exports = Weather;
