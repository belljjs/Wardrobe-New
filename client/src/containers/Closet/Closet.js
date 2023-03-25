import React, { Component } from 'react';
import axios from 'axios';
import Items from '../../components/Items/Items';
import '../../global.css' ;
import ItemFilter from '../../components/ItemFilter/ItemFilter';
import SelectedItems from '../../components/SelectedItems/SelectedItems';
import ClosetModal from "../../UI/ClosetModal/ClosetModal";
import { connect } from "react-redux";
import './Closet.css';
// need to replace materialUI with react-slick 

class Closet extends Component {
    state = {
        itemsAll: [],
        itemsShown: [],
        itemsSelected: [],
        itemsFilter: "all",
        modal: false,
    }
   
    freshItemsShown = (filter) => {
        let itemsFiltered =[];
        let itemsAll = [...this.state.itemsAll];
        // return new array (itemsShown) fitered by filter argument
        itemsFiltered = filter === "all" ? itemsAll : itemsAll.filter( item => item.category === filter);
        return itemsFiltered
    }

    adjustItemsShown = (itemsShown, itemsSelected) => {
        if (itemsSelected.length > 0) {
            let shownIndex = -1;
            itemsSelected.forEach(item => {
                shownIndex = itemsShown.findIndex(i => {
                    return i.id === item.id}
                )
                if (shownIndex > -1) {
                    itemsShown.splice(shownIndex,1)
                }
            })
        }   
        return itemsShown;
    }

    handleItemsFilterClicked = (filter)=> {
        const itemsFiltered = this.freshItemsShown(filter)
        const itemsShown = this.adjustItemsShown(
                 itemsFiltered,this.state.itemsSelected)
        this.setState({
            itemsFilter: filter,
            itemsShown: itemsShown
        }) 
    }

    handleItemsSelectedClicked = (itemsSelectedIndex) =>{
        // remove the item from itemsSelected
        let itemsSelected = [...this.state.itemsSelected];  
        itemsSelected.splice(itemsSelectedIndex,1)
        const itemsShown = this.adjustItemsShown(
                this.freshItemsShown(this.state.itemsFilter),itemsSelected )
        this.setState ({ 
            itemsSelected: itemsSelected,
            itemsShown: itemsShown
        }) 
    }

    handleItemsShownClicked = (itemsShownIndex) =>{

        let itemsShown = [...this.state.itemsShown];
        let itemsSelected = [...this.state.itemsSelected];
        itemsSelected.push(itemsShown[itemsShownIndex])
        itemsShown.splice(itemsShownIndex,1)
        this.setState({ itemsSelected: itemsSelected, itemsShown: itemsShown}  ) 
    }

    getItems = async () => {
        const response = await axios.get(
            '/api/item/itemsAll',
            {params: {userId: localStorage.userId  }}
        )
        let itemsAll = response.data
        this.setState({ itemsAll: itemsAll, itemsShown:itemsAll })
    };

    componentWillMount () {
        this.getItems();   // get all items of currnet_user in the begining
      }

    modalToggle=()=> {
        console.log("Modal  Toggled!")
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    outfitSaveHandler = async () => {
        const itemIds=[];
        this.state.itemsSelected.map(item => 
            itemIds.push(item.id)
        )
        const result= await axios.post(
            'api/outfit/newOutfit/', 
            //req.body
            {
                weather : this.props.weather, 
                userId: localStorage.userId,
                itemIds: itemIds
            },
            // for authorization
            {headers: {autorization: localStorage.token}}
        )
        if(result){
            if (result.data.error ) {
                console.log("outfit insert error:",result.data.error);
            }else {  
                console.log("result of post new outfit:",result);
                console.log( 'Outfit saved!' );
                this.modalToggle();
            }
        }
    }

    render() {
        let weatherInfo = <div className="noWeatherInfo">Please start with weather to save outfit</div>;
        if (this.props.weather.name) {
            weatherInfo = 
                <div  className="ClosetWeatherInfo">
                    <div className="city">{this.props.weather.cityName}</div>
                    <img 
                        className="WeatherImage" 
                        src={`http://openweathermap.org/img/w/${this.props.weather.icon}.png`} 
                        alt="Weather Icon"/>
                    <div className="temp"> 
                        <div style={{marginRight:"10px"}}>{this.props.weather.name}</div>
                        <div>{this.props.weather.highTemp}℉ / {this.props.weather.lowTemp}℉</div>
                    </div>
                </div>
        }
        
        return (
            <div>
                <div>
                    <div>{weatherInfo}</div>
                    <h3 className="ClosetTitle">Closet</h3>
                </div>
                <ItemFilter 
                    filterClicked={this.handleItemsFilterClicked}/>
                <Items 
                    itemsShown={this.state.itemsShown}
                    itemsClicked={this.handleItemsShownClicked}    />
                <SelectedItems 
                    isModal="false"
                    magnifierClicked={this.modalToggle}
                    itemsSelected={this.state.itemsSelected}
                    itemsSelectedClicked={this.handleItemsSelectedClicked} />
                <ClosetModal 
                    modal={this.state.modal} 
                    modalToggle={this.modalToggle} 
                    itemsSelected={this.state.itemsSelected}
                    // itemsSelectedClicked= {null}
                    itemsSelectedClicked={this.handleItemsSelectedClicked}
                    outfitSaveClicked={this.outfitSaveHandler}>
                </ClosetModal>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {weather: state.weather }
}

export default connect(mapStateToProps)(Closet);