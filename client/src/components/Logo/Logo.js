import React from 'react';
import closetLogo from '../../asset/image/collection.png';
import { NavLink } from 'react-router-dom'; 
import "./Logo.css";

const logo = (props) => (
    <div className="Logo" style={{height: props.height}}>
        <NavLink to='/home'><img src={closetLogo} alt=""  /></NavLink>
    </div>
);

export default logo;