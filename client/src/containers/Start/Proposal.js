import React from'react';
import './Start.css';

const  proposal = (props) => {
    const { proposal, weather } = props;

    console.log( "proposal in Proposal : ",proposal);
    console.log( "weather in Proposal : ",weather);

    if (!weather) {
            return null
    } 

    let outfit =   <div className="emptyProposal"> No previous outfit for this weather</div>;
    
    if (proposal){
        outfit = proposal.proposal.map(item => {
            return<img 
                    key={item.image_location}
                    className="ItemInProposal" 
                    src={item.image_location}
                    alt="items"/>
        })
    }

    return (
        <div className="OutfitInProposal">
            {outfit}
        </div>
    )
}

export default proposal;