import React from 'react';
import "./Nav.css";
import { Link } from 'react-router-dom'; 


const navItem = (props) => {
   
    return (
        <li className="NavItem"> 
        <Link to={props.link}>
             {props.children}
         </Link>  
    </li>
    )
}
  


export default navItem;