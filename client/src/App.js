import React, { Component } from 'react';
import Layout from './Layout/Layout';
import { Route, Switch } from 'react-router-dom';
import Closet from './Closet/Closet';
import Start from './Start/Start'

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path='/' component={Closet} />
            <Route path='/start' component={Start} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;

