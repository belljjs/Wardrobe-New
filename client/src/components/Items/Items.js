import React, { Component } from 'react';
import Item from '../Item/Item';
import './Items.css'
import '../../index.css';
import Slider from "react-slick";

class  Items extends Component {
    render() {
        const settings = {
            dots: true,
            rows: 1,
            initialSlide: 0,
            infinite: false,  // show each item only once
            speed: 500,
            slidesToShow: 6,
            slidesToScroll: 6,
        };
        const itemsShown = [...this.props.itemsShown]
        const items = itemsShown.map( ({id, category, color, season, occasion, image_location},index) => 
            <Item 
                key={id}
                id={id}
                category={category}
                image_location={image_location}
                clicked={this.props.itemsClicked.bind(this, index)}>
            </Item>
         )
        return(
            <div>
                <p className="subTitle">ITEMS </p> 
                <Slider {...settings}>
                {items}
                </Slider>
            </div>
        )
    }
}

export default Items;
