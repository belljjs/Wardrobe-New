import React from 'react';
import Outfit from '../Outfit/Outfit';
import './Outfits.css'
import '../../index.css';

const outfits = (props) => {

    console.log("**** In outfits, props.outfitsAll:",props.outfitsAll)
    const outfitsAll = [...props.outfitsAll]
    console.log("outfitsAll:",outfitsAll)
    
    const outfits = outfitsAll.map( (outfit,index) => {
        console.log("outfit, index:",outfit,index);
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
            >
            {/* clicked={props.outfitsClicked.bind(this, index)}> */}
             {/* <img src={image_location} alt={id}  width="60px" height="60px"/> */}
        </Outfit>
        )
    })
    return(
        <div>
            <div className="Outfits">
                {outfits}
            </div>
        </div>
        
    )
}


 


export default outfits;
