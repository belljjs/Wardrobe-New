import React from 'react';
import './Item.css';

const item = (props) => {
    let width = "10vw";
    if(props.isModal === "true") {
        width = "17vw"
    } 
    console.log("props:",props);
    console.log("props.image_location:",props.image_location);

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