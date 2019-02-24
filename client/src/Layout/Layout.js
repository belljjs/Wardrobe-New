import React, { Component } from 'react';
import './Layout.css'
import axios from 'axios';
import Toolbar from '../Toolbar/Toolbar';

class Layout extends Component {
  state = {
    showSideDraw: false,
    items : [],
    current_user_id: undefined
  }

  // current_user ? setState(user_id) : 

  createItems = async () => {
     const items = await axios(('/api/items'));
    


    this.setState({items: items})
  }
  render() {
    if (!this.state.current_user_id) {
    }
    return (  
      <div className="Layout">
        <Toolbar />
        <main className="Content" items={this.state.items}>
              {this.props.children}
        </main>
      </div>
    );
  }
}

export default Layout;
