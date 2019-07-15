import React, { Component } from 'react';
import "./Nav.css";
// import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { NavLink } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt} from '@fortawesome/free-solid-svg-icons'
import { faSignInAlt} from '@fortawesome/free-solid-svg-icons'
import { faPlus} from '@fortawesome/free-solid-svg-icons'
import { faMinus} from '@fortawesome/free-solid-svg-icons'

class Nav extends Component {
    // guestClickHandler = () => {
    //     console.log("In guestClickHandler... ");
    //     const userId = 'guest' + Math.floor(Date.now());
    //     const email = userId + 'gmail.com'
    //     this.props.onAuth( userId, userId, email, userId , true );

    // }
    render() {
        return ( 
            <ul>
            { this.props.isAuthenticated
                ? 
                    this.props.weatherFound 
                    ?   
                        <div className="Nav">
                            <li><NavLink to='/start'>weather</NavLink></li>
                            <li><NavLink to='/closet'>closet</NavLink></li>
                            <li><NavLink to='/outfits'>outfits </NavLink></li>
                            <li><NavLink to='/addItem'><FontAwesomeIcon icon={faPlus}/></NavLink></li>
                            <li><NavLink to='/deleteItem'><FontAwesomeIcon icon={faMinus}/></NavLink></li>
                            <li> <NavLink to='/signOut'><FontAwesomeIcon icon={faSignOutAlt}/></NavLink></li>
                        </div>
                    : 
                        <div className="Nav">
                            <li style={{"marginRight":"50px"}}><NavLink to='/start'>Start with finding weather... </NavLink></li>
                            <li><NavLink to='/outfits'>outfits </NavLink></li>
                            <li><NavLink to='/addItem'><FontAwesomeIcon icon={faPlus}/></NavLink></li>
                            <li><NavLink to='/deleteItem'><FontAwesomeIcon icon={faMinus}/></NavLink></li>
                            <li> <NavLink to='/signOut'><FontAwesomeIcon icon={faSignOutAlt}/></NavLink> </li>
                        </div>
                : 
                    <div  className="Nav">
                        <li><NavLink to='/guest'>Guest</NavLink></li>
                        <li><NavLink to='/auth' ><FontAwesomeIcon icon={faSignInAlt}/></NavLink></li>
                    </div>
            }
        </ul>
        )
    }
}
// const mapStateToProps = state => {
//     return {
//         error: state.auth.error,
//         message: state.auth.message,
//         isAuthenticated: state.auth.token !== null,
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         onAuth: (firstName,lastName, email, password, isSignup ) => dispatch( actions.auth(firstName,lastName, email, password, isSignup) ),
//         // onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Nav);
export default Nav;