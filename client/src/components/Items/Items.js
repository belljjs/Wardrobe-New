import React, { Component } from 'react';
import Item from '../Item/Item';
import './Items.css'
import '../../index.css';
import ItemsCarousel from 'react-items-carousel';
// import range from 'lodash/range';

class  Items extends Component {
      // console.log(this.props);
    // console.log("**** In Items, this.props.itemsShown:",this.props.itemsShown)

    // componentWillMount() {
    //     this.setState({
    //       children: this.props.itemsShown,
    //       activeItemIndex: 0,
    //     });  
    // }
    // changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });
 
    
    render() {
        const itemsShown = [...this.props.itemsShown]
        // const {
        //     activeItemIndex,
        //     children,
        // } = this.state;

        console.log("this in Items:", this);

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
