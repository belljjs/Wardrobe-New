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
      proposal: null,
      cityList: [],
      newCityName: "",
      error: null,
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
      
  handleNewCityInputChange = (e) => {
    this.setState({newCityName: e.target.value});
  }

  toCelcius = (farenheit) =>{
    return Math.floor((farenheit-32) *5/9);
  }
  
  getWeather = async (cityName) => {
    try {
      const response = await axios(`/api/weather/${cityName}`)
      const weather = response.data
      weather.main.temp = this.toCelcius(weather.main.temp );
      weather.main.temp_max = this.toCelcius(weather.main.temp_max );
      weather.main.temp_min = this.toCelcius(weather.main.temp_min );
  
      // to store weatherInfo with redux 
      const weatherInfo ={
        cityName: cityName,
        name: weather.weather[0].main,
        description: weather.weather[0].description ,
        icon: weather.weather[0].icon,
        temp: weather.main.temp,
        highTemp: weather.main.temp_max,
        lowTemp: weather.main.temp_min,
        humidity: weather.main.humidity,
        wind: weather.wind.speed
      }
      this.props.onWeatherStore(weatherInfo);
      this.setState({error :null})
      return weatherInfo;
    }
    catch(error) {
      console.log(" getWeather error", error);
      this.setState({error : "City name is not found"})
      return {};
    }
  }
      
  getProposal = async (weatherInfo) => {
      if (!weatherInfo)
          return {};
      try {
          const proposal = await axios.get(
              '/api/outfit/outfit',
              {params: {highTemp: weatherInfo.highTemp, userId: localStorage.userId}});
          if(proposal.data[0]) {
              const proposalInfo ={
                proposal: proposal.data[0].items
              }
              this.props.onProposalStore(proposalInfo);
              return proposalInfo;
          }else{
              return {}
          }
      }
      catch (error){ 
          return {};
      }
  }
  
  handleChangeCity = async (e) => {
    const weatherInfo = await this.getWeather(e.target.value);
    if(weatherInfo.name) {
        const proposalInfo = await this.getProposal(weatherInfo);
        if (!proposalInfo) {
          this.setState({error : "proposal error"})
        }
     }
  }

    
  componentDidMount () {
    this.getCityList();   // get the cities in the begining
  }

  render() {
    let formOfCity = 
      <FormGroup>
          <Input type="select"  onChange={this.handleChangeCity}>
          { this.state.cityList.length === 0 && <option>No city added yet.</option>}
          { this.state.cityList.length > 0 && <option>Select a city.</option> }
          { this.state.cityList.map((city, i) => <option key={i}>{city}</option>) }
          </Input>
      </FormGroup>
   
    if (this.props.weather.cityName){
      formOfCity = 
            <FormGroup>
              <Input type="select" onChange={this.handleChangeCity}>
                <option>{this.props.weather.cityName}</option> 
                { this.state.cityList.map((city, i) => <option key={i}>{city}</option>) }
              </Input>
          </FormGroup>

       // to get the current temperature of the city
      //  let weatherInfo = this.getWeather(this.props.weather.cityName);
      //  console.log("Get the new current temp!!!  :",weatherInfo); 
    }

    let weather = null;

    if (this.state.error){
      weather =  <div className="cityError">{this.state.error}</div>
    } else if(this.props.weather.name){
      weather = <Weather weather={this.props.weather}/>
    } 

    // console.log("this.props.proposal:",this.props.proposal );


    return (
        <Container>
          <Row>
            <Col>
              <h1 className="title">Current Weather</h1>
              {formOfCity}
              <InputGroup style={{width: '275px'}}>
                  <Input 
                      placeholder="New city name..."
                      value={this.state.newCityName}
                      onChange={this.handleNewCityInputChange}
                  />
                  <InputGroupAddon addonType="append">
                        <Button color="info" onClick={this.handleAddCity}>Add City</Button>
                  </InputGroupAddon>
              </InputGroup>
              {weather} 
            </Col>
            <Col>
              <div>
                <h1 className="title" > Proposal for this weather </h1>
                <Proposal 
                  proposal={ this.props.proposal.proposal } 
                  weather={ this.props.weather }/>
              </div>

            </Col>
          </Row>
        </Container>
    );
  }
}
const mapStateToProps = state => {
  return { 
    weather: state.weather ,
    proposal: state.proposal
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onWeatherStore: (weatherInfo) => dispatch(actions.weatherStore(weatherInfo)),
    onProposalStore: (proposalInfo) => dispatch(actions.proposalStore(proposalInfo))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Start);
    