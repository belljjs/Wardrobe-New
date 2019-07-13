import React from 'react'
import weatherShot from '../../asset/image/weatherShot.png';
import closetSelectedShot from '../../asset/image/closetSelectedShot.png';
import closetModalShot from '../../asset/image/closetModalShot.png';
import deleteModalShot from '../../asset/image/deleteModalShot.png';
import deleteShot from '../../asset/image/deleteShot.png';
import itemInfoShot from '../../asset/image/itemInfoShot.png';
import itemFileShot from '../../asset/image/itemFileShot.png';
import outfitShot from '../../asset/image/outfitShot.png';
import addItemShot from '../../asset/image/addItemShot.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt} from '@fortawesome/free-solid-svg-icons'
import { faSignInAlt} from '@fortawesome/free-solid-svg-icons'
import { faPlus} from '@fortawesome/free-solid-svg-icons'
import { faMinus} from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import './Home.css';

const home =() => {
    return (
        <div>
            <h3 className="titleHome"> Plan Your Outfit</h3>
            <div className="pageFeature">
                    <p>To try here, use &nbsp; <strong>Guest</strong>  &nbsp; icon in the menu bar.</p>
                    <p>To sign in or sign up, use &nbsp;  <FontAwesomeIcon icon={faSignInAlt}/> &nbsp; icon in the menu bar.</p>
                    <p>To sign out, use &nbsp;  <FontAwesomeIcon icon={faSignOutAlt}/> &nbsp; icon which will be shown after sign in.</p>
            </div>
            <div>
                <div className= "titlePage"> Check Weather </div>
                <div className= "pageFeature">
                    <p> Once signed in, start with finding weather of the city and get the proposal for the weather. </p>
                </div>
                <img className="screenShot"
                    src={weatherShot} 
                    alt=""  />
                <div className="pageFeature">
                    <p>Then, the menu bar shows available links.</p>
                </div>
            </div>
            <div>
                <div className= "titlePage"> Add Item </div>
                <div className="pageFeature">
                    <p>If there is no items and no outfits saved, </p>
                    <p>then click the &nbsp;  <FontAwesomeIcon icon={faPlus}/> &nbsp;  link to add items with image files for the items stored in your computer. </p>
                </div>
                <img className="screenShot"
                    src={addItemShot} 
                    alt=""  />
                <div className="pageFeature">
                    Click the &nbsp; <strong style={{border: "solid grey 1px"}}> Choose File </strong> &nbsp; button to find a file for an item.
                </div>                   
                <img className="screenShot"
                    src={itemFileShot} 
                    alt=""  />
                <div className="pageFeature">
                    Set the properties of the item and click submit button.
                </div>                   
                <img className="screenShot"
                    src={itemInfoShot} 
                    alt=""  />   
            </div>
            <br></br><br></br><br></br>
            <div>
                <div className= "titlePage"> Delete Item </div>
                <div className="pageFeature">
                    <p>If an item is no longer available, then click &nbsp;  <FontAwesomeIcon icon={faMinus}/> &nbsp; link to delete the item.   </p>
                </div>
                <img className="screenShot"
                    src={deleteShot} 
                    alt=""  />
                <div className="pageFeature">
                    <p>Click the item then you can see a big image of the item.</p>
                    <p>Confirm the item to be deleted.</p>
                </div>                   
                <img className="screenShot"
                    src={deleteModalShot} 
                    alt=""  />
            </div>
            <br></br><br></br><br></br>
            <div>
                <div className= "titlePage"> Open Closet </div>
                <div className="pageFeature">
                    <p>To open your closet, clickthe <strong>closet</strong> link in the menu bar.</p>
                    <p>Click items to select for an outfit. </p>
                    <p>If you want to put items back to the closet, click again each item of selected items.</p>
                </div>
                <img className="screenShot"
                    src={closetSelectedShot} 
                    alt=""  />
            </div>
            <div>
                <div className="pageFeature">
                    <p> After selecting items for an outfit, click magnifier to see items bigger. If it's ok, then save it.</p>
                </div>
                <img className="screenShot"
                    src={closetModalShot} 
                    alt=""  />
            </div>
            <br></br><br></br><br></br>
            <div>
                    <div className= "titlePage"> List Outfits </div>                     

                <div className="pageFeature">
                    <p> To check all the outfits saved, click <strong>outfit </strong> link in the menu bar.</p>
                    <p> If you want to delete some outfits, click &nbsp; <FontAwesomeIcon icon={faTrashAlt} size="1x" color="darkGreen"  /> &nbsp; icon for each outfit. </p>
                </div>
                <img className="screenShot"
                    src={outfitShot} 
                    alt=""  />
            </div>
        </div>
    );
}

export default home;