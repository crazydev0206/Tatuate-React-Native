import React from 'react';
import {
    useColorScheme,
} from 'react-native';
// import { 
// 	getFocusedRouteNameFromRoute,
// } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

// import AuthStack from './AuthStack';
import HomeScreen from '../screens/HomeScreen';
import CatsScreen from '../screens/CatsScreen';
import LocsScreen from '../screens/LocsScreen';
import ArchiveScreen from '../screens/ArchiveScreen';
import MapScreen from '../screens/MapScreen';

import ListingScreen from '../screens/ListingScreen';
import CommentsScreen from '../screens/listing/Comments';
import ClaimScreen from '../screens/listing/Claim';
import ReportScreen from '../screens/listing/Report';


import ReplyNewScreen from '../screens/listing/Reply';

import AvailabilityScreen from '../screens/AvailabilityScreen';
import BookingScreen from '../screens/BookingScreen';
import CheckoutScreen from '../screens/CheckoutScreen';

import getThemedColors from '../helpers/Theme';

import {translate} from "../helpers/i18n";

import BackButton from '../components/inners/BackButton';

export default function HomeStack({ navigation, route }) {
    const apTheme = useColorScheme()
    const colors = getThemedColors(apTheme)
    // React.useLayoutEffect(() => {
    //     const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
    //     navigation.setOptions({ tabBarVisible: routeName == 'Home' });
    // }, [navigation, route]);
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={ ({navigation, route }) => {
                return { 
                    gestureEnabled: false,
                    headerLeft: () => {
                        return <BackButton color={colors.backBtn} onPress={navigation.goBack} style={{marginLeft: 10}}/>;
                    },
                    headerStyle: colors.headerNavStyle,
                    headerTitleStyle: colors.headerTitleStyle,
                    headerTitleAlign: 'center',
                }
            } }
        >
            <Stack.Screen name="Home" options={{ headerShown: false }}>
                {props => <HomeScreen {...props} apColors={colors} apTheme={apTheme} />}
            </Stack.Screen>
            <Stack.Screen name="Locations" options={ {title: translate('loc_screen')} }>
                {props => <LocsScreen {...props} apColors={colors}/>}
            </Stack.Screen>
            <Stack.Screen name="Categories" options={ {title: translate('cat_screen')} }>
                {props => <CatsScreen {...props} apColors={colors}/>}
            </Stack.Screen>
            <Stack.Screen name="Archive" options={ArchiveScreen.navigationOptions} initialParams={{ appColor: colors.appColor }}>
                {props => <ArchiveScreen {...props} apColors={colors}/>}
            </Stack.Screen>
            <Stack.Screen name="Map" options={{ headerShown: false }}>
                {props => <MapScreen {...props} apColors={colors}/>}
            </Stack.Screen>
            <Stack.Screen name="Listing" options={{ headerShown: false }}>
                {props => <ListingScreen {...props} apColors={colors}/>}
            </Stack.Screen>
            <Stack.Screen name="Comments" options={ {title: translate('reviews_screen')} }>
                {props => <CommentsScreen {...props} apColors={colors}/>}
            </Stack.Screen>
            <Stack.Screen name="Claim" options={ {title: translate('claim_screen')} }>
                {props => <ClaimScreen {...props} apColors={colors}/>}
            </Stack.Screen>
            <Stack.Screen name="Report" options={ {title: translate('report_screen')} }>
                {props => <ReportScreen {...props} apColors={colors}/>}
            </Stack.Screen>
            <Stack.Screen name="ReplyNew" options={ReplyNewScreen.navigationOptions}>
                {props => <ReplyNewScreen {...props} apColors={colors}/>}
            </Stack.Screen>
            <Stack.Screen name="Availability" options={ {title: translate('dates_screen')} }>
                {props => <AvailabilityScreen {...props} apColors={colors}/>}
            </Stack.Screen>
            <Stack.Screen name="Booking" options={ {title: translate('bk_screen')} }>
                {props => <BookingScreen {...props} apColors={colors}/>}
            </Stack.Screen>
            <Stack.Screen name="Checkout" options={ {title: translate('ck_screen')} }>
                {props => <CheckoutScreen {...props} apColors={colors}/>}
            </Stack.Screen>

            
            {/* <Stack.Screen name="Filter">
                {props => <FilterScreen {...props} apColors={colors}/>}
            </Stack.Screen>
            
            <Stack.Screen name="SignIn">
                {props => <SignInScreen {...props} apColors={colors}/>}
            </Stack.Screen>
            <Stack.Screen name="ForgetPwd">
                {props => <ForgetPwdScreen {...props} apColors={colors}/>}
            </Stack.Screen>
            <Stack.Screen name="Register">
                {props => <RegisterScreen {...props} apColors={colors}/>}
            </Stack.Screen> */}

        </Stack.Navigator>
    );
}

        
