import React, { Component } from 'react';
import "./Nav.css";
import { NavLink } from 'react-router-dom'; 
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt} from '@fortawesome/free-solid-svg-icons'
import { faSignInAlt} from '@fortawesome/free-solid-svg-icons'
import { faPlus} from '@fortawesome/free-solid-svg-icons'
import { faMinus} from '@fortawesome/free-solid-svg-icons'

class Nav extends Component {

    render() {
        const LightTooltip = withStyles(theme => ({
            tooltip: {
              backgroundColor: theme.palette.common.white,
              color: 'rgba(0, 0, 0, 0.60)',
              boxShadow: theme.shadows[1],
              fontSize: 15,
            },
          }))(Tooltip);
        return ( 
            <ul>
            { this.props.isAuthenticated
                ? 
                    <div className="Nav">
                        <li><NavLink to='/start' onClick={this.props.clicked}>weather</NavLink></li>
                        <li><NavLink to='/closet' onClick={this.props.clicked}>closet</NavLink></li>
                        <li><NavLink to='/outfits' onClick={this.props.clicked}>outfits </NavLink></li>
                        <li><NavLink to='/addItem' onClick={this.props.clicked}><FontAwesomeIcon icon={faPlus}/></NavLink></li>
                        <li><NavLink to='/deleteItem' onClick={this.props.clicked}><FontAwesomeIcon icon={faMinus}/></NavLink></li>
                        <li> <NavLink to='/signOut' onClick={this.props.clicked}><FontAwesomeIcon icon={faSignOutAlt}/></NavLink></li>
                    </div>
                : 
                    <div  className="Nav">
                        <LightTooltip  title="Start as guest with sample data">    
                            <li><NavLink to='/guest' onClick={this.props.clicked}>Guest</NavLink></li>
                        </LightTooltip>
                        <LightTooltip  title="Sign in or Sign up ">    
                             <li><NavLink to='/auth' onClick={this.props.clicked}><FontAwesomeIcon icon={faSignInAlt}/></NavLink></li>
                        </LightTooltip>
                    </div>
            }
        </ul>
        )
    }
}

export default Nav;