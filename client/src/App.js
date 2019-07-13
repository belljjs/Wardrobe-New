import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import { Route, Switch,withRouter , Redirect} from 'react-router-dom';
import Guest from './containers/Guest/Guest';
import Home from './containers/Home/Home';
import Closet from './containers/Closet/Closet';
import Start from './containers/Start/Start'
import ShowOutfits from './containers/ShowOutfits/ShowOutfits'
import AddItem from './containers/AddItem/AddItem';
import DeleteItem from './containers/DeleteItem/DeleteItem';
import Auth from './containers/Auth/Auth';
import SignOut from './containers/Auth/SignOut';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
require('dotenv').config();

class App extends Component {

    componentDidMount () {
      this.props.onCheckAutoSignIn()
    }

    render() {
      let routes = (
        <Switch>
          <Route path='/guest'  exact component={Guest} />
          <Route path='/' exact component={Home} />
          <Route path='/auth' exact component={Auth} />
          {/* for any path unknown */}
          <Redirect to='/' />
        </Switch>
      )
      if (this.props.isAuthenticated) {
        routes = (
          <Switch>
            <Route path='/start'  exact component={Start} />
            <Route path='/closet' exact component={Closet} />
            <Route path='/outfits' exact component={ShowOutfits} />
            <Route path='/addItem' exact component={AddItem} />
            <Route path='/deleteItem' exact component={DeleteItem} />
            <Route path='/signOut' exact component={SignOut} /> 
            {/* for any path unknown, or after authentification which is still in /auth */}
            <Redirect to='/start' />
          </Switch>
        )
      }

    return (
      <div>
        <Layout >
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onCheckAutoSignIn: () => dispatch( actions.authCheckState() )
  }
}
// withRouter let the props passed down to app 
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));

