import React from'react';
import './Start.css';

const  proposal = (props) => {
    const { proposal, weather } = props;
    
    if (!weather) {
            return null
    } 
    console.log("proposal:", proposal);
    // proposal is object
    if (!proposal){
            return  <div> No previous outfit for this Weather</div>;
    }


    // const images =[];
    // for(let item of props.proposal){
    //     images.push(item.image_location)
    // }
    // console.log("images:",images);;

    // const outfit = images.map(image => {
    //     return<img 
    //         key={image}
    //         className="ItemInProposal" 
    //         src={image}
    //         alt="items"/>
    // })

 

    const outfit = proposal.data[0].items.map(item => {
        return<img 
            key={item.image_location}
            className="ItemInProposal" 
            src={item.image_location}
            alt="items"/>
    })

    console.log("outfit:",outfit);;

    return (
        <div className="OutfitInProposal">
            {outfit}
        </div>
        
    )
   
}

export default proposal;