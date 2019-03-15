import React from 'react';
import './Item.css';

const item = (props) => {
    let width = "10vw";
    if(props.isModal === "true") {
        width = "17vw"
    } 
    console.log("props.isModal, width :", props.isModal, width);

    return (
        <div 
            onClick={props.clicked}>
            {/* {props.children} */}
            <img 
                className="Item" 
                src={props.image_location} 
                alt={props.id} 
                style={width={width}} />
        </div>
    )
    
}



export default item;