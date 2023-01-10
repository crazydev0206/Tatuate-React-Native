import React from 'react';
import {
    useColorScheme,
} from 'react-native';
import { 
    // useNavigationState,
	getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import HomeStack from './HomeStack';

// import SearchScreen from '../screens/SearchScreen';
import FilterScreen from '../screens/FilterScreen';

import SignInScreen from '../screens/SignInScreen';
import ForgetPwdScreen from '../screens/ForgetPwdScreen';
import RegisterScreen from '../screens/RegisterScreen';

import getThemedColors from '../helpers/Theme';

export default function MainStack({ navigation, route }) {
    const colors = getThemedColors(useColorScheme())
    // const state = useNavigationState(state => state);
    React.useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? 'HomeStack';
        let tabBarVisible = routeName == 'HomeStack'
        const state = navigation.dangerouslyGetState()
        if( tabBarVisible && null != state ){
            const {routes,index} = state;
			const childRoute = routes[index]
            // console.log('childRoute')
            // console.log(childRoute)
            if( null != childRoute.state && null != childRoute.state.index ){
                const child2 = childRoute.state.routes[childRoute.state.index]
                // console.log(child2)
                if( null != child2.state.index && null != child2.state.routes ){
                    // if( 'Home' === child2.state.routes[child2.state.index]['name'] && null != child2.state.routes[child2.state.index]['params'] && null != child2.state.routes[childRoute.state.index]['params']['hideTabBar'] && true === child2.state.routes[child2.state.index]['params']['hideTabBar'] ){
                    if( 'Home' != child2.state.routes[child2.state.index]['name'] ){
                        tabBarVisible = false;
                    }
                }
            }
        }
        navigation.setOptions({ tabBarVisible });
    }, [navigation, route]);
    return (
        <Stack.Navigator
            initialRouteName="HomeStack"
            screenOptions={{ 
                gestureEnabled: false,

            }}
            mode='modal'
            headerMode='none'
        >
            <Stack.Screen
                name="HomeStack"
                component={HomeStack}
            />
            <Stack.Screen name="Filter">
                {props => <FilterScreen {...props} apColors={colors}/>}
            </Stack.Screen>
            {/*<Stack.Screen name="Search">
                {props => <SearchScreen {...props} apColors={colors}/>}
            </Stack.Screen>*/}
            <Stack.Screen name="SignIn">
                {props => <SignInScreen {...props} apColors={colors}/>}
            </Stack.Screen>
            <Stack.Screen name="ForgetPwd">
                {props => <ForgetPwdScreen {...props} apColors={colors}/>}
            </Stack.Screen>
            <Stack.Screen name="Register">
                {props => <RegisterScreen {...props} apColors={colors}/>}
            </Stack.Screen>
        </Stack.Navigator>
    );
}