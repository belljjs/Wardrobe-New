import React, { Component } from 'react';
import { Container, Row, Col, InputGroup, Button, InputGroupAddon, Input, FormGroup,} from 'reactstrap';
import Weather  from './Weather';
import axios from 'axios';


class Start extends Component {
    state = {
        weather: null,
        cityList: [],
        newCityName: "",
        dropdownOpen: false,
        splitButtonOpen: false
        
      }
      toggleDropDown = () => {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
      }
    
      toggleSplit = () =>  {
        this.setState({
          splitButtonOpen: !this.state.splitButtonOpen
        });
      }
    
      getCityList = async () => {
        const response = await axios('/api/cities', {params: {userId: localStorage.userId  }})
        console.log("response of get all city : ", response);
        let cityList = response.data.map(r => r.city_name);
        this.setState({ cityList});
        };
   
    
      handleAddCity = async () => {
        console.log("localStorage.userId:",localStorage.userId)
        const response= await axios.post('/api/cities', { city: this.state.newCityName, userId: localStorage.userId })
        console.log("response : ", response);
        this.getCityList();
        this.setState({ newCityName: "" });
      };
      
      handleInputChange = (e) => {
        this.setState({newCityName: e.target.value});
      }
    
      getWeather = async (city) => {
        console.log(city);
        const response = await axios(`/api/weather/${city}`)
        console.log("response of get weather: ", response);
        this.setState({ weather: response.data});
        
      }
    
      handleChangeCity = (e) => {
          console.log("e.target.value: ",e.target.value);
        this.getWeather(e.target.value);
      }
    
      componentDidMount () {
        this.getCityList();   // get the cities in the begining
      }
    
      render() {
        return (
          <Container>
            <Row>
                <Col>
                        <h1 className="title">Current Weather</h1>
                        <FormGroup>
                            <Input type="select" onChange={this.handleChangeCity}>
                            { this.state.cityList.length === 0 && <option>No city added yet.</option>}
                            { this.state.cityList.length > 0 && <option>Select a city.</option> }
                            { this.state.cityList.map((city, i) => <option key={i}>{city}</option>) }
                            </Input>
                        </FormGroup>
 
                        <InputGroup style={{width: '275px'}}>
                            <Input 
                                placeholder="New city name..."
                                value={this.state.newCityName}
                                onChange={this.handleInputChange}
                            />
                            <InputGroupAddon addonType="append">
                                 <Button color="primary" onClick={this.handleAddCity}>Add City</Button>
                            </InputGroupAddon>
                        </InputGroup>
                        <Weather data={this.state.weather}/>   
                </Col>
                <Col>
                   <h1 className="title" > Proposal </h1>
     
                </Col>
            </Row>
          </Container>
    
        );
      }
    }
    
    export default Start;
    