import React from 'react';
import { Row, Col, Table} from 'reactstrap';

const Weather = (props) => {
    const { data } = props;
    if (!data)
        return  <div></div>;
    return (
        <Row className="weather">
             <Col sm="12" md={{ size: 8, offset: 2 }}>
                <h4 className="city-name">{data.name}</h4>
                <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="Weather Icon"/>
                {data.weather[0].main} - {data.weather[0].description} &nbsp;
                {Math.floor(data.main.temp)}&deg;C
                <Table>
                    <tbody>
                        <tr>
                            <td>Min Temp</td>
                            <td>{Math.floor(data.main.temp_min)}&deg;C</td>
                        </tr>
                        <tr>
                            <td>Max Temp</td>
                            <td>{Math.floor(data.main.temp_max)}&deg;C</td>
                        </tr>
                        <tr>
                            <td>Wind</td>
                            <td>{Math.floor(data.wind.speed)} km/h</td>
                        </tr>

                        <tr>
                            <td>Humidity</td>
                            <td>{Math.floor(data.main.humidity)}%</td>
                        </tr>

                    </tbody>
                </Table>
            </Col>
        </Row>
     );
};

export default Weather;