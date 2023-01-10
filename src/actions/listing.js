import axios from 'axios';
import moment from 'moment';


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
} from './actionTypes';

//Define your action create that set your loading state.
export const getListing = (bool) => {
    //return a action type and a loading state indicating it is getting data. 
    return {
        type: GET_LISTING,
        payload: bool,
    };
}

//Define a action creator to set your loading state to false, and return the data when the promise is resolved
export const getListingSuccess = (data) => {
    //Return a action type and a loading to false, and the data.
    return {
        type: GET_LISTING_SUCCESS,
        payload: data,
        loading: false,
    };
}

//Define a action creator that catches a error and sets an errorMessage
export const getListingError = (error) => {
    //Return a action type and a payload with a error
    return {
        type: GET_LISTING_ERROR,
        payload: error,
        loading: false,
    };
}

export function getListingAction(id){
    return dispatch => {
        //Dispatch the getListing action creator before retrieving to set our loading state to true.
        dispatch(getListing(true));
        //Then get the data.
        const dayStart = moment().format('YYYY-MM-DD'); 
        axios.get(`/${id}/${dayStart}`).then(res => {
            //Set the results to the people array.
            dispatch(getListingSuccess(res.data));
            //Error handle the promise and set your errorMessage
        }).catch(err => dispatch(getListingError(err)));
    }
}
const reviewSubmitting = () => {
    //return a action type and a loading state indicating it is getting data. 
    return {
        type: REVIEW_SUBMIT,
    };
}
const submitReviewSuccess = (data) => {
    //Return a action type and a loading to false, and the data.
    return {
        type: REVIEW_SUBMIT_SUCCESS,
        payload: data,
    };
}
const submitReviewFailure = () => {
    //Return a action type and a loading to false, and the data.
    return {
        type: REVIEW_SUBMIT_FAILURE,
    };
}
export function submitReview(data){
    return dispatch => {
        dispatch(reviewSubmitting());
        axios({
            method:'POST',
            url: `/reviews/add`,
            data: data,
        }).then(res => {
            //Set the results to the people array.
            const { success, ID} = res.data
            if( success ){
                dispatch(submitReviewSuccess(ID));
            }else{
                dispatch(submitReviewFailure());
            }
            //Error handle the promise and set your errorMessage
        }).catch(err => dispatch(submitReviewFailure()) );
    }
}
export const reviewClosePopup = () => {
    //return a action type and a loading state indicating it is getting data. 
    return {
        type: REVIEW_SUBMIT_CLOSE_POPUP,
    };
}


const claimSubmitting = () => {
    //return a action type and a loading state indicating it is getting data. 
    return {
        type: CLAIM_SUBMIT,
    };
}
const submitClaimSuccess = (success, message) => {
    //Return a action type and a loading to false, and the data.
    return {
        type: CLAIM_SUBMIT_SUCCESS,
        success,
        message
    };
}
export function submitClaim(data){
    return dispatch => {
        dispatch(claimSubmitting());
        axios({
            method:'POST',
            url: `/claim/add`,
            data: data,
        }).then(res => {
            const message = null != res.data.data && null != res.data.data.message ? res.data.data.message : '';
            if( res.data.success ){
                dispatch(submitClaimSuccess(true, message));
            }else{
                dispatch(submitClaimSuccess(false, message));
            }
            //Error handle the promise and set your errorMessage
        }).catch( err => { 
            console.log(err);
            dispatch(submitClaimSuccess(false, 'Internal error')) 
        } );
    }
}
export function submitReport(data){
    return dispatch => {
        dispatch(claimSubmitting());
        axios({
            method:'POST',
            url: `/report/add`,
            data: data,
        }).then(res => {
            const message = null != res.data.data && null != res.data.data.message ? res.data.data.message : '';
            if( res.data.success ){
                dispatch(submitClaimSuccess(true, message));
            }else{
                dispatch(submitClaimSuccess(false, message));
            }
            //Error handle the promise and set your errorMessage
        }).catch( err => { 
            console.log(err);
            dispatch(submitClaimSuccess(false, 'Internal error')) 
        } );
    }
}
const bookmarkListingSuccess = (success, message, listing = 0) => {
    //Return a action type and a loading to false, and the data.
    return {
        type: BOOKMARK_LISTING_SUCCESS,
        success,
        message,
        listing
    };
}
export function bookmarkListing(user_id, listing){
    return dispatch => {
        axios({
            method:'POST',
            url: `/user/bookmark`,
            data: {
                user_id,
                listing
            },
        }).then(res => {
            const message = null != res.data.message ? res.data.message : '';
            if( res.data.success ){
                dispatch(bookmarkListingSuccess(true, message, listing));
            }else{
                dispatch(bookmarkListingSuccess(false, message));
            }
            //Error handle the promise and set your errorMessage
        }).catch( err => { 
            console.log(err);
            dispatch(bookmarkListingSuccess(false, 'Internal error')) 
        } );
    }
}
