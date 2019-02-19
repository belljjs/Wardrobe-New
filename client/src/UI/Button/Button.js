import React from 'react';
import './Button.css'

const button = (props) => (
    <button className="Button" type="button"
        disabled={props.disabled}
        onClick={props.clicked}> {props.children}
    </button>
);
export default button