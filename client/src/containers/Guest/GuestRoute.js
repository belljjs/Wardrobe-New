import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../../UI/Spinner/Spinner';
import axios from 'axios';
import * as actions from '../../store/actions/index';

class GuestRoute extends Component {
    state= {
        loading: true
    }

    copyData = async (userId) => {
        console.log("*** userId in copyData : ", userId);
        try{
            let response = await axios.get('/api/guest',{params: {userId: userId} } ) 
            console.log("** response of '/api/guest' *** :",response);   
        }
        catch(error){
            console.log(error);
        }
        
    };
    componentDidMount = async () => {
        this.props.onAuthStart();
        const userName = 'guest' + Math.floor(Date.now());
        const authData = {
            firstName: 'guest',
            lastName: 'guest',
            email: userName + 'gmail.com',
            password: userName
        }
        try{
            let response = await axios.post('/api/authentication/sign-up', authData)

            console.log(" Response of request sign up : ", response);

            const expirationDate = new Date(new Date().getTime() + response.data.exp * 1000);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', response.data.userId);

            const userId = localStorage.userId;
            console.log("*** userId in componentDidMount : ", userId);
            this.copyData(userId);
            this.props.onAuthSuccess(response.data.token, response.data.userId, response.data.message );
            
        }
        catch(error) {
               console.log(" Response of request(error) sign up : ", error.response);
               this.props.onAuthFail(error.response.data);
        }
    }
    startHandler =() => {
        this.setState({ loading: false});
    }

    render () {
        let processing = <Spinner />
        if (this.state.loading) {
            processing = <Redirect to="/start" /> ;
        }
        return (
            <div>
                {processing}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        error: state.auth.error,
        loading: state.auth.loading,
        message: state.auth.message,
        isAuthenticated: state.auth.token !== null,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (firstName,lastName, email, password, isSignup ) => dispatch( actions.auth(firstName,lastName, email, password, isSignup) ),
        onAuthSuccess: (token,userId,message ) => dispatch( actions.authSuccess(token,userId,message) ),
        onAuthStart: ( ) => dispatch( actions.auth() ),
        onAuthFail: (error) => dispatch( actions.authFail(error) ),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GuestRoute);