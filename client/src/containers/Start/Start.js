import React, { Component } from 'react';
import { Container, Row, Col, InputGroup, Button, InputGroupAddon, Input, FormGroup,} from 'reactstrap';
import Weather  from './Weather';
import axios from 'axios';
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Proposal from './Proposal';
import './Start.css';


class Start extends Component {
    state = {
        weather: null,
        proposal: null,
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
        const response = await axios(`/api/weather/${city}`)
       
        // to store weatherInfo with redux 
        const weatherInfo ={
          weatherName: response.data.weather[0].main,
          weatherIcon: response.data.weather[0].icon,
          highTemp: response.data.main.temp_max,
          lowTemp: response.data.main.temp_min
        }

        const dispatchResult = this.props.onWeatherStore(weatherInfo);
        // console.log("dispatchResult:",dispatchResult);
        
        const weather = response.data
        console.log("In getWeather weather:", weather);
        return weather;
      }
      
      getProposal = async (weather) => {
          console.log("weather in getProposal:", weather);

          if (!weather)
              return {};

          try {
              const data = await axios.get(
                  '/api/outfit/outfit',
                  {params: {highTemp: weather.main.temp_max, userId: localStorage.userId}})
              
              if(data.data[0]) {
                console.log("data.data[0]: ", data.data[0]);
                console.log("data: ", data);
                return data
              } else {
                return {}
              }
          }
          catch (error){ 
              console.log(" getProposal error", error);
              return {};
          }
      }
  
      handleChangeCity = async (e) => {
        
        const weather = await this.getWeather(e.target.value);
        console.log("weather in handleCgangeCity: ",weather);
        
        const proposal = await this.getProposal(weather);
        console.log("proposal in handleCgangeCity: ",proposal);

        this.setState({
           weather: weather,
           proposal: proposal
        });

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
                      <Proposal 
                        proposal={this.state.proposal} weather={ this.state.weather}/>
                  </Col>
              </Row>
            </Container>
          
        );
      }
    }
    

// const mapStateToProps = state => {
//     console.log("state(store):", state);
//     return {weatherInfoFromStore: state.weatherInfo }
// }
const mapDispatchToProps = dispatch => {
  return {
      onWeatherStore: (weatherInfo) => dispatch(actions.weatherStore(weatherInfo))
  }
}
export default connect(null,mapDispatchToProps)(Start);
    // export default Start;
    