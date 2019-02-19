import React, { Component } from 'react';
import './Layout.css'
import Toolbar from '../Toolbar/Toolbar';

class Layout extends Component {
  state = {
    showSideDraw: false
  }

  render() {
    
    return (  
      <div className="Layout">
        <Toolbar />
        <main className="Content">
              {this.props.children}
        </main>
      </div>
    );
  }
}

export default Layout;
