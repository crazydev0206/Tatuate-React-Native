import { 
    Platform
} from 'react-native';
import { 
    EDIT_PROFILE_CLOSE_POPUP,
    EDIT_PROFILE_SUBMITTING,
    EDIT_PROFILE_SUCCESS,
    EDIT_PROFILE_FAILURE,
    // notifications
    GET_NOTIFICATIONS,
    GET_NOTIFICATIONS_SUCCESS,
    GET_NOTIFICATIONS_FAILURE,
    REFRESH_NOTIFICATIONS,
    LMORE_NOTIFICATIONS,
    LMORE_NOTIFICATIONS_SUCCESS,
    LMORE_NOTIFICATIONS_FAILURE,
    // bookings
    GET_USER_BOOKINGS,
    GET_USER_BOOKINGS_SUCCESS,
    GET_USER_BOOKINGS_FAILURE,

    LMORE_USER_BOOKINGS,
    LMORE_USER_BOOKINGS_SUCCESS,
    LMORE_USER_BOOKINGS_FAILURE,
} from './actionTypes';
// import fs from 'fs';
// const fs = require('fs')
import FormData from 'form-data';
import axios from 'axios';
// import qs from 'qs';
import {getAppLangCode} from '../helpers/store';

import SiteDetails from '../constants/SiteDetails';

//Define your action create that set your loading state.
export const profileClosePopup = () => {
    //return a action type and a loading state indicating it is getting data. 
    return {
        type: EDIT_PROFILE_CLOSE_POPUP,
    };
}
const profileSubmitting = (data) => {
    //return a action type and a loading state indicating it is getting data. 
    return {
        type: EDIT_PROFILE_SUBMITTING,
        payload: data,
    };
}
const submitProfileSuccess = (data) => {
    //Return a action type and a loading to false, and the data.
    return {
        type: EDIT_PROFILE_SUCCESS,
        payload: data,
        // submitting: false,
    };
}
const submitProfileFailure = (data) => {
    //Return a action type and a loading to false, and the data.
    return {
        type: EDIT_PROFILE_FAILURE,
        payload: data,
        // submitting: false,
    };
}
function extractFileName(path){
    const regex = /^.+\/(.+\/)*(.+)\.(.+)$/gm;
    let m,name,ext;

    while ((m = regex.exec(path)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        
        // The result can be accessed through the `m`-variable.
        m.forEach((match, groupIndex) => {
            // console.log(`Found match, group ${groupIndex}: ${match}`);
            if( groupIndex == 2 ){
                name = match
            } 
            if( groupIndex == 3 ){
                ext = match
            } 
        });
    }

    return {
        name,
        ext
    }
}
export function submitProfile(data){
    return dispatch => {
    	dispatch(profileSubmitting(true));
        // https://tech-blog.maddyzone.com/reactnative/how-to-upload-image-in-react-native-app
        // https://stackoverflow.com/questions/56409360/can-not-send-array-inside-formdata-with-axios
        //use formdata
        let formData = new FormData(), name = '', fileName = ''; 
        for (const property in data) {
            // formData.append(property, data[property]);
            if( property != 'customAvatar' ){
                formData.append(property, data[property]);
            }else if( null != data['customAvatar'] ){
                // // formData.append('customAvatar', fs.createReadStream(data['customAvatar']['uri']) );
                // formData.append('customAvatar', {
                //     ...data['customAvatar'],
                //     uri: Platform.OS === 'android' ? data['customAvatar']['uri'] : data['customAvatar']['uri'].replace('file://', ''),
                //     name: data['customAvatar']['fileName'],
                //     // uri: data['customAvatar']['data'],
                // } );
                // https://stackoverflow.com/questions/26667820/upload-a-base64-encoded-image-using-formdata
                const nameExt = extractFileName( data['customAvatar']['uri'] )
                
                
                let imageObj = {
                    // data: data['customAvatar']['data'], 
                    data: data['customAvatar']['base64'], 
                    fname: `${nameExt.name}.${nameExt.ext}`, 
                    fext: nameExt.ext 
                }

                // formData.append('customAvatar', qs.stringify(imageObj) );
                formData.append('customAvatar', JSON.stringify(imageObj) );

                // if( null == data['customAvatar']['fileName'] ){
                //     const nameExt = extractFileName( data['customAvatar']['uri'] )
                // }else{

                // }
                // fileName = data['customAvatar']['fileName']

                // const nameExt = extractFileName( data['customAvatar']['uri'] )

                // name = nameExt.name
                // fileName = `${nameExt.name}.${nameExt.ext}`

                // // Fix new 
                // // https://www.reactnativeschool.com/how-to-upload-images-from-react-native
                // formData.append('customAvatar', {
                //     name: data['customAvatar'].fileName,
                //     type: data['customAvatar'].type,
                //     uri: Platform.OS === 'ios' ? data['customAvatar'].uri.replace('file://', '') : data['customAvatar'].uri,
                // });

            }
            // console.log(`${property}: ${object[property]}`);
            //append created photo{} to formdata
            
        }
        if( null != data['customAvatar'] ){
            data.avatar = data['customAvatar']['uri']
        }
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Disposition
        axios.post(`/user/edit`, formData, {headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': SiteDetails.app_key,


            // 'Content-Disposition': `form-data; name="${name}"; filename="${fileName}"`
            // ...formData.getHeaders()
        }}).then(res => {
            // console.log(res);
            //Set the results to the people array.
            const {success} = res.data
            if( success ){
                dispatch(submitProfileSuccess(data));
            }else{
                dispatch(submitProfileFailure(res.data));
            }
            //Error handle the promise and set your errorMessage
        }).catch(err => console.log(err) );

        // fetch(`${SiteDetails.url}/wp-json/cththemes/v1/listings/user/edit`, {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'multipart/form-data',
        //         'Authorization': SiteDetails.app_key,
        //     },
        //     body: formData,
        // })
        // .then((response) => response.json())
        // .then((responseJson) => {

        //     console.log('responseJson',responseJson);
        //     // return responseJson;

        //     const {success} = responseJson
        //     if( success ){
        //         dispatch(submitProfileSuccess(data));
        //     }else{
        //         dispatch(submitProfileFailure(responseJson));
        //     }

        // })
        // .catch((error) => {
            
        //     console.log('error',error);

        // });
            

  //   	axios({
		// 	method:'POST',
		// 	url: `/user/edit`,
  //           // data: data,
		// 	data: formData,
  //           headers: {
  //               'Authorization': SiteDetails.app_key,
  //               'Accept': 'application/json',
  //               // 'Content-Type': 'multipart/form-data',
  //               // 'Content-Type': 'multipart/form-data;',
  //               'Content-Type': 'application/x-www-form-urlencoded',
                    
  //           }
		// }).then(res => {
  //           console.log(res);
  //           //Set the results to the people array.
  //           const {success} = res.data
  //           if( success ){
  //           	dispatch(submitProfileSuccess(data));
  //           }else{
  //           	dispatch(submitProfileFailure(res.data));
  //           }
  //           //Error handle the promise and set your errorMessage
  //       }).catch(err => console.log(err) );
    }
}


// notifications
const getNotificationsInit = (bool) => {
    //return a action type and a loading state indicating it is getting data. 
    return {
        type: GET_NOTIFICATIONS,
        payload: bool,
    };
}
const getNotificationsSuccess = (notifications,notipages) => {
    //Return a action type and a loading to false, and the data.
    return {
        type: GET_NOTIFICATIONS_SUCCESS,
        notifications: notifications,
        notipages: notipages,
    };
}
const getNotificationsFailure = (data) => {
    //Return a action type and a loading to false, and the data.
    return {
        type: GET_NOTIFICATIONS_FAILURE,
        payload: data,
    };
}
export function getNotifications(id){
    return dispatch => {
        dispatch(getNotificationsInit(true));
        // const lang = await getAppLangCode();
        getAppLangCode().then(lang => {

            axios({
                method:'GET',
                url: `/user/notifications/${id}`,
                params: {
                    paged: 1,
                    cthlang: lang,
                },
            }).then(res => {
                //Set the results to the people array.
                const {success} = res.data
                if( success ){
                    dispatch(getNotificationsSuccess(res.data.data, res.data.pages));
                }else{
                    dispatch(getNotificationsFailure(res.data.message));
                }
                
            }).catch(err => {
                dispatch(getNotificationsFailure(''));
            } );

        }); // end get lang
            

    }
}
const refreshNotificationsInit = (bool) => {
    //return a action type and a loading state indicating it is getting data. 
    return {
        type: REFRESH_NOTIFICATIONS,
        payload: bool,
    };
}
export function refreshNotifications(id){
    return dispatch => {
        dispatch(refreshNotificationsInit(true));
        // const lang = await getAppLangCode();
        getAppLangCode().then(lang => {
            
            axios({
                method:'GET',
                url: `/user/notifications/${id}`,
                params: {
                    paged: 1,
                    cthlang: lang,
                },
            }).then(res => {
                const {success} = res.data
                if( success ){
                    dispatch(getNotificationsSuccess(res.data.data, res.data.pages));
                }else{
                    dispatch(getNotificationsFailure(res.data.message));
                }
                
            }).catch(err => dispatch(getNotificationsFailure('')) );

        }); // end get lang
            

    }
}
const loadMoreNotificationsInit = (bool) => {
    //return a action type and a loading state indicating it is getting data. 
    return {
        type: LMORE_NOTIFICATIONS,
        payload: bool,
    };
}
const loadMoreNotificationsSuccess = (notifications,notipages) => {
    //Return a action type and a loading to false, and the data.
    return {
        type: LMORE_NOTIFICATIONS_SUCCESS,
        notifications: notifications,
        notipages: notipages,
    };
}
export function loadMoreNotifications(id,paged){
    return dispatch => {
        dispatch(loadMoreNotificationsInit(true));
        // const lang = await getAppLangCode();
        getAppLangCode().then(lang => {
            
            axios({
                method:'GET',
                url: `/user/notifications/${id}`,
                params: {
                    paged: paged,
                    cthlang: lang,
                },
            }).then(res => {
                const {success} = res.data
                if( success ){
                    dispatch(loadMoreNotificationsSuccess(res.data.data, res.data.pages));
                }else{
                    dispatch(getNotificationsFailure(''));
                }
                
            }).catch(err => dispatch(getNotificationsFailure('')) );

        }); // end get lang
            

    }
}

// bookings
// notifications
const getBookingsInit = (lmore) => {
    //return a action type and a loading state indicating it is getting data. 
    return {
        type: lmore ? LMORE_USER_BOOKINGS : GET_USER_BOOKINGS,
    };
}
const getBookingsSuccess = (items,pages,lmore) => {
    //Return a action type and a loading to false, and the data.
    return {
        type: lmore ? LMORE_USER_BOOKINGS_SUCCESS : GET_USER_BOOKINGS_SUCCESS,
        items,
        pages,
    };
}
const getBookingsFailure = (lmore, data) => {
    //Return a action type and a loading to false, and the data.
    return {
        type: lmore ? LMORE_USER_BOOKINGS_FAILURE : GET_USER_BOOKINGS_FAILURE,
        payload: data,
    };
}
export function getBookings(id, paged = 1, lmore = false){
    
    return dispatch => {
        dispatch(getBookingsInit(lmore));

        axios.get(`/user/bookings/${id}?paged=${paged}`).then(res => {
            const {items, pages} = res.data
            if( null != items && null != pages ){
                dispatch(getBookingsSuccess(items, pages,lmore));
            }else{
                dispatch(getBookingsFailure(lmore,'Response data error'));
            }
            
        }).catch(err => {
            dispatch(getBookingsFailure(lmore,'Internal error'));
            console.log(err);
        } );

    }
}

