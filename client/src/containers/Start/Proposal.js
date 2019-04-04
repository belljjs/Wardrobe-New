import React from'react';
import './Start.css';

const  proposal = (props) => {
    const { proposal, weather } = props;
    if (!weather) {
            return null
    } 
    // proposal is object
    if (!proposal.data){
            return  <div className="emptyProposal"> No previous outfit for this weather</div>;
    }
    const outfit = proposal.data[0].items.map(item => {
        return<img 
            key={item.image_location}
            className="ItemInProposal" 
            src={item.image_location}
            alt="items"/>
    })

    return (
        <div className="OutfitInProposal">
            {outfit}
        </div>
    )
}

export default proposal;