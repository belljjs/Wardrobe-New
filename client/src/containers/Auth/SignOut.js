import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

class SignOut extends Component {
    // dispatch logout at starting
    componentDidMount () {
        this.props.onSignOut();
    }

    render () {
        return <Redirect to="/" />;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSignOut: () => { 
            dispatch(actions.signOut())
            dispatch(actions.weatherDelete())
        }
    };
};

export default connect(null, mapDispatchToProps)(SignOut);