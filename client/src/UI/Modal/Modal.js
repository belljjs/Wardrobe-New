/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import magnifier from '../../asset/image/m1.png'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';



class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  // outfitSaveHandler() {
  //   // save outfit 
  //   // toggle state modal
  //   this.setState(prevState => ({
  //     modal: !prevState.modal
  //   }));

  // }

  render() {
      const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>;
      console.log("In Modal, this.props.children:",this.props.children);
      return (
      <div>

        <button onClick={this.toggle}>Confirm</button>
        <Modal size="lg" centered isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle} close={closeBtn}>Selected Items</ModalHeader>
          <ModalBody>
            {this.props.children}
          </ModalBody>
          <ModalFooter>
            <Button color="info" onClick={this.outfitSaveHandler}>Save as outfit</Button>{' '}
            <Button color="warning" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalExample;