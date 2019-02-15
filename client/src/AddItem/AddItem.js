import React, { Component } from 'react'
import { Container, Row, Col, Form, FormGroup, FormText, Label, Input } from 'reactstrap';


import { Redirect } from 'react-router-dom'
// import axios from 'axios'
import Button from '../UI/Button/Button';


class AddItem extends Component {
    state = {
        submitted: false
    }
    postDataHandler = ()=>{
        this.setState({submitted: true})

        // const data = {
        //     title: this.state.title,
        //     body: this.state.content,
        //     author: this.state.author,
        // }
        // axios.post('https://jsonplaceholder.typicode.com/posts',data)
        // .then(res=>{
        //     console.log(res);
        //     this.setState({submitted: true})
        //     //this.props.history.push('/Posts');
        // })
    }

    render() {
        let redirect = null;
        if (this.state.submitted){
            redirect = <Redirect to='/closet'/>
        }
        return (
            <div>
                {redirect}
                <Container>
                    <Row>
                        <Col>
                            <h3 className="title">Add Item</h3>
                            <Form>
                                <FormGroup style={{marginBottom: "30px"}}>
                                    <div>
                                        <Label for="exampleFile" style={{textAlign: "left", width: "100%"}} >Image</Label>
                                        <Input type="file" name="file" id="exampleFile" />
                                    </div>
                                    <FormText color="muted">
                                        <p>Choose image file for the item to be added.</p>
                                    </FormText>
                                </FormGroup>
                                <FormGroup style={{display: "flex"}}>
                                    <Label for="category"style={{width: "110px",textAlign: "left"}} >Category</Label>
                                    <Input type="select" name="select" id="category">
                                        <option>Top</option>
                                        <option>Bottom</option>
                                        <option>Dress</option>
                                        <option>Shoes</option>
                                        <option>Bag</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup style={{display: "flex"}}>
                                    <Label for="color" style={{width: "110px", textAlign: "left"}}>Color</Label>
                                    <Input type="select" name="select" id="color">
                                        <option>White</option>
                                        <option>Brown</option>
                                        <option>Red</option>
                                        <option>Green</option>
                                        <option>Grey</option>
                                        <option>Black</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup style={{display: "flex"}}>
                                    <Label for="season"style={{width: "110px",textAlign: "left"}} >Season</Label>
                                    <Input type="select" name="select" id="season">
                                        <option>Top</option>
                                        <option>Bottom</option>
                                        <option>Dress</option>
                                        <option>Shoes</option>
                                        <option>Bag</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup style={{display: "flex"}}>
                                    <Label for="occasion" style={{width: "110px", textAlign: "left"}}>Occasion</Label>
                                    <Input type="select" name="select" id="occasion">
                                        <option>White</option>
                                        <option>Brown</option>
                                        <option>Red</option>
                                        <option>Green</option>
                                        <option>Grey</option>
                                        <option>Black</option>
                                    </Input>
                                </FormGroup>
                                <Button clicked={this.postDataHandler}> SUBMIT </Button>
                            </Form>
                       </Col>
                        <Col>
                            <h3 className="title">Item Image</h3>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default AddItem;