import React from 'react';

import './Magnify.css';
import magnifierImage from '../../asset/image/m1.png';

const magnify = (props) => (

    <button onClick={props.clicked} className="Magnifier">
        <img 
            src={magnifierImage} 
            alt=""  />
    </button>    
);

export default magnify;