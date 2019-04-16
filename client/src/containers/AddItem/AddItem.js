import React, { Component } from 'react'
import { Container, Row, Col, Form, FormGroup, FormText, Label, Input } from 'reactstrap';
import axios from 'axios';
import Button from '../../UI/Button/Button';
import $ from 'jquery';
import './AddItem.css';
import Spinner from '../../UI/Spinner/Spinner';

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
        validInput: false,
        loading: false
    }

    handleFileSelected = event => {
        if (event.target.files[0]){
            this.setState({ 
                selectedFile: event.target.files[0] ,
                imageKey: URL.createObjectURL(event.target.files[0]) 
            }) 
        }
    };

    // Upload to  AWS S3
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
            if (res.data.error ) {
                if ( 'LIMIT_FILE_SIZE' === res.data.error.code ) {
                    this.showAlert( 'Max size: 2MB', 'violet' );
                } else {
                    this.showAlert("File type error", 'violet' );
                }
            }else {  
                this.setState({
                    imageKey: res.data.image,
                    imageLocation: res.data.location
                }) 
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
            const newItem = {
                category: this.state.category,
                color: this.state.color,
                season: this.state.season,
                occasion: this.state.occasion,
                imageKey: this.state.imageKey,
                imageLocation: this.state.imageLocation
            }
            const res= await axios.post(
                'api/item/newItem/', 
                // req.body
                {item : newItem, userId: localStorage.userId },
                // for authorization
                {headers: {autorization: localStorage.token}}
            )
            if(res) {
                if (res.data.error ) {
                    // console.log("res.data.error:",res.data.error);
                }else {  
                    // console.log( 'Success!' );
                    this.showAlert("Item Uploaded!", 'white' );
                    this.setState({ submitted: true }) 
                }
            }
        } else {
            this.showAlert( "Invalid input! ", 'white' );
            // console.log("Input validation error! ");
        } 
    }

    handleItemAdd = (e) => {


        if(this.state.selectedFile) {

            this.setState({loading: true});
            console.log("Start loading...");

            this.imageUpload()
            .then(res => {
                console.log("End loading...")
                this.setState({loading: false});
                this.createNewItem();
            })
            .catch( (error) => {
                console.log("End loading...")
                this.setState({loading: false});
                this.showAlert(error, 'red' );
            });

           

        } else {
            this.showAlert( "Please choose a file", 'violet' );
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
		}, 5000 );
	};

    render() {
        const formLabel = {width: "120px", textAlign: "left", fontWeight: "bold"};
        const imageLabel = {textAlign: "left", width: "100%", marginBottom: "20px", fontWeight: "bold"};
        const chooseFile = { color: "rgb(141, 216, 226)"};
        const colors = ["white", "grey", "black", "beige","red","blue","green","yellow"];
        const colorOptions = colors.map((c,i) => <option key={i} >{c}</option>)
        const season = ["summer","winter","spring/fall","all"];
        const seasonOptions = season.map((s,i) => <option key={i} >{s}</option>)
        const occasion = ["formal","casual","exercise"];
        const occasionOptions = occasion.map((s,i) => <option key={i} >{s}</option>)       

        let processing = null
        if (this.state.loading) {
            processing = <Spinner />
        }

        return (
            <Container>
                <h3 className="title">Add Item</h3>
                    <Form>
                        <Row>
                            <Col>
                                <FormGroup style={{marginBottom: "30px"}}>
                                    <div>
                                        <Label for="imgInput" style={imageLabel} >Item Image</Label>
                                        <Input type="file" style={chooseFile} name="file" id="imgInput" onChange={this.handleFileSelected} />
                                    </div>
                                    <FormText color="muted">
                                        <p>Choose image file for the item to be added.</p>
                                    </FormText>

                                    {/* Image preview */}
                                    <img style={{marginTop: '2vh'}} className="fileImage" src={this.state.imageKey} alt=""/>
                                </FormGroup>
                            </Col>
                            <Col style={{marginTop: '3vh'}}>
                                <FormGroup style={{display: "flex"}}>
                                    <Label for="category" style={formLabel} >Category</Label>
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
                                    <Label for="color" style={formLabel}>Color</Label>
                                    <Input type="select" name="select" id="color" onChange={this.handleColorChange} value={this.state.color}>
                                        <option></option>
                                        {colorOptions}
                                    </Input>
                                </FormGroup>
                                <FormGroup style={{display: "flex"}}>
                                    <Label for="season" style={formLabel}>Season</Label>
                                    <Input type="select" name="select" id="season" onChange={this.handleSeasonChange} value={this.state.season}>
                                        <option></option>
                                        {seasonOptions}
                                    </Input>
                                </FormGroup>
                                <FormGroup style={{display: "flex"}}>
                                    <Label for="occasion"style={formLabel}>Occasion</Label>
                                    <Input type="select" name="select" id="occasion" onChange={this.handleOccasionChange} value={this.state.occasion}>
                                        <option></option> 
                                        {occasionOptions}
                                    </Input>
                                </FormGroup>
                                <Button clicked={this.handleItemAdd}> SUBMIT </Button>
                                <div id="oc-alert-container"></div>
                                <div>{processing}</div>
                            </Col>
                        </Row>
                    </Form>
            </Container>
        );
    }
}

export default AddItem;