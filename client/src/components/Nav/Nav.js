import React from 'react';
import "./Nav.css";
import { NavLink } from 'react-router-dom'; 

const nav = (props) => (
    <ul className="Nav">
        { props.isAuthenticated
            ? 
                props.weatherFound 
                ?   
                    <div className="Nav">
                        <li><NavLink to='/start' > Start </NavLink></li>
                        <li><NavLink to='/closet' > Closet </NavLink></li>
                        <li><NavLink to='/outfits' > Outfits </NavLink></li>
                        <li><NavLink to='/addItem' > + </NavLink></li>
                        <li><NavLink to='/deleteItem' > - </NavLink></li>
                        <li><NavLink to='/signOut' > SignOut </NavLink></li>
                    </div>
                : 
                    <div className="Nav">
                        <li><NavLink to='/start' > Start </NavLink></li>
                        <li><NavLink to='/signOut' > SignOut </NavLink></li>
                    </div>
                
            : 
                <div  className="Nav">
                    <li><NavLink to='/auth' >Account </NavLink></li>
                </div>
        }
    </ul>
);

export default nav;