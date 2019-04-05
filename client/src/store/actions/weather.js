
import * as actionTypes from './actionTypes';

export const weatherStore= ( weatherInfo ) => {
    return {
        type: actionTypes.WEATHER_STORE,
        cityName: weatherInfo.cityName,
        name: weatherInfo.name ,
        description: weatherInfo.description ,
        icon: weatherInfo.icon ,
        temp: weatherInfo.temp,
        highTemp: weatherInfo.highTemp ,
        lowTemp: weatherInfo.lowTemp ,
        humidity: weatherInfo.humidity,
        wind: weatherInfo.wind,
     };
}
export const proposalStore= ( proposalInfo ) => {
    return {
        type: actionTypes.PROPOSAL_STORE,
        proposal: proposalInfo
     };
}
export const weatherDelete = () => {

    return {
        type: actionTypes.WEATHER_DELETE
    };
};
export const proposalDelete = () => {

    return {
        type: actionTypes.PROPOSAL_DELETE
    };
};
