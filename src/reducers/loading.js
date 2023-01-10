import { 
    GET_SITE_DATAS,
    GET_SITE_DATAS_SUCCESS,
    GET_SITE_DATAS_FAILURE,

    GET_LISTING, 
    GET_LISTING_SUCCESS, 
    GET_LISTING_ERROR,
    // notifications
    GET_NOTIFICATIONS,
    GET_NOTIFICATIONS_SUCCESS,
    GET_NOTIFICATIONS_FAILURE,
} from '../actions/actionTypes';

const loading = (state = false, action) => {
    switch (action.type) {
        case GET_SITE_DATAS: 
            return true;
            break;
        case GET_LISTING: 
        case GET_NOTIFICATIONS: 
            return action.payload;
            break;
        case GET_LISTING_SUCCESS:
            return action.loading;
            break;
        case GET_LISTING_ERROR:
            return action.loading;
            break;
        case GET_NOTIFICATIONS_SUCCESS:
        case GET_NOTIFICATIONS_FAILURE:
        case GET_SITE_DATAS_SUCCESS:
        case GET_SITE_DATAS_FAILURE:
            return false;
            break;
        default:
            return state;
    }
};

export default loading;