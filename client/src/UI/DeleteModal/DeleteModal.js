
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import  "./DeleteModal.css";
class DeleteModal extends React.Component {
    clicked = () => {};
    render() {
        console.log("this.props.itemSelected:",this.props.itemSelected);
        let itemImage = null;
        let itemId = null;
        if(this.props.itemSelected.length > 0){
           itemImage = this.props.itemSelected[0].image_location;
           itemId = this.props.itemSelected[0].id;
           console.log("itemImage:",itemImage , "itemId:",itemId ) 
          
        }
        // // const itemId = this.props.itemSelected[0].id 

        const closeBtn = <button className="close" onClick={this.modalToggle}>&times;</button>;
        return (
            <Modal 
            size="md" 
            centered
            isOpen={this.props.modal} 
            toggle={this.props.modalToggle} >
            {/* returnFocusAfterClose={false}> */}
            <ModalHeader > Delete Item </ModalHeader>
            <ModalBody>
                  <img 
                    className="DeleteItem" 
                    src={itemImage}
                    alt={itemId} />
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={this.props.deleteClicked}>Delete Item</Button>{' '}
                <Button color="secondary" onClick={this.props.modalToggle}>Cancel</Button>
            </ModalFooter>
         </Modal>
        );
     }
}

export default DeleteModal;