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
                    this.props.weatherFound 
                    ?   
                        <div className="Nav">
                            <li><NavLink to='/start'>weather</NavLink></li>
                            <li><NavLink to='/closet'>closet</NavLink></li>
                            <li><NavLink to='/outfits'>outfits </NavLink></li>
                            <li><NavLink to='/addItem'><FontAwesomeIcon icon={faPlus}/></NavLink></li>
                            <li><NavLink to='/deleteItem'><FontAwesomeIcon icon={faMinus}/></NavLink></li>
                            <li> <NavLink to='/signOut'><FontAwesomeIcon icon={faSignOutAlt}/></NavLink></li>
                        </div>
                    : 
                        <div className="Nav">
                            <li style={{"marginRight":"50px"}}><NavLink to='/start'>Start with finding weather... </NavLink></li>
                            <li><NavLink to='/outfits'>outfits </NavLink></li>
                            <li><NavLink to='/addItem'><FontAwesomeIcon icon={faPlus}/></NavLink></li>
                            <li><NavLink to='/deleteItem'><FontAwesomeIcon icon={faMinus}/></NavLink></li>
                            <li> <NavLink to='/signOut'><FontAwesomeIcon icon={faSignOutAlt}/></NavLink> </li>
                        </div>
                : 
                    <div  className="Nav">
                        <LightTooltip  title="Start as guest with sample data">    
                            <li><NavLink to='/guest'>Guest</NavLink></li>
                        </LightTooltip>
                        <LightTooltip  title="Sign in or Sign up ">    
                             <li><NavLink to='/auth' ><FontAwesomeIcon icon={faSignInAlt}/></NavLink></li>
                        </LightTooltip>
                    </div>
            }
            
        </ul>
        )
    }
}

export default Nav;