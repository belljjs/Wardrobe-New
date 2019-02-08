import React from 'react';
import "./Nav.css";
import NavItem from './NavItem';

const nav = (props) => (
    <ul className="Nav">
        <NavItem link="closet" > Closet </NavItem>
        <NavItem link="outfits" > Outfits </NavItem>
        <NavItem link="addItem" > + </NavItem>
        <NavItem link="deleteItem" > - </NavItem>
    </ul>
);

export default nav;