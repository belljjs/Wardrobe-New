import React from 'react';
import closetLogo from '../../asset/image/collection.png';
import "./Logo.css";

const logo = (props) => (
    <div className="Logo" style={{height: props.height}}>
        <img src={closetLogo} alt=""  />
    </div>
);

export default logo;