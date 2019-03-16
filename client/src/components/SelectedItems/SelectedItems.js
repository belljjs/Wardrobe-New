import React from 'react';
import Item from '../Item/Item';
import Magnify from '../../UI/Magnify/Magnify';
import './SelectedItems.css';

const selectedItems = (props) => {
    let title = 
         <div className="inline">
             <p className="subTitle"> SELECTED ITEMS </p> 
             <Magnify clicked={props.magnifierClicked}/>
        </div>
    let clicked = (index)=>props.itemsSelectedClicked(index);
   
    if(props.isModal === "true") {
        title = "";
        clicked = null
    } 
    console.log("props.isModal,title :", props.isModal, title);

    const itemsSelected = props.itemsSelected.map(({id, category, color, season, image_location}, index) =>
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
            {title}
            <div className="SelectedItems">
                {itemsSelected}
            </div>
         </div>
    )
}

export default selectedItems;
