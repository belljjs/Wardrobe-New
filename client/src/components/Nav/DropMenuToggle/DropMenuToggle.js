import React from 'react';
import './DropMenuToggle.css';

const dropMenuToggle = (props) => (
    <div className="DropMenuToggle" onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default dropMenuToggle;