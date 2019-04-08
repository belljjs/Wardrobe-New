import React, {Component} from'react';
import { connect } from "react-redux";
import './Start.css';
import * as actions from "../../store/actions/index";

class  Proposal extends Component {
    render() {
        if (!this.props.weather.name) {
            return null
        } else if (!this.props.proposal.proposal) {
            return null
        } else {
            let outfit =   <div className="emptyProposal"> No previous outfit for this weather</div>;
            const items = this.props.proposal.proposal.proposal;
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
      