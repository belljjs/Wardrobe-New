import React, { Component } from 'react'
import { Container, Row, Col, Form, FormGroup, FormText, Label, Input } from 'reactstrap';
import ItemImage from './ItemImage';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import Button from '../UI/Button/Button';
import $ from 'jquery';

class AddItem extends Component {
    state = {
        selectedFile: null,
        submitted: false,
        test: "helo"
    }
    handleItemAdd = async ()=>{
        if(this.state.selectedFile) {
            // upload image file //
            console.log("In hadleItemAdd.....")
            const imageData = new FormData();

            // 'imageFile' is name of input. 
            // This is setting 'this.state.selectedFile' to 'this.state.selectedFile.name'.
            imageData.append( 'itemImage', this.state.selectedFile, this.state.selectedFile.name);
            const response = await axios.post('api/imageUpload/', imageData, {
                headers: {
					'accept': 'application/json',
					'Accept-Language': 'en-US,en;q=0.8',
					'Content-Type': `multipart/form-data; boundary=${imageData._boundary}`,
				}
            })
            console.log("response to image post:", response);
			// 	.then( ( response ) => {
			// 		if ( 200 === response.status ) {
			// 			// If file size is larger than expected.
			// 			if( response.data.error ) {
			// 				if ( 'LIMIT_FILE_SIZE' === response.data.error.code ) {
			// 					this.ocShowAlert( 'Max size: 2MB', 'red' );
			// 				} else {
			// 					console.log( response.data );
            //                     // If not the given file type
			// 					this.ocShowAlert( response.data.error, 'red' );
			// 				}
			// 			} else {
			// 				// Success
			// 				let fileName = response.data;
			// 				console.log( 'file data', fileName );
			// 				this.ocShowAlert( 'File Uploaded', '#3089cf' );
			// 			}
			// 		}
			// 	}).catch( ( error ) => {
			// 	// If another error
			// 	this.ocShowAlert( error, 'red' );
			// });
        }  else {
			// if file not selected throw error
			this.ocShowAlert( 'Please upload file', 'red' );
        }

             // create newItem//
        // let newItem = {};
        // const response = await axios.post('/api/item', {item: newItem});
        //     console.log("response : ", response);
        //     this.setState({submitted: true})
           // this.props.history.push('/closet');
    };

    handleFileSelected = event => {
        console.log("event.target.files[0]:",event.target.files[0])
        this.setState({ selectedFile: event.target.files[0] })
      }
    
    ocShowAlert = ( message, background = '#3089cf' ) => {
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
		}, 3000 );
	};

    render() {
        let redirect = null;
        if (this.state.submitted){
            redirect = <Redirect to='/closet'/>
        }
        console.log("this.state in render", this.state);
        return (
            <div>
                {redirect}
                {/* For Alert box*/}
				<div id="oc-alert-container"></div>
                <Container>
                    <Row>
                        <Col>
                            <h3 className="title">Add Item</h3>
                            <Form>
                                <FormGroup style={{marginBottom: "30px"}}>
                                    <div>
                                        <Label for="exampleFile" style={{textAlign: "left", width: "100%"}} >Image</Label>
                                        <Input type="file" name="file" id="exampleFile"onChange={this.handleFileSelected} />
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
                                <Button clicked={this.handleItemAdd}> SUBMIT </Button>
                            </Form>
                       </Col>
                        <Col>
                            <h3 className="title">Item Image</h3>
                            <p>{(this.state.selectedFile)? this.state.selectedFile.name : 'null' }</p>
                            <ItemImage data={this.state}/>
                            
                        </Col>
                    </Row>
                </Container>
                {/* For Alert box*/}
				<div id="oc-alert-container">error?</div>
            </div>
        );
    }
}

export default AddItem;