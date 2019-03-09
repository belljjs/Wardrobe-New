import React from 'react';
import "./Nav.css";
import { NavLink } from 'react-router-dom'; 

const nav = (props) => (
    <ul className="Nav">
        <li><NavLink to='/start' > Start </NavLink></li>
        <li><NavLink to='/closet' > Closet </NavLink></li>
        <li><NavLink to='/outfits' > Outfits </NavLink></li>
        <li><NavLink to='/addItem' > + </NavLink></li>
        <li><NavLink to='/deleteItem' > - </NavLink></li>
        <li><NavLink to='/signIn#in' > Account </NavLink></li>
        {/* <li><NavLink to='/signUp#up' > SignUp </NavLink></li> */}
        {/* <li><NavLink to='/signOut' > SignOut </NavLink></li> */}
    </ul>
);

export default nav;