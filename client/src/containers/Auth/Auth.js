import React, { Component } from 'react';
import Button from '../../UI/Button/Button';
import { Form, Label, Input } from 'reactstrap';
import './Auth.css';
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

class Auth extends Component {
    state = {
        controls: {
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
        this.props.onAuth( this.state.controls.email.value, this.state.controls.password.value );

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
    render() {
       
        return (
            <div className="Auth">
                <Form>
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
        onAuth: ( email, password) => dispatch( actions.auth( email, password) ),
        // onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect(null, mapDispatchToProps)(Auth);