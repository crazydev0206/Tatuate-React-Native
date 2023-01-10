
import store from '../store';
import axios from 'axios';


import {getCurrencyAsync, getLanguageAsync} from "./user";

import { 
    APP_LANGUAGE_CHANGE_SUCCESS,
    APP_CURRENCY_CHANGE_SUCCESS,
    GET_SITE_DATAS,
    GET_SITE_DATAS_SUCCESS,
    GET_SITE_DATAS_FAILURE,

    GET_CURRENCY_ATTRS,
    GET_CURRENCY_ATTRS_SUCCESS,
    FILTER_BY_CAT,
    FILTER_BY_LOC,
    FILTER_BY_TAG,
    FILTER_BY_FEA,
    FILTER_NEAR_BY,

    GET_LISTINGS_START,
    GET_LISTINGS_SUCCESS,
    GET_LISTINGS_FAILURE,

    LMORE_LISTINGS_START,
    LMORE_LISTINGS_SUCCESS,
    LMORE_LISTINGS_FAILURE,

    GET_STRINGS_SUCCESS,

    BOOKING_STATUS,
    FILTER_RESET,
} from '../actions/actionTypes';


export const changeAppLanguage = (code) => {
    store.dispatch({ type: APP_LANGUAGE_CHANGE_SUCCESS, payload: code })  
}
export const changeAppCurrency = (code) => {
    store.dispatch({ type: APP_CURRENCY_CHANGE_SUCCESS, payload: code })  
}
export const getSiteDatas = async () => {
    store.dispatch({type: GET_SITE_DATAS})
    const lang = await getAppLangCode();
    let res = await axios({
        method: 'GET',
        url: '/site',
        params: {
            cthlang: lang
        },
    }).catch(err => {console.log(err)});
    // get data ok
    if( null != res && null != res.data){
        store.dispatch({ type: GET_SITE_DATAS_SUCCESS, payload: res.data })
    }else{
        store.dispatch({ type: GET_SITE_DATAS_FAILURE })
    }
}

export const getCurrencyAttrs = async (curr = null) => {

    if( curr == null ) curr = await getCurrencyAsync();

    store.dispatch({ type: GET_CURRENCY_ATTRS })

    axios({
        method: 'GET',
        url: `/currency`,
        params: {
            currency: curr
        },
    }).then(res => {
        // console.log(res);
        store.dispatch({ type: GET_CURRENCY_ATTRS_SUCCESS, payload: res.data })
    }).catch(err => {
        console.log(err)
        // console.log(JSON.stringify(err))
    });

    
    // let res = await axios({
    //     method: 'GET',
    //     url: `/currency`,
    //     params: {
    //         currency: curr
    //     },
    // }).catch(err => {console.log(err)});
    
    // console.log(res);

    // store.dispatch({ type: GET_CURRENCY_ATTRS_SUCCESS, payload: res.data })
    
}
export const getStrings = async (lang_code = null) => {
    if( lang_code == null ){
        const lang = await getLanguageAsync();
        lang_code = lang.code;
    }
    // setLanguageParam(lang_code);
    let res = await axios({
        method: 'GET',
        url: `/site/strings`,
    }).catch(err => console.log(err));

    store.dispatch({ type: GET_STRINGS_SUCCESS, payload: res.data })
    //Error handle the promise and set your errorMessage
}
export const filterListings = async ( params, lmore = false ) => {
    store.dispatch({ type: lmore ? LMORE_LISTINGS_START : GET_LISTINGS_START })
    const lang = await getAppLangCode();
    if( typeof params == 'object' ) 
        params.cthlang = lang;
    axios({
        method:'GET',
        url: '',
        params: params,
    }).then(res => {
        //Set the results to the people array.
        const {items, pages} = res.data
        if( null != items && null != pages ){
            store.dispatch({ type: lmore ? LMORE_LISTINGS_SUCCESS : GET_LISTINGS_SUCCESS, items, pages })
        }else{
            store.dispatch({ type: lmore ? LMORE_LISTINGS_FAILURE : GET_LISTINGS_FAILURE })
        }
        
        //Error handle the promise and set your errorMessage
    }).catch(err => {
            store.dispatch({ type: lmore ? LMORE_LISTINGS_FAILURE : GET_LISTINGS_FAILURE })
        }
    );
}
export const filterByCat = (id) => {
    store.dispatch({ type: FILTER_BY_CAT, payload: id })
}
export const filterByLoc = (id) => {
    store.dispatch({ type: FILTER_BY_LOC, payload: id })
}
export const filterByTag = (id) => {
    store.dispatch({ type: FILTER_BY_TAG, payload: id })
}
export const filterByFea = (id) => {
    store.dispatch({ type: FILTER_BY_FEA, payload: id })
}
export const filterNearBy = (lat, lng ) => {
    store.dispatch({ type: FILTER_NEAR_BY, lat, lng })
}
export const filterReset = () => {
    store.dispatch({ type: FILTER_RESET })
}
// extract post navigation params
export const extractPostParams = (post) => {
    const {
        id,
        title,
        // author_id,
        // author_name
    } = post;
    
    return { id, title }
    // return { id, title, auid: author_id, auname: author_name }
}
export const isUserLoggedIn = () => {
    const {user} = store.getState();
    if( null != user && null != user.isLoggedIn && user.isLoggedIn ){
        return true;
    }
    return false;
}

export const checkBkPayment = (id)=>{
    axios({
        method:'GET',
        url: `/booking/status`,
        params: {
            id
        }
    }).then(res => {
        //Set the results to the people array.
        store.dispatch( {
            type: BOOKING_STATUS,
            status: res.data.status
        } );
        //Error handle the promise and set your errorMessage
    }).catch(err => {
        console.log(err);
        
    } );
}
export const getAppLangCode = async () => {
    const {code} = await getLanguageAsync();
    return code;
}