import React from 'react'
import weatherShot from '../../asset/image/weatherShot.png';
import closetSelectedShot from '../../asset/image/closetSelectedShot.png';
import closetShot from '../../asset/image/closetShot.png';
import closetModalShot from '../../asset/image/closetModalShot.png';
import deleteModalShot from '../../asset/image/deleteModalShot.png';
import deleteShot from '../../asset/image/deleteShot.png';
import itemInfoShot from '../../asset/image/itemInfoShot.png';
import itemFileShot from '../../asset/image/itemFileShot.png';
import outfitShot from '../../asset/image/outfitShot.png';
import addItemShot from '../../asset/image/addItemShot.png';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt} from '@fortawesome/free-solid-svg-icons'
import { faSignInAlt} from '@fortawesome/free-solid-svg-icons'
import { faPlus} from '@fortawesome/free-solid-svg-icons'
import { faMinus} from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const home =() => {
    return (
            <div>
                <h3 className="titleHome"> Plan Your Outfit</h3>
                <div className="titlePage">
                        First, make an account with <FontAwesomeIcon icon={faSignInAlt}/> {" "} icon in the menu bar.
                </div>

                <div>
                    <div className="titlePage">
                        <p>Start with finding weather of the city and get the proposal for the weather. </p>
                    </div>
                    <img className="weatherShot"
                        src={weatherShot} 
                        alt=""  />
                    <div className="titlePage">
                        <p>Then, the menu bar shows available links.</p>
                    </div>
                </div>
                <div>
                    <div className="titlePage">
                        If there is no items and no outfits saved, then add items with image files for the items stored in your computer. 
                    </div>
                    <img className="weatherShot"
                        src={addItemShot} 
                        alt=""  />
                    <div className="titlePage">
                        Click <strong>choose file </strong> button to find file for an item.
                    </div>                   
                    <img className="weatherShot"
                        src={itemFileShot} 
                        alt=""  />
                </div>
                <div>
                    <div className="titlePage">
                        After open a file for an item, then add infomation for the item and click submit button.
                    </div>
                    <img className="weatherShot"
                        src={itemInfoShot} 
                        alt=""  />
                </div>
                <div>
                    <div className="titlePage">
                        <p>To open your closet, click <strong>closet</strong> link in the menu bar.</p>
                        <p>Click items to select for an outfit. </p>
                        <p>If you want to put items back to the closet, click again each item of selected items.</p>
                    </div>
                    <img className="weatherShot"
                        src={closetSelectedShot} 
                        alt=""  />
                </div>
                <div>
                    <div className="titlePage">
                        <p> After selecting items for an outfit, click magnifier to see items bigger. If it's ok, then save it.</p>
                    </div>
                    <img className="weatherShot"
                        src={closetModalShot} 
                        alt=""  />
                </div>
                <div>
                    <div className="titlePage">
                        <p> To check all the outfits saved, click outfit in the menu bar.</p>
                        <p> If you want to delete some outfits, click <FontAwesomeIcon icon={faTrashAlt} size="1x" color="darkGreen"  /> icon for each outfit. </p>
                    </div>
                    <img className="weatherShot"
                        src={outfitShot} 
                        alt=""  />
                </div>
               
            </div>
    );
}

export default home;