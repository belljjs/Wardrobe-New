import React, { Component } from 'react';
import Button from '../../UI/Button/Button';
import { Form, Label, Input } from 'reactstrap';
import './Auth.css';
import '../../global.css' ;
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../../store/actions/index";

class Auth extends Component {
    state = {
        controls: {
            firstName: {
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                invalidMessage: "Required",
                info: "required"
            },
            lastName: {
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                invalidMessage: ""
            },
            email: {
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                invalidMessage: "Need email format",
                info: "required"
            },
            password: {
                value: '',
                validation: {
                    required: true,
                    minLength: 3
                },
                valid: false,
                invalidMessage: " Too short password",
                info: "required"
            },
        },
        isSignup: false,
        submitResult: ""
    }

    checkValidity ( value, rules ) {
        let isValid = true;

        if ( rules.required ) {
            isValid = (value.trim() !== '') && isValid;
        } 
        if ( rules.minLength ) {
            isValid = (value.length >= rules.minLength) && isValid
        }
        if ( rules.isEmail ) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test( value ) && isValid
        }
        return isValid;
    }
    validAllControls = ()=>{
        let controlsArr =[]
        const controls = {...this.state.controls}

        if(!this.state.isSignup) {
            delete controls.firstName;
            delete controls.lastName;
        }
        controlsArr = 
            Object.keys(controls).map(key => {
                return {[key]: controls[key]};
            })
        let validAll = false
        let allTrue = true; // find false
        controlsArr.forEach(obj =>{
            const inner = Object.values(obj);
            allTrue = inner[0].valid && allTrue ;
        })
        if(allTrue) 
        { validAll = true }
        return validAll;
    }

    submitHandler= (event)=>{
        console.log("**** In submitHandler")
        event.preventDefault();
        if (this.validAllControls()){
            console.log("Allcontrols are valid:", this.state.controls);
            console.log("controls before onAuth:", this.state.controls);
            this.props.onAuth( 
                this.state.controls.firstName.value, 
                this.state.controls.lastName.value, 
                this.state.controls.email.value, 
                this.state.controls.password.value,
                this.state.isSignup );
            this.setState({submitResult: ""})
            
        } else {
            this.setState({submitResult: "Invalid Input. Please try again."})
        }
    }

    inputChangeHandler= (event, controlName)=>{
        const validCheck = this.checkValidity( event.target.value, this.state.controls[controlName].validation )

        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: validCheck,
                info: validCheck ? "" : this.state.controls[controlName].invalidMessage
            }
        };
        this.setState({ controls: updatedControls});
    }
    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        });
    }

    render() {
        let nameControl = null;
        let title = "Sign in";
        if (this.state.isSignup) {
            title = "Sign up"
            nameControl = (
                <div> 
                    <div className="Control">
                        <Label>First Name</Label> <span className="info">{this.state.controls.firstName.info} </span>
                        <Input type="text" name="firstName" value={this.state.controls.firstName.value} onChange={(e) => this.inputChangeHandler(e,"firstName")}></Input>
                    </div>
                    <div className="Control">
                        <Label>Last Name</Label>
                        <Input type="text" name="lastName" value={this.state.controls.lastName.value} onChange={(e) => this.inputChangeHandler(e,'lastName')}></Input>
                    </div>
                </div>
            )     
        } 
       
        
        let notice = this.props.error || this.props.message || null;
        notice = <p> {notice}</p>

        // let authRedirect = null
        // if (this.props.isAuthenticated) {
        //     authRedirect = <Redirect to='/start' />
        // }

        return (
            <div className="Auth">
                {/* {authRedirect} */}
                <h3 className="title">{title}</h3>
                <h5>{this.state.submitResult}</h5>
                {notice}
                <Form>
                    {nameControl}
                    <div className="Control">
                        <Label>Email</Label> <span className="info">{this.state.controls.email.info} </span>
                        <Input type="email" name="email" value={this.state.controls.email.value} onChange={(e) => this.inputChangeHandler(e,"email")}></Input>
                    </div>
                    <div className="Control">
                        <Label>Password</Label> <span className="info">{this.state.controls.password.info} </span>
                        <Input type="password" name="password" value={this.state.controls.password.value} onChange={(e) => this.inputChangeHandler(e,'password')}></Input>
                    </div>
                    
                    <Button  clicked={this.submitHandler}> Submit </Button>
                </Form>
                <div className="Mode">
                    <div> {this.state.isSignup ? "Go back to Sign In" :'Create a new account' } </div>
                    <Button clicked={this.switchAuthModeHandler}
                        >{this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
                </div>
               

            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        error: state.error,
        message: state.message,
        isAuthenticated: state.token !== null,

    };
};
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (firstName,lastName, email, password, isSignup ) => dispatch( actions.auth(firstName,lastName, email, password, isSignup) ),
        // onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);