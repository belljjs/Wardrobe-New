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
            <h3 className="titleHome"> Try Wardrobe as guest with sample data </h3>
            <div>
                <div className= "titlePage"> Check Weather </div>

                    <p>Then, the menu bar shows available links.</p>
            </div>
            <div>

            </div>
        </div>
    );
}

export default guest;