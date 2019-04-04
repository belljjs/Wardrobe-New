import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import { Route, Switch,withRouter , Redirect} from 'react-router-dom';
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

class App extends Component {

    componentDidMount () {
      this.props.onCheckAutoSignIn()
    }

    render() {
      let routes = (
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/auth' exact component={Auth} />
          {/* for any path unknown */}
          <Redirect to='/' />
        </Switch>
      )
      if (this.props.isAuthenticated) {
        console.log("isAuthenticated is true...")
        routes = (
          <Switch>
            <Route path='/start'  exact component={Start} />
            <Route path='/closet' exact component={Closet} />
            <Route path='/outfits' exact component={ShowOutfits} />
            <Route path='/addItem' exact component={AddItem} />
            <Route path='/deleteItem' exact component={DeleteItem} />
            <Route path='/signOut' exact component={SignOut} /> 
            {/* for any path unknown */}
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
  console.log(" In App mapStateToProps.. stat:",state)
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

