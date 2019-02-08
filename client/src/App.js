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
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/closet' component={Closet} />
            <Route path='/start'  component={Start} />
            <Route path='/outfits' component={Outfits} />
            <Route path='/addItem' component={AddItem} />
            <Route path='/deleteItem' component={DeleteItem} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;

