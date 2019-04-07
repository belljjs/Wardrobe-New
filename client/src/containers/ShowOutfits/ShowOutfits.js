import React, { Component } from 'react';
import axios from 'axios';
import '../../global.css' ;
import Outfits from '../../components/Outfits/Outfits';

class ShowOutfits extends Component {
    state = {
        outfitsAll: []
    }

    outfitDeletHandler = async (outfitListIndex) =>  {
        const outfitId = this.state.outfitsAll[outfitListIndex].id
        const outfitList = [...this.state.outfitsAll];
        await axios({
            method: 'DELETE',
            url: '/api/outfit/delete',
            data: {outfitId: outfitId }
          })
        outfitList.splice(outfitListIndex,1);
        this.setState({ outfitsAll: outfitList  })
    }
    
    getOutfits = async () => {
        const response = await axios.get(
            '/api/outfit/outfits',
            {params: {userId: localStorage.userId  }}
        )
        let outfitsAll = response.data
        this.setState({ outfitsAll: outfitsAll  })
    };

    componentDidMount () {
        this.getOutfits();   // get all outfits of currnet_user in the begining
      }

    render() {
        return(
            <div>
                <h3 className="title">Outfits</h3>
                <Outfits 
                    outfitsAll={this.state.outfitsAll}
                    outfitDeleteClicked={this.outfitDeletHandler}    />
            </div>
        )
    }
}

export default ShowOutfits;