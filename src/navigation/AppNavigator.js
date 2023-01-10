import React, {useState} from 'react';
import {
	useColorScheme,
} from 'react-native';
import { 
	NavigationContainer,
	getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { navigationRef } from '../helpers/NavigationService';
const Tab = createBottomTabNavigator();

import MainStack from './MainStack';

import BookingsStack from './BookingsStack';
import BookmarksStack from './BookmarksStack';
import ProfileStack from './ProfileStack';

import {translate} from "../helpers/i18n";
import TextRegular from '../components/ui/TextRegular';

import getThemedColors from '../helpers/Theme';

import {ExploreSvg,BookingsSvg,BookmarksSvg,ProfileSvg} from '../components/icons/TabbarSvgIcons';

import { useDispatch, useSelector } from "react-redux";


function AppNavigator (){
	// const [navState, setNavState] = useState({})
	const [showTabs, setShowTabs] = useState(true)
  	// const app = useSelector(state => state.app);
  	const user = useSelector(state => state.user);
  	const {isLoggedIn} = user
	const colors = getThemedColors(useColorScheme())
	  
	const onStateChange = async (navState) => {
	};
  	return (
	    <NavigationContainer ref={navigationRef} onStateChange={onStateChange}>
    		<Tab.Navigator
    			// screenOptions={ ({ route }) => {
    			// 	let tabBarVisible = true;
    			// 	return {
    			// 		tabBarVisible
    			// 	}
    			// } }
				tabBarOptions={colors.tabBarColors}
    		>
		        <Tab.Screen name="MainStack" component={MainStack} 
					options={({ route })=>{
						return {
							tabBarIcon: ({ color }) => {
								return <ExploreSvg color={color}/>;
							},
							tabBarLabel: ({ color }) => {
								return <TextRegular style={{fontSize: 13,color:color}}>{translate('explore')}</TextRegular>
							},
						}
					}}
		        />
		        <Tab.Screen name="BookingsStack" component={BookingsStack} 
					options={({ route })=>{
						return {
							tabBarIcon: ({ color }) => {
								return <BookingsSvg color={color}/>;
							},
							tabBarLabel: ({ color }) => {
								return <TextRegular style={{fontSize: 13,color:color}}>{translate('mybookings')}</TextRegular>
							},
						}
					}}
		        />
		        <Tab.Screen name="BookmarksStack" component={BookmarksStack} 
					options={({ navigation, route })=>{
						// const routeName = getFocusedRouteNameFromRoute(route) ?? 'BookmarksStack';
						// console.log(routeName)
        				// let tabBarVisible = routeName == 'BookmarksStack'
						// if( tabBarVisible ){
						// 	const state = navigation.dangerouslyGetState()
						// 	// console.log(state)
						// 	const {routes,index} = state;
						// 	const childRoute = routes[index]
						// 	console.log(index)
						// 	console.log(childRoute)
						// 	if( null != childRoute.state && null != childRoute.state.index ){
						// 		const child2 = childRoute.state.routes[childRoute.state.index]
						// 		console.log(child2)
						// 		if( null != child2.state.index && null != child2.state.routes ){
						// 			// if( 'Home' === child2.state.routes[child2.state.index]['name'] && null != child2.state.routes[child2.state.index]['params'] && null != child2.state.routes[childRoute.state.index]['params']['hideTabBar'] && true === child2.state.routes[child2.state.index]['params']['hideTabBar'] ){
						// 			if( 'Bookmarks' != child2.state.routes[child2.state.index]['name'] ){
						// 				tabBarVisible = false;
						// 			}
						// 		}
						// 	}
						// }
						
						return {
							tabBarIcon: ({ color }) => {
								return <BookmarksSvg color={color}/>;
							},
							tabBarLabel: ({ color }) => {
								return <TextRegular style={{fontSize: 13,color:color}}>{translate('bookmarksTab')}</TextRegular>
							},
							// tabBarVisible
						}
					}}
		        />
		        <Tab.Screen name="ProfileStack" component={ProfileStack} 
					options={({ route })=>{
						return {
							tabBarIcon: ({ color }) => {
								return <ProfileSvg color={color}/>;
							},
							tabBarLabel: ({ color }) => {
								return <TextRegular style={{fontSize: 13,color:color}}>{translate('profileMenu')}</TextRegular>
							},
						}
					}}
		        />
      		</Tab.Navigator>
    	</NavigationContainer>
  	);
};

export default AppNavigator;
