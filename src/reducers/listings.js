import { 
    GET_LISTINGS_START,
    GET_LISTINGS_SUCCESS,
    GET_LISTINGS_FAILURE,

    LMORE_LISTINGS_START,
    LMORE_LISTINGS_SUCCESS,
    LMORE_LISTINGS_FAILURE,
} from '../actions/actionTypes';

const initialState = {
    items: [],
    pages: 0,
    loading: false,
    lmore: false,
};

const listings = (state = initialState, action) => {
    switch (action.type) {
        case GET_LISTINGS_START: 
            return { ...state, loading: true, lmore: false }
            // return { ...state, items: [], pages: 0, loading: true }
            break;
        case GET_LISTINGS_SUCCESS: 
            return { ...state, items: action.items, pages: action.pages, loading: false, lmore: false }
            break;
        
        case GET_LISTINGS_FAILURE: 
            return { ...state, items: [], pages: 0, loading: false, lmore: false }
            break;

        case LMORE_LISTINGS_START: 
            return { ...state, lmore: true }
            break;

        case LMORE_LISTINGS_SUCCESS: 
            return { ...state, items: [...state.items,...action.items], pages: action.pages, loading: false, lmore: false }
            break;
        
        case LMORE_LISTINGS_FAILURE: 
            return { ...state, loading: false, lmore: false }
            break;
        
        default:
            return state;
    }
};

export default listings;