import React from 'react';
import './Button.css'

const button = (props) => (
    <button className="Button" type="button" // "button" type -> no need to preventDefault
        disabled={props.disabled}
        onClick={props.clicked}> {props.children}
    </button>
);
export default button