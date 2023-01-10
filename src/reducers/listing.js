import { 
    GET_LISTING, 
    GET_LISTING_SUCCESS, 
    GET_LISTING_ERROR,
    REVIEW_SUBMIT,
    REVIEW_SUBMIT_SUCCESS,
    REVIEW_SUBMIT_FAILURE,
    REVIEW_SUBMIT_CLOSE_POPUP,

    CLAIM_SUBMIT,
    CLAIM_SUBMIT_SUCCESS,

    BOOKMARK_LISTING_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
    ID: 0,
    thumbnail:'',
    title:'',
    excerpt:'',
    content:'',
    rating:'',
    ratingFields:'',
    comments:'',
    photos:'',
    cats:'',
    features:'',
    tags:'',
    facts:'',
    address:'',
    // for booking
    price:'',
    price_based:'',

    submitting: false,
    submitted: false,
    submitError: false,

    submittedMsg: '',
};

const listing = (state = initialState, action) => {
    switch (action.type) {
        // case GET_LISTING: 
        //     return {...state, loading: action.payload};
        case GET_LISTING_SUCCESS:
            return { ...state, ...action.payload, submitting: false, submitted: false, submitError: false };
            break;
        case GET_LISTING_ERROR:
            return { ...initialState, submitting: false, submitted: false, submitError: false };
            // return {...state, data: action.payload, loading: action.loading};
            break;
        case REVIEW_SUBMIT:
            return {...state, submitting: true, submitted: false, submitError: false, submittedMsg: '' };
            break;
        case REVIEW_SUBMIT_SUCCESS:
            return {...state, submitting: false, submitted: true, submitError: false };
            break;
        case REVIEW_SUBMIT_FAILURE:
            return {...state, submitting: false, submitted: true, submitError: true };
            break;
        case REVIEW_SUBMIT_CLOSE_POPUP:
            return {...state, submitting: false, submitted: false, submitError: false };
            break;
        case CLAIM_SUBMIT: 
            return {...state, submitting: true, submitted: false, submitError: false, submittedMsg: '' };
            break;
        case CLAIM_SUBMIT_SUCCESS: 
            if( null != action.success && action.success ){
                return {...state, submitting: false, submitted: true, submitError: false, submittedMsg: action.message };
            }else{
                return {...state, submitting: false, submitted: true, submitError: true, submittedMsg: action.message };
            }
            break;
        case BOOKMARK_LISTING_SUCCESS:
            if( null != action.success && action.success ){
                return {...state, submitting: false, submitted: true, submitError: false, submittedMsg: action.message };
            }else{
                return {...state, submitting: false, submitted: true, submitError: true, submittedMsg: action.message };
            }
            break;
        default:
            return state;
    }
};

export default listing;