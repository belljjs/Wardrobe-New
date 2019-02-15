import React, { Component } from 'react';
import { Container, 
    Row, Col, InputGroup, Button, InputGroupAddon, 
    Input, FormGroup, InputGroupButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

import Weather  from './Weather';


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
    
      getCityList = () => {
        fetch('/api/cities')    
        .then(res => res.json())
        .then(res => {
          var cityList = res.map(r => r.city_name);
          this.setState({ cityList });
        });
      };
    
      handleAddCity = () => {
        fetch('/api/cities', {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ city: this.state.newCityName })
        })
        // not specially meaningful
        .then(res => res.json())  
        .then(res => {
          // update state cityList
          this.getCityList();
          this.setState({ newCityName: "" });
        });
      };
      
      handleInputChange = (e) => {
        this.setState({newCityName: e.target.value});
      }
    
    
      getWeather = (city) => {
        console.log(city);
        fetch(`/api/weather/${city}`)
        .then(res => res.json())
        .then(weather => {
          console.log(weather);
          this.setState({ weather });
        });
      }
    
      handleChangeCity = (e) => {
          console.log("e.target.value: ",e.target.value);
        this.getWeather(e.target.value);
      }
      handleChangeCity2 = (city) => {
        console.log("city",city);
      this.getWeather(city);
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
                                onChange={this.handleInputChange}  />
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
    