import React from 'react';
import Item from '../Item/Item';
import './Items.css'
import '../../index.css';

const items = (props) => {
    // console.log(props);
    const itemsShown = [...props.itemsShown]
    const items = itemsShown.map( ({id, category, color, season, occasion, image_location},index) => 
            <Item 
                key={id}
                id={id}
                category={category}
                color={color}
                season={season}
                occasion={occasion}
                image_location={image_location}
                clicked={props.itemsClicked.bind(this, index)}>
                 {/* <img src={image_location} alt={id}  width="60px" height="60px"/> */}
            </Item>
    )
    return(
        <div>
            <p className="subTitle">ITEMS </p> 
            <div className="Items">
                {items}
            </div>
        </div>
        
    )
}


 


export default items;
