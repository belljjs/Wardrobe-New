const request = require('request-promise');

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

class Weather {
    static retrieveByCity (city, callback) {
        request({
          uri: `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=imperial`,
          json: true
        }).then((res) => {
          callback(res);
        }).catch((error) => {
          console.log(error);
          callback({ error: 'Could not reach OpenWeatherMap API.' });
        });
      }
    
}

module.exports = Weather;