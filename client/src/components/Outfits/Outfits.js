import React, { Component } from 'react';
import Outfit from '../Outfit/Outfit';
import './Outfits.css'
import '../../index.css';

const outfits = (props) =>  {

    const outfitsAll = [...props.outfitsAll]
    const outfits = outfitsAll.map( (outfit, index) => {
            const {id, user_id, weather_name, weather_icon, high_temp, low_temp, outfit_date, items} = outfit; 
            return(
                <Outfit 
                    key={id}
                    id={id}
                    user_id={user_id}
                    weather_name={weather_name}
                    weather_icon={weather_icon}
                    high_temp={high_temp}
                    low_temp={low_temp}
                    outfit_date={outfit_date}
                    items={items}
                    clicked={props.outfitDeleteClicked.bind(this, index)}>
                </Outfit>
            )
    });

    return(
        <div>
            <div className="Outfits">
                {outfits}
            </div>
        </div>
        
    )
}


 


export default outfits;
