import { 
    FILTER_BY_CAT,
    FILTER_BY_LOC,
    FILTER_BY_TAG,
    FILTER_BY_FEA,
    APPLY_FILTERS,
    FILTER_NEAR_BY,
    FILTER_RESET,
} from '../actions/actionTypes';

import {filterState} from './initialState';

const filter = (state = {...filterState}, action) => {
    switch (action.type) {
        case FILTER_BY_CAT: 
            return { ...state, cats: [action.payload], locs: [], tags: [], feas: [] }
            break;
        case FILTER_BY_LOC: 
            return { ...state, locs: [action.payload], cats: [], tags: [], feas: [] }
            break;
        case FILTER_BY_TAG: 
            return { ...state, tags: [action.payload], cats: [], locs: [], feas: [] }
            break;
        case FILTER_BY_FEA: 
            return { ...state, feas: [action.payload], cats: [], tags: [], locs: [] }
            break;
        case FILTER_NEAR_BY: 
            return { ...state, cats: [], locs: [], tags: [], feas: [], nearby: 'on', address_lat: action.lat, address_lng: action.lng, distance: 25 }
            break;
        case APPLY_FILTERS: 
            return { ...state, ...action.payload }
            break;
        case FILTER_RESET: 
            return { ...filterState }
            break;
        default:
            return state;
    }
};

export default filter;