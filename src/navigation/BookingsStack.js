import React from 'react';
import {
    useColorScheme,
} from 'react-native';
import { 
	getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import BookingsScreen from '../screens/BookingsScreen';
import SBookingScreen from '../screens/bookings/Booking';

import SignInScreen from '../screens/SignInScreen';
import ForgetPwdScreen from '../screens/ForgetPwdScreen';
import RegisterScreen from '../screens/RegisterScreen';

import {translate} from "../helpers/i18n";

import getThemedColors from '../helpers/Theme';

import BackButton from '../components/inners/BackButton';

import { useDispatch, useSelector } from "react-redux";


function BookingsStack ({ navigation, route }){

    // const app = useSelector(state => state.app);
    const user = useSelector(state => state.user);
    const {isLoggedIn} = user
    const colors = getThemedColors(useColorScheme())
    React.useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? (isLoggedIn? 'Bookings': 'SignIn');
        navigation.setOptions({ tabBarVisible: routeName == 'Bookings' });
    }, [navigation, route]);
    return (
        <Stack.Navigator
            initialRouteName={isLoggedIn? 'Bookings': 'SignIn'}
            screenOptions={ ({navigation, route }) => {
                return { 
                    gestureEnabled: false,
                    // headerLeft: () => {
                    //     return <BackButton isBlack={true} onPress={navigation.goBack} style={{marginLeft: 10}}/>;
                    // },
                    headerStyle: colors.headerNavStyle,
                    headerTitleStyle: colors.headerTitleStyle,
                    headerTitleAlign: 'center',
                }
            } }
        >
            { isLoggedIn ? <>
                <Stack.Screen name="Bookings" options={ {title: translate('bks_screen')} }>
                    {props => <BookingsScreen {...props} apColors={colors}/>}
                </Stack.Screen>

                <Stack.Screen 
                    name="SBooking" 
                    options={({ navigation })=>{
                        return {
                            title: translate('sbk_screen'),
                            headerLeft: () => {
                                return <BackButton color={colors.backBtn} onPress={navigation.goBack} style={{marginLeft: 10}}/>;
                            },
                        }
                    }}
                >
                    {props => <SBookingScreen {...props} apColors={colors}/>}
                </Stack.Screen>

            </> : <>
                <Stack.Screen name="SignIn" options={{ headerShown: false }} initialParams={{ loggedInRoute: 'Bookings' }}>
                    {props => <SignInScreen {...props} apColors={colors}/>}
                </Stack.Screen>
                <Stack.Screen name="ForgetPwd" options={{ headerShown: false }}>
                    {props => <ForgetPwdScreen {...props} apColors={colors}/>}
                </Stack.Screen>
                <Stack.Screen name="Register" options={{ headerShown: false }}>
                    {props => <RegisterScreen {...props} apColors={colors}/>}
                </Stack.Screen>

            </> }
                
        </Stack.Navigator>
    );
}

export default BookingsStack;
