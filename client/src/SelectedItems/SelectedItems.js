import React from 'react';
import Item from '../Item/Item';
import './SelectedItems.css';

const selectedItems = (props) => {

    //const itemsSelectedArray = [ ...props.itemsSelected];
    const itemsSelected = props.itemsSelected.map(({id, category, color, season, name},index) =>
        <Item 
            key={id}
            id={id}
            category={category}
            color={color}
            season={season}
            name ={name}
            clicked={props.itemsSelectedClicked.bind(this, index)}> {name}
        </Item>
    )
    return (
        <div>
            <p className="subTitle"> SELECTED ITEMS </p> 
            <div className="SelectedItems">
                {itemsSelected}
            </div>
         </div>
    )
}

export default selectedItems;
