import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    proposal: null,
    error: null
};

const proposalStore = (state, action) => {
    console.log("**** In proposalStore,  state:", state);
    console.log("**** In proposalStore,  action.proposal:", action.proposal);
    
    return updateObject( state, { 
        proposal: action.proposal
     } );
};


const proposalDelete = (state, action) => {
    return updateObject(state, 
        { 
            proposal: null,
        });
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.PROPOSAL_STORE: {
            const result = proposalStore(state, action);
            console.log("**** result of proposalStore:",result)
            return result;
        }
        case actionTypes.PROPOSAL_DELETE: {
            const result = proposalDelete(state, action);
            console.log("**** result of proposalDelete:",result)
            return result;
        }
        default:
            return state;
    }
};

export default reducer;
