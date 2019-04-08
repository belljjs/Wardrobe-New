import React, {Component} from'react';
import { connect } from "react-redux";
import './Start.css';
import * as actions from "../../store/actions/index";


class  Proposal extends Component {

    render() {

        if (!this.props.weather.name) {
            console.log("No weatehr")
            return null
        } else if (!this.props.proposal.proposal) {
            console.log("No proposal")
            return null
        } else {
            let outfit =   <div className="emptyProposal"> No previous outfit for this weather</div>;
            
            console.log("this.props.proposal:",this.props.proposal);

            const items = this.props.proposal.proposal.proposal;
            
            console.log("items:",items);
            
    
            if (items){
                outfit = items.map(item => {
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

        
    }
}

const mapStateToProps = state => {
    return { 
      weather: state.weather ,
      proposal: state.proposal
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      onWeatherStore: (weatherInfo) => dispatch(actions.weatherStore(weatherInfo)),
      onProposalStore: (proposalInfo) => dispatch(actions.proposalStore(proposalInfo))
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Proposal);
      