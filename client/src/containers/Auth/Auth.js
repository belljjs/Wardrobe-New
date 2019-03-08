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
            this.state.controls.password.value );

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
    componentDidMount () {
        console.log("props:",this.props)
        if (this.props.location.hash === "#up") {
            this.setState({isSignup : true})
        } else {
            this.setState({isSignup : false})
        }
         

    }
    render() {
        let nameControl = null;
        let title = "Sign In";
        if (this.props.location.pathname === "/signUp") {
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
       

        return (
            <div className="Auth">
                <h3 className="title">{title}</h3>
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
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (firstName,lastName, email, password) => dispatch( actions.auth(firstName,lastName, email, password) ),
        // onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect(null, mapDispatchToProps)(Auth);