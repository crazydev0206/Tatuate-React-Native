import { 
    // chats
    GET_CONTACTS,
    GET_CONTACTS_SUCCESS,
    GET_CONTACTS_FAILURE,

    GET_REPLIES,
    GET_REPLIES_SUCCESS,
    GET_REPLIES_FAILURE,

    GET_TOP_REPLIES,
    GET_TOP_REPLIES_SUCCESS,

    POST_REPLY_SUCCESS,

    CLEAR_REPLIES,

} from './actionTypes';
import axios from 'axios';

import {getAppLangCode} from '../helpers/store';


const getContactsInit = () => {
    //return a action type and a loading state indicating it is getting data. 
    return {
        type: GET_CONTACTS,
    };
}
const getContactsSuccess = (data) => {
    //Return a action type and a loading to false, and the data.
    return {
        type: GET_CONTACTS_SUCCESS,
        payload: data,
    };
}
const getContactsFailure = (data) => {
    //Return a action type and a loading to false, and the data.
    return {
        type: GET_CONTACTS_FAILURE,
        payload: data,
    };
}

export function getContacts(id){
    return dispatch => {
        dispatch(getContactsInit());
        getAppLangCode().then(lang => {
            axios({
                method: 'GET',
                url: `/user/contacts/${id}`,
                params: {
                    cthlang: lang
                },
            }).then(res => {
                dispatch(getContactsSuccess(res.data));
                
            }).catch(err => {
                dispatch(getContactsFailure(''));
                console.log(err);
            } );

        }); // end get lang
            

    }
}
const getRepliesInit = (cid) => {
    //Return a action type and a loading to false, and the data.
    return {
        type: GET_REPLIES,
        payload: cid
    };
}
const getRepliesSuccess = (data, lastRID) => {
    //Return a action type and a loading to false, and the data.
    return {
        type: GET_REPLIES_SUCCESS,
        payload: data,
        lastRID
    };
}
export function getReplies( ctid, lastRID = null ){
    return dispatch => {
        if( lastRID == null && ctid != 'New' ) dispatch(getRepliesInit(ctid));
        let data = {
            cid: ctid
        };
        if( null != lastRID){
            data.lastRID = lastRID
        }
        getAppLangCode().then(lang => {
            data.cthlang = lang;
            axios({
                method: 'GET',
                url: `/user/replies`,
                params: data,
            }).then(res => {
                //Set the results to the people array.

                dispatch(getRepliesSuccess(res.data, lastRID));
                
            }).catch(err => {
                // dispatch(getContactsFailure(''));
                console.log(err);
            } );

        }); // end get lang

    }
}
const postReplySuccess = (data) => {
    //Return a action type and a loading to false, and the data.
    return {
        type: POST_REPLY_SUCCESS,
        payload: data,
    };
}

export function postReply( data ){
    return dispatch => {
        axios({
            method: 'POST',
            url: `/user/reply`,
            data: data,
        }).then(res => {
            //Set the results to the people array.
            const {success,reply} = res.data
            if( success ){
                dispatch( postReplySuccess(reply) );
            }
            //Error handle the promise and set your errorMessage
        }).catch(err => {
            console.log(err);
        } );

    }
}

const getTopRepliesSuccess = (data) => {
    //Return a action type and a loading to false, and the data.
    return {
        type: GET_TOP_REPLIES_SUCCESS,
        payload: data,
    };
}

const getTopRepliesInit = () => {
    //return a action type and a loading state indicating it is getting data. 
    return {
        type: GET_TOP_REPLIES,
    };
}

export function getMoreTopReplies(ctid, firstRID = null ) {
    return (dispatch) => {
        dispatch(getTopRepliesInit());
        let data = {
            cid: ctid
        };
        if( null != firstRID){
            data.firstRID = firstRID
        }
        axios({
            method: 'get',
            url: `/user/replies`,
            params: data
        }).then(res => {
            dispatch(getTopRepliesSuccess(res.data));
        }).catch(err => {
            console.log(err);
        } );

    }
}
export const clearReplies = () => ({
    type: CLEAR_REPLIES,
});

