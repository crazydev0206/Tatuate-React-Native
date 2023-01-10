import { 
    GET_USER_SUCCESS, 
    LOGOUT_SUCCESS, 
    EDIT_PROFILE_CLOSE_POPUP, 
    EDIT_PROFILE_SUBMITTING, 
    EDIT_PROFILE_SUCCESS, 
    EDIT_PROFILE_FAILURE,
    // notifications
    REFRESH_NOTIFICATIONS,
    GET_NOTIFICATIONS_SUCCESS,
    GET_NOTIFICATIONS_FAILURE,
    LMORE_NOTIFICATIONS,
    LMORE_NOTIFICATIONS_SUCCESS,
    LMORE_NOTIFICATIONS_FAILURE,

    BOOKMARK_LISTING_SUCCESS,
    // bookings
    GET_USER_BOOKINGS,
    GET_USER_BOOKINGS_SUCCESS,
    GET_USER_BOOKINGS_FAILURE,
    LMORE_USER_BOOKINGS,
    LMORE_USER_BOOKINGS_SUCCESS,
    LMORE_USER_BOOKINGS_FAILURE,
} from '../actions/actionTypes';

const initialState = {
    ID: 0,
    isLoggedIn: false,
    first_name: '',
    last_name: '',
    display_name: '',
    registered_email: '',
    email: '',
    phone: '',
    avatar: '',
    // bookmarks
    bookmarks: [],
    bookings: [],
    bkspages: 0,
    // submit profile
    submitting: false,
    submitted: false,
    isSuccess: false,
    // loading notifications
    notifications: [],
    notipages: 0,
    notisloading: false,
    notislmore: false,

    // bookings
    loading: false,
    lmore: false,
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_SUCCESS: 
            return {  ...state, ...action.payload, isLoggedIn: true };
            break;
        case LOGOUT_SUCCESS: 
            return {...initialState}
            break;
        case EDIT_PROFILE_CLOSE_POPUP: 
            return { ...state, submitting: false, submitted: false, isSuccess: false };
            break;
        case EDIT_PROFILE_SUBMITTING: 
            return { ...state, submitting: action.payload };
            break;
        case EDIT_PROFILE_SUCCESS: 
            return { ...state, ...action.payload, submitting: false, submitted: true, isSuccess: true };
            break;
        case EDIT_PROFILE_FAILURE: 
            return { ...state, submitting: false, submitted: true, isSuccess: false };
            break;
        // notis
        case REFRESH_NOTIFICATIONS: 
            return { ...state, notisloading: true, notislmore: false };
            break;
        case GET_NOTIFICATIONS_SUCCESS: 
            // return { ...state, notisloading: false };
            return { ...state, notifications: action.notifications, notipages: action.notipages, notisloading: false, notislmore: false };
            break;
        case GET_NOTIFICATIONS_FAILURE: 
            return { ...state, notifications: [], notipages: 0, notisloading: false, notislmore: false };
            break;
        case LMORE_NOTIFICATIONS: 
            return { ...state, notislmore: true };
            break;
        case LMORE_NOTIFICATIONS_SUCCESS: 
            return { ...state, notifications: [...state.notifications, ...action.notifications], notipages: action.notipages, notislmore: false };
            break;
        case LMORE_NOTIFICATIONS_FAILURE: 
            return { ...state, notislmore: false };
            break;
        case BOOKMARK_LISTING_SUCCESS:
            if( null != action.success && action.success && null != action.listing && action.listing > 0 ){
                return { ...state, bookmarks: [...state.bookmarks,action.listing] };
            }
            return state;
            break;
        case GET_USER_BOOKINGS: 
            return { ...state, lmore: false, loading: true, bookings: [], bkspages: 0 };
            break;
        case GET_USER_BOOKINGS_SUCCESS: 
            return { ...state, lmore: false, loading: false, bookings: action.items, bkspages: action.pages };
            break;
        case GET_USER_BOOKINGS_FAILURE: 
            return { ...state, lmore: false, loading: false, bookings: [], bkspages: 0 };
            break;
        case LMORE_USER_BOOKINGS: 
            return { ...state, lmore: true, loading: false };
            break;
        case LMORE_USER_BOOKINGS_SUCCESS: 
            return { ...state, lmore: false, loading: false, bookings: [...state.bookings,...action.items], bkspages: action.pages };
            break;
        case LMORE_USER_BOOKINGS_FAILURE: 
            return { ...state, lmore: false, loading: false };
            break;
        default:
            return state;
    }
};

export default user;