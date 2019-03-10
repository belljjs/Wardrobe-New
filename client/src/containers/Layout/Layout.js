import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Layout.css'
import axios from 'axios';
import Toolbar from '../../components/Toolbar/Toolbar';

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
        <Toolbar isAuth={this.props.isAuthenticated}/>
        <main className="Content" items={this.state.items}>
              {this.props.children}
        </main>
      </div>
    );
  }
}
const mapStateToProps = state =>{
  return{
    isAuthenticated: state.token !== null
  }
}
export default connect(mapStateToProps)(Layout);
