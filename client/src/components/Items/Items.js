import React, { Component } from 'react';
import Item from '../Item/Item';
import './Items.css'
import '../../index.css';
import ItemsCarousel from 'react-items-carousel';
// import range from 'lodash/range';

class  Items extends Component {

    render() {
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
                <ItemsCarousel
                    className="carousel"
                    numberOfCards={6}
                    gutter={0}
                    showSlither={true}
                    firstAndLastGutter={true}
                    freeScrolling={true} >
                    {items}
                </ItemsCarousel>    
            </div>
        )
    }
}

export default Items;
