import React, { Component } from 'react'
import { Container, Row, Col, Form, FormGroup, FormText, Label, Input } from 'reactstrap';
import axios from 'axios';
// import { Redirect } from 'react-router-dom'
import Button from '../UI/Button/Button';
import $ from 'jquery';
import './AddItem.css';

class AddItem extends Component {

    state = {
        selectedFile: null,  //  for selectedFile.name
        submitted: false,
        imageURL: null,    //  for image file url to be used for preview before image uploading
        imageLocation: null    //  for image file url to be used for preview before image uploading
    }

    handleFileSelected = event => {
        console.log("event.target.files[0]:",event.target.files[0]);
        this.setState({ 
            selectedFile: event.target.files[0] ,
            imageURL: URL.createObjectURL(event.target.files[0]) 
        })
    };


    imageUpload = async () => {
        const imageData = new FormData();

            // This is setting 'this.state.selectedFile' to 'this.state.selectedFile.name'.
        imageData.append( 'itemImage', this.state.selectedFile, this.state.selectedFile.name);
        return axios.post('api/item/imageUpload/', imageData, {
                    headers: {
                        'accept': 'application/json',
                        'Accept-Language': 'en-US,en;q=0.8',
                        'Content-Type': `multipart/form-data; boundary=${imageData._boundary}`,
                    }
                })
                .then(res => res.data)
                .catch(err => console.error(err))

    }

    handleItemAdd = (e) => {
        
        if(this.state.selectedFile) {
            this.imageUpload()
            .then(res => {
                if (res.error ) {
                    console.log("res.error:",res.error);
                    console.log("res.error.code:",res.error.code);
                    if ( 'LIMIT_FILE_SIZE' === res.error.code ) {
                        console.log("Size error")
                        this.showAlert( 'Max size: 2MB', 'violet' );
                    } else {
                        console.log("File type error")
                        this.showAlert("File type error", 'violet' );
                    }
                }else {  // Success
                    console.log( 'Success!' );
                    this.showAlert("File Uploaded", 'yellow' );

                    // to check res and use it to make item
                    this.setState({imageLocation: res.location}) 
                }
            })
            .catch( (error) => {
                    this.showAlert( error, 'red' );
            } );
        } else {
                this.showAlert( "Please choose a file", 'violet' );
                console.log("file is not selected! ");
        } 

		
       

             // create newItem//
        // let newItem = {};
        // const response = await axios.post('/api/item', {item: newItem});
        //     console.log("response : ", response);
        //     this.setState({submitted: true})
           // this.props.history.push('/closet');
    };


    
    showAlert = ( message, background = '#3089cf' ) => {
		let alertContainer = document.querySelector( '#oc-alert-container' ),
			alertEl = document.createElement( 'div' ),
			textNode = document.createTextNode( message );
		alertEl.setAttribute( 'class', 'oc-alert-pop-up' );
		$( alertEl ).css( 'background', background );
		alertEl.appendChild( textNode );
		alertContainer.appendChild( alertEl );
		setTimeout( function () {
			$( alertEl ).fadeOut( 'slow' );
			$( alertEl ).remove();
		}, 6000 );
	};

    render() {
        // let redirect = null;
        // if (this.state.submitted){
        //     redirect = <Redirect to='/closet'/>
        // }
        console.log("this.state in render", this.state);
        return (
            <div>
                {/* {redirect} */}
                <Container>
                    <h3 className="title">Add Item</h3>
                        <Form>
                            <Row>
                            <Col>
                                <FormGroup style={{marginBottom: "30px"}}>
                                    <div>
                                        <Label for="imgInput" style={{textAlign: "left", width: "100%", marginBottom: "20px"}} >Item Image</Label>
                                        <Input type="file" name="file" id="imgInput" onChange={this.handleFileSelected} />
                                    </div>
                                    <FormText color="muted">
                                        <p>Choose image file for the item to be added.</p>
                                    </FormText>
                                    <img style={{marginTop: '2vh'}} className="fileImage" src={this.state.imageURL} alt=""/>
                                </FormGroup>
                            </Col>
                            <Col style={{marginTop: '3vh'}}>
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
                                <Button clicked={this.handleItemAdd}> SUBMIT </Button>
                                <div id="oc-alert-container"></div>
                                {/* <div>Image Location: {this.state.imageLocation}</div> */}
                            </Col>
                            </Row>
                        </Form>
                </Container>
               
            </div>
        );
    }
}

export default AddItem;