import React from 'react';
import "./Nav.css";
import { NavLink } from 'react-router-dom'; 


const navItem = (props) => {
   
    return (
        <li className="NavItem"> 
        <NavLink to={props.link}>
             {props.children}
         </NavLink>  
    </li>
    )
}
  


export default navItem;