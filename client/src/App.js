import React, { Component } from 'react';
import Layout from './Layout/Layout';
import { Route, Switch } from 'react-router-dom';

import Home from './Home/Home';
import Closet from './Closet/Closet';
import Start from './Start/Start'
import Outfits from './Outfits/Outfits'
import AddItem from './AddItem/AddItem';
import DeleteItem from './DeleteItem/DeleteItem';

class App extends Component {
  state = {
    users: []
  }

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/start'  exact component={Start} />
            <Route path='/closet' exact component={Closet} />
            <Route path='/outfits' exact component={Outfits} />
            <Route path='/addItem' exact component={AddItem} />
            <Route path='/deleteItem' exact component={DeleteItem} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;

