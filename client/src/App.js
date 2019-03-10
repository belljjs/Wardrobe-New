import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import { Route, Switch } from 'react-router-dom';

import Home from './containers/Home/Home';
import Closet from './containers/Closet/Closet';
import Start from './containers/Start/Start'
import Outfits from './containers/Outfits/Outfits'
import AddItem from './containers/AddItem/AddItem';
import DeleteItem from './containers/DeleteItem/DeleteItem';
import Auth from './containers/Auth/Auth';
import SignOut from './containers/Auth/SignOut';


class App extends Component {

    // if (!this.state.current_user) {
    //   //
    // }  
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

export default App;

