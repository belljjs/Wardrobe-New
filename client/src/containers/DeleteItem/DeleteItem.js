import React, { Component } from 'react'
import axios from 'axios';
import '../../global.css' ;
import Items from '../../components/Items/Items';
import ItemFilter from '../../components/ItemFilter/ItemFilter';
import DeleteModal from "../../UI/DeleteModal/DeleteModal";


class DeleteItem extends Component {
    state = {
        itemsAll: [],
        itemsShown: [],
        itemSelected: [],
        itemsFilter: "all",
        modal: false
    }

    handleItemsFilterClicked = (filter)=> {

        let itemsAll = [...this.state.itemsAll];
        let itemsFiltered =     
            filter === "all" 
            ? itemsAll 
            : itemsAll.filter( item => item.category === filter);

        this.setState({
            itemsFilter: filter,
            itemsShown: itemsFiltered
        }) 
    }

    handleDeleteItem = async () =>{
        const itemId = this.state.itemSelected[0].id;

        try{
            const response = await axios({
                method: 'DELETE',
                url: '/api/item/delete',
                data: {itemId: itemId },
                headers: {autorization: localStorage.token}}
              );
            console.log("response:",response);
        }
        catch(error){
            console.log("Error:",error)
        }
        this.modalToggle();
        this.getItems(); 
    }

    handleItemClicked = (itemsShownIndex) => {
        
        let itemsShown = [...this.state.itemsShown];
        let itemSelected = []
        itemSelected.push(itemsShown[itemsShownIndex])
        this.setState({ itemSelected: itemSelected, itemsShown: itemsShown}); 
        this.modalToggle();

    }
    modalToggle=()=> {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    getItems = async () => {
        const response = await axios.get(
            '/api/item/itemsAll',
            {params: {userId: localStorage.userId  }}
        )
        let itemsAll = response.data
        this.setState({ itemsAll: itemsAll, itemsShown:itemsAll })
    };

    componentDidMount () {
        this.getItems();   // get all items of currnet_user in the begining
      }

    render() {
        return (
            <div>
                <h3 className="title">Delete Item</h3>
                <ItemFilter 
                    filterClicked={this.handleItemsFilterClicked}/>
                <Items 
                    itemsShown={this.state.itemsShown}
                    itemsClicked={this.handleItemClicked}    />
                <DeleteModal 
                    modal={this.state.modal} 
                    itemSelected={this.state.itemSelected}
                    modalToggle={this.modalToggle} 
                    deleteClicked={this.handleDeleteItem}>
                </DeleteModal>
                
            </div>
        );
    }
}


export default DeleteItem;