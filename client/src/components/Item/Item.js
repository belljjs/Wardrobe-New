import React from 'react';
import './Item.css';

const item = (props) => {

    let width = "12vw";
    if(props.isModal === "true") {
        width = "20vw"
    } 
    
    return (
        <div 
            onClick={props.clicked}>
            <img 
                className="Item" 
                src={props.image_location} 
                alt={props.id} 
                style={width={width}} 
                />
        </div>
    )
}

export default item;