import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData:authData
    };
}
export const authFail = (err) => {
    return {
        type: actionTypes.AUTH_FAIL,
        err: err
    };
}
export const auth = (firstName, lastName, email, password) => {
    return dispatch => {
        console.log("*** In auth - action")
        dispatch(authStart())
        const authData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        }
        axios.post('/api/authentication/sign-up', authData)
        .then(response => {
            console.log(response);
            dispatch(authSuccess(response.data));
        } )
        .catch(err =>{
            console.log(err);
            dispatch(authFail(err));
        })
    };
};


// getItems = async () => {
//     const response = await axios('/api/item/itemsAll')
