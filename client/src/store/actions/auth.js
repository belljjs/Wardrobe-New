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
    // localStorage.removeItem('token');
    // localStorage.removeItem('expirationDate');
    // localStorage.removeItem('userId');
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
                 console.log("response:",response.request.response);
                //  const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                //  localStorage.setItem('token', response.data.idToken);
                //  localStorage.setItem('expirationDate', expirationDate);
                //  localStorage.setItem('userId', response.data.localId);
                
                 dispatch(authSuccess(response.data.token, response.data.userId, response.data.message ));
                 dispatch(checkAuthTimeout(3600)); // 1 hour 
             })
             .catch(error => {
                 // Here axios wrap response with error object
                console.log("error in request:", error)       
                 dispatch(authFail(error.response.data));
             });
     };
 };