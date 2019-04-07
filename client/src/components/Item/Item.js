import React from 'react';
import './Item.css';

const item = (props) => {

    let width = "10vw";
    if(props.isModal === "true") {
        width = "17vw"
    } 
    
    return (
        <div 
            onClick={props.clicked}>
            <img 
                className="Item" 
                src={props.image_location} 
                alt={props.id} 
                style={width={width}} height={width} />
        </div>
    )
}

export default item;