import React, { Component } from 'react';
import '../'

import Items from '../Items/Items';
import ItemFilter from '../ItemFilter/ItemFilter';
import SelectedItems from '../SelectedItems/SelectedItems';
//import Modal from '../UI/Modal/Modal';

class Closet extends Component {
    state = {
        itemsShown: [],
        itemsSelected: [],
        itemsFilter: "All"
    }

    freshItemsShown = (filter) => {
        console.log(".... freshItemsShown")

        // filtering props.itemsAll to create itemsShown
        console.log("filter in freshItemsShown",filter);
        
        let itemsShown = [...this.props.itemsAll];
        // return new array (itemsShown) fitered by filter argument
        return  filter === "All" ? itemsShown : itemsShown.filter( item => item.category === filter);
    
    }

    adjustItemsShown = (itemsShown, itemsSelected) => {
        console.log(".... adjustItemsShown")

        console.log("itemsShown before adjust",itemsShown)
        console.log("itemsSelected before adjust",itemsSelected)

        if (itemsSelected.length > 0) {
            let shownIndex = -1;
            
            itemsSelected.forEach(item => {
                console.log("item in ForEach",item)
                shownIndex = itemsShown.findIndex(i => {
                    return i.name === item.name}
                )
                if (shownIndex > -1) {
                    console.log(" ---- shownIndex",shownIndex);
                    itemsShown.splice(shownIndex,1)
                }
            })

        }   

        console.log("itemsShown after adjust",itemsShown)

        return itemsShown;
    }

    handleItemsFilterClicked = (filter)=> {
         console.log(".... handleItemsFilterClicked")
        

        const itemsShown = this.adjustItemsShown(
                 this.freshItemsShown(filter),this.state.itemsSelected)
        
        this.setState({
            itemsFilter: filter,
            itemsShown: itemsShown
        }) 
    }
    handleItemsSelectedClicked = (itemsSelectedIndex) =>{
    console.log(".... handleItemsSelectedClicked")

        // remove the item from itemsSelected
        let itemsSelected = [...this.state.itemsSelected];  
        itemsSelected.splice(itemsSelectedIndex,1)

        console.log("this.state.itemsFilter",this.state.itemsFilter);
        const itemsShown = this.adjustItemsShown(
                this.freshItemsShown(this.state.itemsFilter),itemsSelected 
        )

        this.setState ({ 
            itemsSelected: itemsSelected,
            itemsShown: itemsShown
        }) 
    }
    handleItemsShownClicked = (itemsShownIndex) =>{
    console.log(".... in handleItemsShownClicked")

        let itemsShown = [...this.state.itemsShown];
        let itemsSelected = [...this.state.itemsSelected];

        itemsSelected.push(itemsShown[itemsShownIndex])
        itemsShown.splice(itemsShownIndex,1)

        this.setState({ itemsSelected: itemsSelected, itemsShown: itemsShown}  ) 
    }
    render() {
        return (
        <div>
            <h3 className="title">Closet</h3>
            <ItemFilter 
                filterClicked={this.handleItemsFilterClicked}/>
            <Items 
                itemsShown={this.state.itemsShown}
                itemsClicked={this.handleItemsShownClicked}    />
            <SelectedItems 
                itemsSelected={this.state.itemsSelected}
                itemsSelectedClicked={this.handleItemsSelectedClicked} />
        </div>
        );
    }
}

export default Closet;