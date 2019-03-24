import React, { Component } from 'react';
import Item from '../Item/Item';
import Magnify from '../../UI/Magnify/Magnify';
import './SelectedItems.css';

class SelectedItems extends Component {
    render() {

   
    let title = null;
    if(this.props.isModal === "false") {
       title = 
            <div className="inline">
                <p className="subTitle"> SELECTED ITEMS </p> 
                <Magnify clicked={this.props.magnifierClicked}/>
            </div>
    }
    // let clicked = (index)=>this.props.itemsSelectedClicked(index);
 
    console.log("In selectedItems....")
    console.log("this.props.isModal:", this.props.isModal,"title:", title);
    console.log("this in Selecteditems:", this);

    const itemsSelected = this.props.itemsSelected.map(({id, category, color, season, image_location}, index) =>
        <Item 
            isModal = {this.props.isModal}
            key={id}
            id={id}
            category={category}
            color={color}
            season={season}
            image_location={image_location}
            clicked={this.props.itemsSelectedClicked.bind(this,index)}>
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
}

export default SelectedItems;
