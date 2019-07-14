import React from 'react';
import "./Nav.css";
import { NavLink } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt} from '@fortawesome/free-solid-svg-icons'
import { faSignInAlt} from '@fortawesome/free-solid-svg-icons'
import { faPlus} from '@fortawesome/free-solid-svg-icons'
import { faMinus} from '@fortawesome/free-solid-svg-icons'

const nav = (props) => (
    <ul  onClick={props.clicked}>
        { props.isAuthenticated
            ? 
                props.weatherFound 
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
                    <li><NavLink to='/guest' title='Guest'>Guest</NavLink></li>
                    {/* <li><NavLink to='/home'>Home</NavLink></li> */}
                    <li><NavLink to='/auth' ><FontAwesomeIcon icon={faSignInAlt}/></NavLink></li>
                </div>
        }
    </ul>
);

export default nav;