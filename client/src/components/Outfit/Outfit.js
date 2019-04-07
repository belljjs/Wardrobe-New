import React from 'react';
import './Outfit.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
 
const outfit = (props) => {
    const items = props.items.map(item=> {
        return (
            <img 
                key={item.image_location}
                className="ItemInOutfit" 
                src={item.image_location}
                alt="items"/>
        )
    })
    return (
        <div className="OutfitLine" >
            <div className="WeatherInfo">
                <img 
                    className="WeatherImage" 
                    src={`http://openweathermap.org/img/w/${props.weather_icon}.png`} 
                    alt="Weather Icon"/>
                <div>{props.weather_name}</div>
                <div>{props.high_temp}℉ / {props.low_temp}℉</div>
            </div>
            {items}
            <button onClick={props.clicked} className="Trash">
                 <FontAwesomeIcon icon={faTrashAlt} size="1x" color="darkGreen"  />
            </button>   
        </div>
    ) 
}

export default outfit;