import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    cityName: null,
    name: null ,
    description: null ,
    icon: null ,
    temp: null,
    highTemp: null ,
    lowTemp: null ,
    humidity: null,
    wind: null,
    error: null
};

const weatherStore = (state, action) => {
    console.log("**** In weather reducer, state:",state);
    console.log("**** In weather reducer, action:",action);

    return updateObject( state, { 
        cityName: action.cityName ,
        name: action.name ,
        description: action.description ,
        icon: action.icon ,
        temp: action.temp,
        highTemp: action.highTemp ,
        lowTemp: action.lowTemp ,
        humidity: action.humidity,
        wind: action.wind,
     } );
};

const weatherDelete = (state, action) => {
    return updateObject(state, 
        { 
            cityName: null,
            name: null ,
            description: null ,
            icon: null ,
            temp: null,
            highTemp: null ,
            lowTemp: null ,
            humidity: null,
            wind: null,
            error: null
        });
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
