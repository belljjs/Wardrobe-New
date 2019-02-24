import React from 'react';
import './Item.css';

const item = (props) => (
        <div 
            onClick={props.clicked}>
            {/* {props.children} */}
            <img className="Item" src={props.image_location} alt={props.id} />
        </div>
)
export default item;