import React from'react';
import './Start.css';

const  proposal = (props) => {
    const { proposal, weather } = props;
    
    if (!weather) {
            return null
    } 
    console.log("In proposal, proposal:", proposal);

    // proposal is object
    
    if (!proposal.data){
            return  <div> No previous outfit for this Weather</div>;
    }

    const outfit = proposal.data[0].items.map(item => {
        return<img 
            key={item.image_location}
            className="ItemInProposal" 
            src={item.image_location}
            alt="items"/>
    })

    console.log("outfit proposal :",outfit);;

    return (
        <div className="OutfitInProposal">
            {outfit}
        </div>
        
    )
   
}

export default proposal;