import React, { Component } from 'react';
import Item from '../Item/Item';
import './Items.css'
import '../../index.css';
import ItemsCarousel from 'react-items-carousel';
import range from 'lodash/range';

class  Items extends Component {
      // console.log(this.props);
    // console.log("**** In Items, this.props.itemsShown:",this.props.itemsShown)

    componentWillMount() {
        this.setState({
          children: this.props.itemsShown,
          activeItemIndex: 0,
        });  
    }
    changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });
 
    
    render() {
        const itemsShown = [...this.props.itemsShown]
        const {
            activeItemIndex,
            children,
        } = this.state;

        const items = itemsShown.map( ({id, category, color, season, occasion, image_location},index) => 
            <Item 
                key={id}
                id={id}
                category={category}
                // color={color}
                // season={season}
                // occasion={occasion}
                image_location={image_location}
                clicked={this.props.itemsClicked.bind(this, index)}>
                 {/* <img src={image_location} alt={id}  width="60px" height="60px"/> */}
            </Item>
         )
        return(
            <div>
                <p className="subTitle">ITEMS </p> 
                {/* <div className="Items"> */}
                <ItemsCarousel
                    className="carousel"
                    // Placeholder configurations
                    // enablePlaceholder
                    // numberOfPlaceholderItems={5}
                    // minimumPlaceholderTime={1000}
                    // placeholderItem={<div style={{ height: 200, background: '#900' }}>Placeholder</div>}
            
                    // Carousel configurations
                    numberOfCards={7}
                    gutter={0}
                    showSlither={true}
                    firstAndLastGutter={true}
                    freeScrolling={true}

                    // Active item configurations
                    // requestToChangeActive={this.changeActiveItem}
                    // activeItemIndex={activeItemIndex}
                    // activePosition={'center'}
                    // chevronWidth={24}
                    // rightChevron={'>'}
                    // leftChevron={'<'}
                    // outsideChevron={false}
                >
                    {items}
                </ItemsCarousel>    
            </div>
        )
    }
}


 


export default Items;
