import * as React from 'react';

export const navigationRef = React.createRef();

export function navigate(name, params) {
  	navigationRef.current?.navigate(name, params);
}

// add other navigation functions that you need and export them

export function setParams(params){
	navigationRef.current?.setParams( params )
}

export function setTopLevelNavigator(navigatorRef){
	
}

export default {
	navigate,
	setTopLevelNavigator,

	setParams,
};