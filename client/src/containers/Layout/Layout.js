import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Layout.css'
import axios from 'axios';
import Toolbar from '../../components/Toolbar/Toolbar';
import DropMenu from '../../components/Nav/DropMenu';

class Layout extends Component {
  state = {
    showDropMenu: false,
    items : [],
    current_user_id: undefined
  }

    dropMenuCloseHandler = () => {
        this.setState( { showDropMenu: false } );
    }

    dropMenuOpenHandler = () => {
        this.setState( ( prevState ) => {
            return { showDropMenu: !prevState.showDropMenu };
        } );
    }
      
  createItems = async () => {
    const items = await axios(('/api/items'));
    this.setState({items: items})
  }
  render() {
    if (!this.state.current_user_id) {
    }
    return (  
      <div className="Layout">
        <Toolbar
          isAuth={this.props.isAuthenticated}
          dropMenuClicked={this.dropMenuOpenHandler} />
        <DropMenu
          isAuth={this.props.isAuthenticated}
          open={this.state.showDropMenu}
          closed={this.dropMenuCloseHandler} />
        <main className="Content" items={this.state.items}>
              {this.props.children}
        </main>
      </div>
    );
  }
}
const mapStateToProps = state =>{
  return{
    isAuthenticated: state.auth.token !== null
  }
}
export default connect(mapStateToProps)(Layout);
