import { 
    GET_SITE_DATAS_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
    explore: [],
    cats: [],
    locs: [],
    feas: [],
    tags: [],

    layout: {},
    languages: [],
    currencies: [],
    base_currency: {},

    terms_page: '',
    policy_page: '',
    help_page: '',
    about_page: '',

    
};

const site = (state = initialState, action) => {
    switch (action.type) {
        case GET_SITE_DATAS_SUCCESS: 
            return action.payload
            break;
        default:
            return state;
    }
};

export default site;