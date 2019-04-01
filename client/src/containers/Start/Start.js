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
        newCityName: ""
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
      toCelcius = (farenheit) =>{
        return (farenheit-32) *5/9;
      }
      getWeather = async (cityName) => {
        const response = await axios(`/api/weather/${cityName}`)
        const weather = response.data
        console.log("WEATHER:",weather);
        weather.main.temp = this.toCelcius(weather.main.temp );
        weather.main.temp_max = this.toCelcius(weather.main.temp_max );
        weather.main.temp_min = this.toCelcius(weather.main.temp_min );

        // to store weatherInfo with redux 
        const weatherInfo ={
          weatherName: weather.weather[0].main,
          weatherIcon: weather.weather[0].icon,
          highTemp: weather.main.temp_max,
          lowTemp: weather.main.temp_min,
          cityName: cityName
        }
        const dispatchResult = this.props.onWeatherStore(weatherInfo);
        return weather;
      }
      
      getProposal = async (weather) => {
          if (!weather)
              return {};
          try {
              const data = await axios.get(
                  '/api/outfit/outfit',
                  {params: {highTemp: weather.main.temp_max, userId: localStorage.userId}});
              if(data.data[0]) {
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
        const proposal = await this.getProposal(weather);
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
                                <Button color="info" onClick={this.handleAddCity}>Add City</Button>
                          </InputGroupAddon>
                      </InputGroup>
                      <Weather data={this.state.weather}/>   
                  </Col>
                  <Col>
                    <div>
                      <h1 className="title" > Proposal for this weather </h1>
                      <Proposal 
                        proposal={this.state.proposal} 
                        weather={ this.state.weather}/>
                    </div>

                  </Col>
              </Row>
            </Container>
          
        );
      }
    }
    

// const mapStateToProps = state => {
//     console.log("state(store):", state);
//     return {weatherStore: state.weatherInfo }
// }
const mapDispatchToProps = dispatch => {
  return {
      onWeatherStore: (weatherInfo) => dispatch(actions.weatherStore(weatherInfo))
  }
}
export default connect(null,mapDispatchToProps)(Start);
    // export default Start;
    