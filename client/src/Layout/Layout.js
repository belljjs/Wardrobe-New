import React, { Component } from 'react';
import './Layout.css'
import Closet from '../Closet/Closet';
import Toolbar from '../Toolbar/Toolbar';

class Layout extends Component {
  state = {
    showSideDraw: false
  }

  render() {
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

    return (  
      <div className="Layout">
        <Toolbar />
        <Closet itemsAll={itemsAll}/>
      </div>
    );
  }
}

export default Layout;
