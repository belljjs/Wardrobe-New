import React from 'react';
import Item from '../Item/Item';
import './SelectedItems.css';

const selectedItems = (props) => {

    //const itemsSelectedArray = [ ...props.itemsSelected];
    const itemsSelected = props.itemsSelected.map(({id, category, color, season, image_location},index) =>
        <Item 
            key={id}
            id={id}
            category={category}
            color={color}
            season={season}
            image_location={image_location}
            clicked={props.itemsSelectedClicked.bind(this, index)}>
             {/* {category}{id} */}
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
