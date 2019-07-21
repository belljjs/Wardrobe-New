import React from 'react';

import Logo from '../Logo/Logo';
import Nav from './Nav';
import './DropMenu.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const dropMenu = ( props ) => {
    let dropMenuCss = "DropMenu Close"; //  when 'showDropMenu: false' in Layout
    if (props.open) {
        dropMenuCss = "DropMenu Open";
    }
    return (
        <div>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={dropMenuCss}>
                <div className="DropLogo">
                    <Logo />
                    <div className='DropLogoTitle'>Wardrobe</div>
                </div>
                <nav className="DropNav">
                    <Nav 
                        clicked={props.closed} 
                        isAuthenticated={props.isAuth} />
                </nav>
            </div>
        </div>
    );
};

export default dropMenu;