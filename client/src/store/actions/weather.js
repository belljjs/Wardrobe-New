
import * as actionTypes from './actionTypes';

export const weatherStore= (weatherInfo ) => {
    return {
        type: actionTypes.WEATHER_STORE,
        weatherName: weatherInfo.weatherName,
        weatherIcon: weatherInfo.weatherIcon,
        highTemp: weatherInfo.highTemp,
        lowTemp: weatherInfo.lowTemp,
        cityName: weatherInfo.cityName,
     };
}
