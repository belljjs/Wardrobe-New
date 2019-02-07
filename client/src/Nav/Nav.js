import React from 'react';
import "./Nav.css";
import NavItem from './NavItem';

const nav = (props) => (
    <div className="Nav">
        <NavItem> Closet </NavItem>
        <NavItem> Outfits </NavItem>
        <NavItem> + </NavItem>
        <NavItem> - </NavItem>
    </div>
);

export default nav;