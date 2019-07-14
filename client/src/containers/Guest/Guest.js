import React from 'react'
import './Guest.css';

// Flow //

// A. Show guideline(?) - 
//  - provide sample items and outfits.
//  - showing current location weather, or you can choose city to see the weather.
//  - open closet and make outfit!

// B. DB work.
//  1. copy every records of base account in items, outfits, outfit-items, cities  tables.
//     userId  -  'guest' + Math.floor(Date.now())
//  2. insert them to each tables.
// C.Direct to weather page.
// 
// console.log('guest' + Math.floor(Date.now()));

const guest =() => {
    return (
        <div>
            <h3 className="titleGuest"> Try Wardrobe as guest with sample data </h3>
            <div>
                <div className= "titlePage"> Check Weather </div>
                <p>To make an outfit for today, check weather first.</p>
                <p>Choose city in sample cities or add some new citiies.</p>
                <p>You can use current location.</p>
            </div>
            <div>
                <div className= "titlePage"> Add and Delete items </div>
                <p>Add new item with a picture. You can delete them</p>
            </div>
            <div>
                <div className= "titlePage"> Open your closet and try outfits </div>
                <p>Select any combination and see it bigger with magnifier.</p>
                <p>If it looks nice, save as your new outfit</p>
            </div>
            <div>

            </div>
        </div>
    );
}

export default guest;