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

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.WEATHER_STORE: {
            const result = weatherStore(state, action);
            console.log("**** result:",result)
            return result;
        }
        default:
            return state;
    }
};

export default reducer;
