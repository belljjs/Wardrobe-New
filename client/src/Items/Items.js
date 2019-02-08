import React from 'react';
import Item from '../Item/Item';
import './Items.css'
import '../global.css';

const items = (props) => {
    // console.log(props);
    const itemsShown = [...props.itemsShown]
    const items = itemsShown.map( ({id, category, color, season, name},index) => 
            <Item 
                key={id}
                id={id}
                category={category}
                color={color}
                season={season}
                name ={name}
                clicked={props.itemsClicked.bind(this, index)}> {name}
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
