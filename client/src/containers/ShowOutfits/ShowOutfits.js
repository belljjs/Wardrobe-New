import React, { Component } from 'react';
import axios from 'axios';
import '../../global.css' ;
import Outfits from '../../components/Outfits/Outfits';



class ShowOutfits extends Component {
    state = {
        outfitsAll: []
    }

    handleoutfitsAllClicked = () =>  {

    }
    
    getOutfits = async () => {
        const response = await axios.get(
            '/api/outfit/outfits',
            {params: {userId: localStorage.userId  }}
        )
        console.log(" In getOutfits, response.data:", response.data);

        let outfitsAll = response.data

        console.log(" outfitsAll:", outfitsAll);
        this.setState({ outfitsAll: outfitsAll  })
    };

    componentDidMount () {
        console.log("In componentDidMount...");
        this.getOutfits();   // get all outfits of currnet_user in the begining

      }

    render() {
        console.log("In ShowOutfits, this.state.outfitsAll:", this.state.outfitsAll);
        return(
            <div>
                <h3 className="title">Outfits</h3>
                <Outfits 
                    outfitsAll={this.state.outfitsAll}
                    outfitsClicked={this.handleoutfitsAllClicked}    />
            </div>
        )
    }
}


export default ShowOutfits;