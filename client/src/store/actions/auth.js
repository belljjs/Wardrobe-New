import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId, message) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId,
        message: message
     };
}
export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
}

export const signOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_SIGNOUT
    };
};
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(signOut());
        }, expirationTime * 1000);
    };
};

export const auth = (firstName, lastName, email, password, isSignup) => {
    return dispatch => {
        console.log("*** In auth dispatch, isSignup : ", isSignup)
        dispatch(authStart())
        const authData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        }
         //url for sign in
         let url = '/api/authentication/sign-in';
         if (isSignup) {
             // url for sign up
             url = '/api/authentication/sign-up';
         }
         console.log("url:", url)
         axios.post(url, authData)
             .then(response => {
                console.log("response:",response);
                const expirationDate = new Date(new Date().getTime() + response.data.exp * 1000);
                console.log("expirationDate:",expirationDate);
                
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.userId);

                // pass on the token!
                 dispatch(authSuccess(response.data.token, response.data.userId, response.data.message ));
                 dispatch(checkAuthTimeout(response.data.exp)); 
             })
             .catch(error => {
                 // Here axios wrap response with error object
                console.log("error in request:", error)       
                 dispatch(authFail(error.response.data));
             });
     };
 };

// Used in app.js to check authentication status to sign in user automatically (for the case of refresh)
// if there is valid token. (for the case of reload the app)

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        // just to make sure
        if (!token) {
            dispatch(signOut());

        // check expiration 
        } else { 
            //string --> date type
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            // expired 
            if (expirationDate <= new Date()) { 
                dispatch(signOut());
            // then need authSuccess 
            } else { 
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                // calculate time remained 
                const expirationTime = (expirationDate.getTime() - new Date().getTime()) / 1000 ;
                dispatch(checkAuthTimeout(expirationTime));
            }   
        }
    };
};