import { GET_STRINGS_SUCCESS } from '../actions/actionTypes';


const strings = (state = {}, action) => {
    switch (action.type) {
        case GET_STRINGS_SUCCESS: 
        	
            return action.payload;
        default:
            return state;
    }
};

export default strings;