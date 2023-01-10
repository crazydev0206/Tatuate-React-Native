import { 
    CKINOUT_SELECTED, 
    PROCESS_TO_CHECKOUT, 
    CKINOUT_SUBMITTING, 
    CHECKOUT_SUBMIT_SUCCESS,
    CHECKOUT_SUBMIT_FAILURE, 
    CHECKOUT_EXIT,

    BOOKING_CANCEL,
    BOOKING_CANCEL_SUCCESS,
    BOOKING_CANCEL_FAILURE,

    
} from './actionTypes';
import axios from 'axios';

//Define your action create that set your loading state.
export const checkInOutSelect = (ckinout) => {
    //return a action type and a loading state indicating it is getting data. 
    return {
        type: CKINOUT_SELECTED,
        payload: ckinout,
    };
}


export function processToCheckout(data){
    return {
        type: PROCESS_TO_CHECKOUT,
        payload: data,
    };
}

const checkoutSubmitting = (bool) => {
    //return a action type and a loading state indicating it is getting data. 
    return {
        type: CKINOUT_SUBMITTING,
        payload: bool,
    };
}

const submitCheckoutSuccess = (data) => {
    //Return a action type and a loading to false, and the data.
    return {
        type: CHECKOUT_SUBMIT_SUCCESS,
        payload: data,
        // submitting: false,
    };
}
const submitCheckoutFailure = (data) => {
    //Return a action type and a loading to false, and the data.
    return {
        type: CHECKOUT_SUBMIT_FAILURE,
        payload: data,
        // submitting: false,
    };
}
export function submitCheckout(data){
    return dispatch => {
    	dispatch(checkoutSubmitting(true));
    	axios({
			method:'POST',
			url: `/booking/checkout`,
			data: data,
			
		}).then(res => {
            //Set the results to the people array.
            
            const {success} = res.data
            if( success ){
            	dispatch(submitCheckoutSuccess(res.data));
            }else{
            	dispatch(submitCheckoutFailure(res.data));
            }


            //Error handle the promise and set your errorMessage
        }).catch(err => dispatch(submitCheckoutFailure('Internal error')) );
    }
}

export function checkoutExit(){
    return {
        type: CHECKOUT_EXIT
    };
}
const cancelBookingInit = () => {
    return {
        type: BOOKING_CANCEL,
    };
}
const cancelBookingSuccess = () => {
    return {
        type: BOOKING_CANCEL_SUCCESS,
    };
}
const cancelBookingFailure = (message) => {
    return {
        type: BOOKING_CANCEL_FAILURE,
        message,
    };
}
export function cancelBooking(data){
    return dispatch => {
        dispatch(cancelBookingInit());
        axios({
            method:'POST',
            url: `/booking/cancel`,
            data: data,
        }).then(res => {
            //Set the results to the people array.

            const {success} = res.data
            if( success ){
                dispatch(cancelBookingSuccess());
            }else{
                dispatch(cancelBookingFailure( null != res.data.error ? res.data.error : 'Unknow error' ));
            }
            //Error handle the promise and set your errorMessage
        }).catch(err => {
            console.log(err);
            dispatch(cancelBookingFailure('Internal error'))
        } );
    }
}


