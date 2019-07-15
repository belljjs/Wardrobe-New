import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

class GuestRoute extends Component {
    // dispatch logout at starting
    componentDidMount () {
        const userId = 'guest' + Math.floor(Date.now());
        const email = userId + 'gmail.com'
        console.log("userId:", userId)
        console.log("email:", email)
        this.props.onAuth( userId, userId, email, userId , true );
    }

    render () {
        return <Redirect to="/start" />;
    }
}

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        message: state.auth.message,
        isAuthenticated: state.auth.token !== null,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (firstName,lastName, email, password, isSignup ) => dispatch( actions.auth(firstName,lastName, email, password, isSignup) ),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GuestRoute);