import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    weatherName: null ,
    weatherIcon: null ,
    highTemp: null ,
    lowTemp: null ,
    error: null

};


const weatherStore = (state, action) => {
    return updateObject( state, { 
        weatherName: action.weatherName ,
        weatherIcon: action.weatherIcon ,
        highTemp: action.highTemp ,
        lowTemp: action.lowTemp 
     } );
};

const weatherReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.WEATHER_STORE: return weatherStore(state, action);
        default:
            return state;
    }
};

export default ({weatherInfo: weatherReducer});
