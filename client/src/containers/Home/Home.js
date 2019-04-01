import React from 'react'
import weatherShot from '../../asset/image/weatherShot.png';
import './Home.css';

const home =() => {
    return (
            <div>
                <h3 className="titleHome"> Plan Your Outfit</h3>
                <h5 className="title">Start with finding weather.</h5>
                <img className="weatherShot"
                    src={weatherShot} 
                    alt=""  />
            </div>
    );
}

export default home;