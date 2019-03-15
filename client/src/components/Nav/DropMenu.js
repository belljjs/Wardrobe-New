import React from 'react';

import Logo from '../Logo/Logo';
import Nav from './Nav';
import './DropMenu.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
// import Aux from '../../../hoc/Aux/Aux';

const dropMenu = ( props ) => {
    let dropMenuCss = "DropMenu Close"; //  when 'showDropMenu: false' in Layout
    if (props.open) {
        dropMenuCss = "DropMenu Open";
    }
    console.log("dropMenuCss:",dropMenuCss);
    return (
        <div>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={dropMenuCss}>
                <div className="DropLogo">
                    <Logo />
                </div>
                <nav>
                    <Nav isAuthenticated={props.isAuth} />
                </nav>
            </div>
        </div>
    );
};

export default dropMenu;