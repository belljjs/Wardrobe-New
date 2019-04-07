
import * as actionTypes from './actionTypes';


export const proposalStore= ( proposalInfo ) => {
    return {
        type: actionTypes.PROPOSAL_STORE,
        proposal: proposalInfo
     };
}

export const proposalDelete = () => {

    return {
        type: actionTypes.PROPOSAL_DELETE
    };
};
