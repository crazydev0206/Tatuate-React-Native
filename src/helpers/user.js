// import React, { useState } from 'react';
// import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {defaultLanguage, defaultCurrency} from '../constants/SiteDetails';
import store from '../store';
import axios from 'axios';

import { 
    GET_USER_SUCCESS, 
    LOGOUT_SUCCESS,

} from '../actions/actionTypes';

// https://stackoverflow.com/questions/33289726/combination-of-async-function-await-settimeout
function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const getUserDatas = async () => {
    let rtVal = false;
    try {
        const user = await AsyncStorage.getItem('user');
        if (user !== null) {
            try {
                const userObj = JSON.parse(user);
                
                const {id, authToken} = userObj;
                if( null != id && null != authToken && id > 0 ){
                    // await timeout(10000);
                    let res = await axios.get(`/user/${id}`).catch(err => {console.log(err)});
                    
                    // get user ok
                    if( null != res && null != res.data){
                        const {auth_token} = res.data
                        // false if user does not exists
                        if( res.data !== false && auth_token === authToken ){
                            store.dispatch({ type: GET_USER_SUCCESS, payload: {...res.data, logTime: new Date().getTime() } })

                            rtVal = true;
                        }
                    }

                    
                    // same as obove but return app error.
                    
                }
                
            } catch {
                // return false;
            }
        }
    } catch(e) {
        // read key error
        // return false;
    }

    return rtVal;
}
export const logOut = async () => {
    try {
        await AsyncStorage.removeItem('user');
        store.dispatch({ type: LOGOUT_SUCCESS })
    } catch(e) {
        // read key error
        // return false;
    }
}
export const getLoggedInID = () => {
    const {user} = store.getState();
    if( null != user && null != user.isLoggedIn && user.isLoggedIn && null != user.ID ){
        return user.ID;
    }
    return 0;
}
export const isUserLoggedIn = () => {
    const {user} = store.getState();
    if( null != user && null != user.isLoggedIn && user.isLoggedIn ){
        return true;
    }
    return false;
}

export const getCurrencyAsync = async () => {
    try {
        const currency = await AsyncStorage.getItem('currency');
        if( null != currency ){
            return currency;
        }
    } catch(e) {
        console.log(e);
    }
    return defaultCurrency;
}
export const setCurrencyAsync = async (currency) => {
    try {
        await AsyncStorage.setItem('currency', currency );
        return true;
    } catch(e) {
        return false;
    }
}

export const getLanguageAsync = async () => {
    try {
        let language = await AsyncStorage.getItem('language');
        if( language != null){
            try{
                return JSON.parse(language);
            }catch (e){
                console.log(e);
            }
        }
    } catch(e) {
        console.log(e);
    }
    return defaultLanguage;
}
export const setLanguageAsync = async (language) => {
    try {
        await AsyncStorage.setItem('language', JSON.stringify(language) );
        return true;
    } catch(e) {
        return false;
    }
}
