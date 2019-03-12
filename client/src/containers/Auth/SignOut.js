import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

class SignOut extends Component {
    // dispatch logout at starting
    componentDidMount () {
        console.log("sign out at SignOut component");
        this.props.onSignOut();
    }

    render () {
        return <Redirect to="/" />;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSignOut: () => dispatch(actions.signOut())  
    };
};

export default connect(null, mapDispatchToProps)(SignOut);