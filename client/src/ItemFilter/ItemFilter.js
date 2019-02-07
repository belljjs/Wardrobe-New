import React from 'react';
import './ItemFilter.css';
import Button from '../UI/Button/Button';


const itemFilter = (props) => {

    const filterArray = ['Top', 'Bottom', 'Dress', 'Shoes', 'Bag', "All"];
    const filters = filterArray.map( (filter,index) => 
        <Button 
            key={index} 
            clicked={props.filterClicked.bind(this, filter)}>   {filter}
        </Button>
    )
    return(
        <div className="ItemFilter">    
            {filters}
        </div>
    )

}


export default itemFilter;
