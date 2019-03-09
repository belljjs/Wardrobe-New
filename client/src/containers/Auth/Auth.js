import React, { Component } from 'react';
import Button from '../../UI/Button/Button';
import { Form, Label, Input } from 'reactstrap';
import './Auth.css';
import '../../global.css' ;
import { connect } from "react-redux";
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
            },
            lastName: {
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
            },
            email: {
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
            },
            password: {
                value: '',
                validation: {
                    required: true,
                    minLength: 3
                },
                valid: false,
            }
        },
        isSignup: true
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

    submitHandler= (event)=>{
        console.log("**** In submitHandler")
        event.preventDefault();
        console.log("controls before onAuth:", this.state.controls);
        this.props.onAuth( 
            this.state.controls.firstName.value, 
            this.state.controls.lastName.value, 
            this.state.controls.email.value, 
            this.state.controls.password.value,
            this.state.isSignup );

    }

    inputChangeHandler= (event, controlName)=>{
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity( event.target.value, this.state.controls[controlName].validation ),
            }
        };
        this.setState({ controls: updatedControls });
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
            title = "Sign Up"
            nameControl = (
                <div> 
                    <div className="Control">
                        <Label>First Name</Label>
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

        return (
            <div className="Auth">
                <h3 className="title">{title}</h3>
                {notice}
                <Form>
                    {nameControl}
                    <div className="Control">
                        <Label>Email</Label>
                        <Input type="email" name="email" value={this.state.controls.email.value} onChange={(e) => this.inputChangeHandler(e,"email")}></Input>
                    </div>
                    <div className="Control">
                        <Label>Password</Label>
                        <Input type="password" name="password" value={this.state.controls.password.value} onChange={(e) => this.inputChangeHandler(e,'password')}></Input>
                    </div>
                    
                    <Button  clicked={this.submitHandler}> Submit </Button>
                </Form>
                <div className="Mode">
                    <div> {this.state.isSignup ? "Go back to Sign In" : 'Create a new account'} </div>
                    <Button clicked={this.switchAuthModeHandler}
                        >{this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
                </div>
                <p>{this.state.isSignup}</p>

            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        // loading: state.auth.loading,
        error: state.error,
        message: state.message
        // isAuthenticated: state.auth.token !== null,
        // buildingBurger: state.burgerBuilder.building,
        // authRedirectPath: state.auth.authRedirectPath
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (firstName,lastName, email, password, isSignup ) => dispatch( actions.auth(firstName,lastName, email, password, isSignup) ),
        // onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);