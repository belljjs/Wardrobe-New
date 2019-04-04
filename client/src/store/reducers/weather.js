import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    weatherName: null ,
    weatherIcon: null ,
    highTemp: null ,
    lowTemp: null ,
    cityName: null,
    error: null
};

const weatherStore = (state, action) => {
    console.log("**** In weather reducer, before state:",state);
    return updateObject( state, { 
        weatherName: action.weatherName ,
        weatherIcon: action.weatherIcon ,
        highTemp: action.highTemp ,
        lowTemp: action.lowTemp,
        cityName: action.cityName,
     } );
};

const weatherDelete = (state, action) => {
    return updateObject(state, { weatherName: null, weatherIcon: null, highTemp: null,lowTemp: null, cityName: null, error: null });
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.WEATHER_STORE: {
            const result = weatherStore(state, action);
            console.log("**** result of weatherStore:",result)
            return result;
        }
        case actionTypes.WEATHER_DELETE: {
            const result = weatherDelete(state, action);
            console.log("**** result of weatherDelete:",result)
            return result;
        }
        default:
            return state;
    }
};

export default reducer;
