import React from 'react';
import "./Nav.css";

const navItem = (props) => (
    <div className="NavItem">
        {props.children}
    </div>
);

export default navItem;