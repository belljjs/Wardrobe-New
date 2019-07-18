import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actions from '../../store/actions/index';

class GuestRoute extends Component {

    copyData = async (userId) => {
        console.log("*** userId in copyData : ", userId);
        
        const response = await axios.get('/api/guest',
            {params: {userId: userId} }
        ) 
        console.log("** response.status:",response.status);   
    };


    componentDidMount = async () => {
    //     this.getCityList();   // get the cities in the begining
    //     if(this.props.weather.name) {
    //       const proposal = await this.getProposal(this.props.weather);
    //       this.setState( {proposal : proposal});
    //     }
    //   }

    // createUser = async()=> {

    
        // auth start()//
        const firstName = 'guest' + Math.floor(Date.now());
        const authData = {
            firstName: firstName,
            lastName: firstName,
            email: firstName + 'gmail.com',
            password: firstName
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

    render () {
        // this.createUser();
        return <Redirect to="/start" />;
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
        onAuthFail: (error ) => dispatch( actions.authFail(error) ),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GuestRoute);