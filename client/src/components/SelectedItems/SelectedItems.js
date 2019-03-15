import React from 'react';
import Item from '../Item/Item';
import './SelectedItems.css';

const selectedItems = (props) => {
    let title = "SELECTED ITEMS";
    let clicked = (index)=>props.itemsSelectedClicked(index);
   
    if(props.isModal === "true") {
        title = "";
        clicked = null
    } 
    console.log("props.isModal,title :", props.isModal, title);

    const itemsSelected = props.itemsSelected.map(({id, category, color, season, image_location},index) =>
        <Item 
            isModal = {props.isModal}
            key={id}
            id={id}
            category={category}
            color={color}
            season={season}
            image_location={image_location}
            clicked={clicked}>
        </Item>
    )
    return (

        <div>
            <p className="subTitle"> {title} </p> 
            <div className="SelectedItems">
                {itemsSelected}
            </div>
         </div>
    )
}

export default selectedItems;
