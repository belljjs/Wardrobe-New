import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import { Route, Switch,withRouter } from 'react-router-dom';

import Home from './containers/Home/Home';
import Closet from './containers/Closet/Closet';
import Start from './containers/Start/Start'
import Outfits from './containers/Outfits/Outfits'
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

    return (
      <div>
        <Layout >
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/start'  exact component={Start} />
            <Route path='/closet' exact component={Closet} />
            <Route path='/outfits' exact component={Outfits} />
            <Route path='/addItem' exact component={AddItem} />
            <Route path='/deleteItem' exact component={DeleteItem} />
            <Route path='/signOut' exact component={SignOut} /> 
            <Route path='/auth' exact component={Auth} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCheckAutoSignIn: () => dispatch( actions.authCheckState() )
  }
}
// withRouter let the props passed down to app 
export default withRouter(connect(null,mapDispatchToProps)(App));

