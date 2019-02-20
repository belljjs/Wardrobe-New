import React, { Component } from 'react'
import { Container, Row, Col, Form, FormGroup, FormText, Label, Input } from 'reactstrap';
import axios from 'axios';
// import { Redirect } from 'react-router-dom'
import Button from '../UI/Button/Button';
import $ from 'jquery';
import './AddItem.css';

class AddItem extends Component {

    state = {
        category: "" ,
        color: "" ,
        season: "" ,
        occasion: "" ,
        selectedFile: "",  //  for selectedFile.name
        submitted: false,
        imageKey: null,    //  for image file url to be used for preview before image uploading
        imageLocation: null,    //  for image file url to be used for preview before image uploading
        validInput: false
    }

    handleFileSelected = event => {
        console.log("event.target.files[0]:",event.target.files[0]);
        this.setState({ 
            selectedFile: event.target.files[0] ,
            imageKey: URL.createObjectURL(event.target.files[0]) 
        })
    };

    imageUpload = async () => {
        const imageData = new FormData();

            // This is setting 'this.state.selectedFile' to 'this.state.selectedFile.name'.
        imageData.append( 'itemImage', this.state.selectedFile, this.state.selectedFile.name);
        const res =  await axios.post('api/item/imageUpload/', imageData, {
                    headers: {
                        'accept': 'application/json',
                        'Accept-Language': 'en-US,en;q=0.8',
                        'Content-Type': `multipart/form-data; boundary=${imageData._boundary}`,
                    }
                })
        if(res) {
            console.log("************(In imageUpload) res.data:", res.data);
            console.log("************(In imageUpload) res.error:", res.error);
            if (res.data.error ) {
                console.log("res.data.error:",res.data.error);
                console.log("res.data.error.code:",res.data.error.code);

                if ( 'LIMIT_FILE_SIZE' === res.data.error.code ) {
                    console.log("Size error")
                    this.showAlert( 'Max size: 2MB', 'violet' );
                } else {
                    console.log("File type error")
                    this.showAlert("File type error", 'violet' );
                }
            }else {  
                console.log( 'Success!- image Uploaded' );
                // this.showAlert("image Uploaded", 'yellow' );

                // to check res and use it to make item
                this.setState({
                    imageKey: res.data.image,
                    imageLocation: res.data.location
                }) 
                console.log("States after image upload:", this.state);
            }
        }
    }


    handleCatagoryChange= (e) => {
        this.setState({category: e.target.value })
    }
    handleColorChange= (e) => {
        this.setState({color: e.target.value })
    }
    handleSeasonChange= (e) => {
        this.setState({season: e.target.value })
    }
    handleOccasionChange= (e) => {
        this.setState({occasion: e.target.value })
    }
    inputValidation = () => {
        this.setState({validInput: true})
    }

    createNewItem = async () => {
        this.inputValidation();
        if (this.state.validInput){
            
            console.log("States at the begining of createNewItem:", this.state);
            const newItem = {
                category: this.state.category,
                color: this.state.color,
                season: this.state.season,
                occasion: this.state.occasion,
                imageKey: this.state.imageKey,
                imageLocation: this.state.imageLocation
            }

            console.log("<<<<<< newItem:",newItem)

            const res= await axios.post('api/item/newItem/', {item : newItem })
          
            console.log("<<<<<< res:",res)

            if(res) {
                console.log("************(In createNewItem) res.data:", res.data);
                console.log("************(In createNewItem) res.error:", res.error);

                if (res.data.error ) {
                    console.log("res.data.error:",res.data.error);
                    console.log("res.data.error.code:",res.data.error.code);
                }else {  
                    console.log( 'Success!' );
                    this.showAlert("Item Uploaded", 'yellow' );
                    this.setState({ submitted: true }) 
                    console.log("State after new item insert : ", this.state);
                }
            }
        } else {
            this.showAlert( "Please check input ", 'violet' );
            console.log("Input validation error! ");
        } 

    }

    
    handleItemAdd = (e) => {
        if(this.state.selectedFile) {
            this.imageUpload()
            .then(res => {
                console.log( "(~~ After image upload handleItemdd) res:", res)
                this.createNewItem()
            })
            .catch( (error) => {
                this.showAlert(  "(~~ After image upload) error:", error, 'red' );
            });
        } else {
                this.showAlert( "Please choose a file", 'violet' );
                console.log("file is not selected! ");
        } 
      
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
                                    <img style={{marginTop: '2vh'}} className="fileImage" src={this.state.imageKey} alt=""/>
                                </FormGroup>
                            </Col>
                            <Col style={{marginTop: '3vh'}}>
                                <FormGroup style={{display: "flex"}}>
                                    <Label for="category"style={{width: "110px",textAlign: "left"}} >Category</Label>
                                    <Input type="select" name="select" id="category" onChange={this.handleCatagoryChange} value={this.state.category} >
                                        <option></option>
                                        <option>top</option>
                                        <option>bottom</option>
                                        <option>dress</option>
                                        <option>bag</option>
                                        <option>shoes</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup style={{display: "flex"}}>
                                    <Label for="color" style={{width: "110px", textAlign: "left"}}>Color</Label>
                                    <Input type="select" name="select" id="color" onChange={this.handleColorChange} value={this.state.color}>
                                        <option></option>
                                        <option>white</option>
                                        <option>grey</option>
                                        <option>black</option>
                                        <option>beige</option>
                                        <option>blue</option>
                                        <option>red</option>
                                        <option>green</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup style={{display: "flex"}}>
                                    <Label for="season"style={{width: "110px",textAlign: "left"}} >Season</Label>
                                    <Input type="select" name="select" id="season" onChange={this.handleSeasonChange} value={this.state.season}>
                                        <option></option>
                                        <option>summer</option>
                                        <option>winters</option>
                                        <option>spring/fall</option>
                                        <option>all</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup style={{display: "flex"}}>
                                    <Label for="occasion" style={{width: "110px", textAlign: "left"}}>Occasion</Label>
                                    <Input type="select" name="select" id="occasion" onChange={this.handleOccasionChange} value={this.state.occasion}>
                                        <option></option> 
                                        <option>formal</option>
                                        <option>casual</option>
                                        <option>exercise</option>
                                        <option>all</option>
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