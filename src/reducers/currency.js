import { GET_CURRENCY_ATTRS, GET_CURRENCY_ATTRS_SUCCESS } from '../actions/actionTypes';

const initialState = {

    submitting: false,
    submitted: false,
};

const currency = (state = initialState, action) => {
    switch (action.type) {
    	case GET_CURRENCY_ATTRS: 
    		return {...state, submitting: true, submitted: false};
    		break;
        case GET_CURRENCY_ATTRS_SUCCESS: 
            return {...state, ...action.payload, submitting: false, submitted: true};
            break;
        default:
            return state;
    }
};

export default currency;