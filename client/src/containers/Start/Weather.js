import React from 'react';
import { Row, Col, Table} from 'reactstrap';

const Weather = (props) => {
    const { weather } = props;
    if (! weather.cityName)
        return  <div></div>;
    return (
        <Row className="weather">
             <Col sm="12" md={{ size: 8, offset: 2 }}>
                <h4 className="city-name">{ weather.cityName}</h4>
                <img src={`http://openweathermap.org/img/w/${ weather.icon}.png`} alt="Weather Icon"/>
                { weather.name} - { weather.description} &nbsp;
                {Math.floor( weather.temp)}&deg;C
                <Table>
                    <tbody>
                        <tr>
                            <td>Min Temp</td>
                            <td>{Math.floor( weather.lowTemp)}&deg;C</td>
                        </tr>
                        <tr>
                            <td>Max Temp</td>
                            <td>{Math.floor( weather.highTemp)}&deg;C</td>
                        </tr>
                        <tr>
                            <td>Wind</td>
                            <td>{Math.floor( weather.wind)} km/h</td>
                        </tr>

                        <tr>
                            <td>Humidity</td>
                            <td>{Math.floor( weather.humidity)}%</td>
                        </tr>

                    </tbody>
                </Table>
            </Col>
        </Row>
     );
};

export default Weather;