import React, { Component } from 'react';
import '../'

import Items from '../Items/Items';
import ItemFilter from '../ItemFilter/ItemFilter';
import SelectedItems from '../SelectedItems/SelectedItems';
//import Modal from '../UI/Modal/Modal';

class Closet extends Component {
    state = {
        itemsAll: [],
        itemsShown: [],
        itemsSelected: [],
        itemsFilter: "All"
    }
    componentWillMount(){
        const itemsAll = [
            { id: 0,
              category: "Top",
              color: "White",
              season: "Summer",
              name: "TopA" 
            },
            { id: 1,
              category: "Top",
              color: "White",
              season: "Summer", 
              name: "TopB" 
            },
            { id: 2,
              category: "Top",
              color: "White",
              season: "Summer" ,
              name: "TopC"
            } ,
            { id: 3,
              category: "Bottom",
              name: "BottomA",
              color: "White",
              season: "Summer", 
            } ,
      
            { id: 4,
              category: "Bottom",
              name: "BottomB",
              color: "White",
              season: "Summer", 
            } ,
            { id: 5,
              category: "Bottom",
              name: "BottomC",
              color: "White",
              season: "Summer"
             } ,
            { id: 6,
              category: "Dress",
              color: "White",
              season: "Summer" ,
              name: "Dress1"
            } ,
            { id: 7,
              category: "Shoes",
              color: "White",
              season: "Summer" ,
              name: "Shoes1"
            } ,
            { id: 8,
              category: "Bag",
              color: "White",
              season: "Summer",
              name: "Bag1"  
            } ,
            { id: 9,
              category: "Bag",
              color: "White",
              season: "Summer",
              name: "Bag2"  
            } ,
          ];

        this.setState({ itemsAll})
    }
    freshItemsShown = (filter) => {
        console.log(".... freshItemsShown")

        // filtering props.itemsAll to create itemsShown
        console.log("filter in freshItemsShown",filter);
        
        let itemsShown = [...this.state.itemsAll];
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