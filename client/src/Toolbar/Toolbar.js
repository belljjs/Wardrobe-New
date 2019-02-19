import React from 'react';
import Logo from '../Logo/Logo';
import './Toolbar.css'
import Nav from '../Nav/Nav';



const toolbar=(props) => (
    <header className="Toolbar">
        <div className="LogoTitle">
            <Logo /> 
            <p className='MainTitle'>My Wardrobe</p>
        </div>
        <div className="DesktopOnly">
           <Nav />
        </div>
    </header>
);



export default toolbar;
