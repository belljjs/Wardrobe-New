import React from'react';
import axios from 'axios';

const proposal =(props)=>{
    const {weather} = props;
    if (!weather)
        return  <div></div>;
    
    // const response =  axios.get(
    //     '/api/outfit/outfit',
    //     {params: {highTemp: weather.main.temp_max }}
    // )
    const response = [ "Aaaaaaaaaaaaaaaa", "Bbbbbbbbbbbbb", "Cccccccccccc", "Dddddddddd", "Eeeeeeeee"]

    const outfit = response.map(item=> {
        return (
            <div>
                {item}
            </div>
        )
        });
    // const outfit = response.data.map(item=> {
    //     return (
            // <img 
            //     key={item.image_location}
            //     className="ItemInProposal" 
            //     src={item.image_location}
            //     alt="items"/>
           
    //     )
    // })

    return (
        <div className="OutfitInProposal">
            {outfit}
        </div>
       
    )

}

export default proposal;