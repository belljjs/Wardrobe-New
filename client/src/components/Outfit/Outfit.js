import React from 'react';
import './Outfit.css';

const outfit = (props) => {
    console.log("Props in Outfit:",props);
    const items = props.items.map(item=> {
        return (
            <img 
                className="ItemInOutfit" 
                src={item.image_location}
                alt="items"/>
        )
    })
    return (
        <div className="OutfitLine" >
            {/* onClick={props.clicked}> */}
           
            <div className="WeatherInfo">
                <img 
                    className="WeatherImage" 
                    src={`http://openweathermap.org/img/w/${props.weather_icon}.png`} 
                    alt="Weather Icon"/>
                {props.weather_name}
                <div>{props.high_temp}℉ / {props.low_temp}℉</div>
            </div>
            {items}

        </div>
    )
    
}



export default outfit;