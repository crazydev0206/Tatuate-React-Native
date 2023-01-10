import 'react-native-gesture-handler';

import React, { Component } from 'react';
import {
    Platform,
    StatusBar,
    StyleSheet,
    View,
    Text,
    Image,
    BackHandler ,
    Appearance,
    LogBox
} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
// Ignore log notification by message:
LogBox.ignoreLogs([
  'Calling `getNode()` on the ref of an Animated component is no longer necessary. You can now directly use the ref instead.',
  "exported from 'deprecated-react-native-prop-types'.",
//   'Sending...',
]);
// LogBox.ignoreLogs(['Sending...']);
// Ignore all log notifications:
// LogBox.ignoreAllLogs();

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import SiteDetails from './src/constants/SiteDetails';

axios.defaults.baseURL = `${SiteDetails.url}/wp-json/cththemes/v1/listings`;
axios.defaults.headers.common['Authorization'] = SiteDetails.app_key;
// axios.defaults.headers.common['Accept-Language'] = "*";
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
// axios.defaults.headers.common['Accept'] = "application/json";
// axios.defaults.headers.common['X-WP-Nonce'] = "adfba429c7";

// axios.defaults.headers.common['Content-type'] = "application/json";
// redux
import { Provider } from 'react-redux';
import store from './src/store';
// localization config
import getThemedColors from './src/helpers/Theme';

import {setI18nConfig} from './src/helpers/i18n';
import { getSiteDatas, getCurrencyAttrs } from './src/helpers/store';
import { getUserDatas, getLanguageAsync } from './src/helpers/user';


// navigations
import AppNavigator from './src/navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import TextRegular from './src/components/ui/TextRegular';
import TextHeavy from './src/components/ui/TextHeavy';
import {WifiSlash} from './src/components/icons/ButtonSvgIcons';
import BtnLarge from './src/components/ui/BtnLarge';
export default class App extends Component{
    constructor(props){
        super(props)
        // getLanguageAsync().then(lang => {
        //     if( null != lang.code && lang.rtl != null )
        //         setI18nConfig(lang.code, lang.rtl); // set initial config
        //     else
        //         setI18nConfig(); // set initial config
        // });
        this.netInfoUnSubscribe = null
        this.state = { isConnected: true, isLoading: true, theme: Appearance.getColorScheme() }
    }
    performTimeConsumingTask = async() => {
        return await Promise.all([
            getUserDatas(),
            getCurrencyAttrs(),
            getSiteDatas(),
        ]);
    }
    async componentDidMount() {

        // Subscribe
        this.netInfoUnSubscribe = NetInfo.addEventListener( state => {
            // console.log("Connection type", state.type);
            // console.log("Is connected?", state.isConnected);
            if( state.isConnected ){
                // getLanguageAsync().then(lang => {
                //     if( null != lang.code && lang.rtl != null )
                //         setI18nConfig(lang.code, lang.rtl); // set initial config
                //     else
                //         setI18nConfig(); // set initial config
                // });
                // // Preload data from an external API
                // // Preload data using AsyncStorage
                // const data = await this.performTimeConsumingTask();
                // if (data !== null) {
                //     this.setState({ isConnected: true, isLoading: false });
                // }
                this.onLoadDatas()
            }else{
                // alert("Oops!! No Internet Connection Available");
                // console.log("Oops!! No Internet Connection Available");
                this.setState({ isConnected: false });
            }
        });



        // // Preload data from an external API
        // // Preload data using AsyncStorage
        // const data = await this.performTimeConsumingTask();
        // if (data !== null) {
        //     this.setState({ isLoading: false });
        // }

        // RNLocalize.addEventListener("change", this.handleLocalizationChange);
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        Appearance.addChangeListener(this._handleAppearanceChange);
    }
    componentWillUnmount() {
        if( null != this.netInfoUnSubscribe ){
            // Unsubscribe
            this.netInfoUnSubscribe();
        }
        // RNLocalize.removeEventListener("change", this.handleLocalizationChange);
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
        Appearance.remove(this._handleAppearanceChange);
    }
    async onLoadDatas(){
        getLanguageAsync().then(lang => {
            if( null != lang.code && lang.rtl != null )
                setI18nConfig(lang.code, lang.rtl); // set initial config
            else
                setI18nConfig(); // set initial config
        });
        // Preload data from an external API
        // Preload data using AsyncStorage
        const data = await this.performTimeConsumingTask();
        if (data !== null) {
            this.setState({ isConnected: true, isLoading: false });
        }
    }
    _handleAppearanceChange = (preferences) => {

        if( null != preferences && null != preferences.colorScheme ){
            this.setState({theme: preferences.colorScheme});
        }
    }
    handleBackButton() {
        return false;
        if ( null != this.props.navigation && !this.props.navigation.isFocused()) {
            // The screen is not focused, so don't do anything
            return false;
        }
        if (this.isSelectionModeEnabled()) {
            this.disableSelectionMode();

            // We have handled the back button
            // Return `true` to prevent react-navigation from handling it
            return true;
        } else {
            return false;
        }
    }
    clearAsyncStorage = async () => {
        try {
            await AsyncStorage.clear()
        } catch(e) {
            // clear error
        }
    }
    render() {
        const colors = getThemedColors(this.state.theme)
        return (
            <Provider store={store}>
                <SafeAreaProvider>

                        <View style={[styles.container,{backgroundColor: colors.appBg,}]}>
                        { false == this.state.isConnected ?
                            <OfflineScreen apColors={colors} onRetry={()=>this.onLoadDatas()}/> :
                            (
                                this.state.isLoading ?
                                <SplashScreen /> :
                                <View style={{flex: 1}}>
                                    {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                                    <AppNavigator/>
                                </View>
                            )
                        }
                        </View>

                </SafeAreaProvider>
            </Provider>
        );
    }
}

class SplashScreen extends React.Component {
    render() {
        return (
            <View style={styles.viewStyles}>
                <Image
                    source={require('./assets/images/logo-120.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>
        );
    }
}
function OfflineScreen(props) {
    return (
        <View style={[styles.viewStyles,{paddingHorizontal: 40}]}>
            <WifiSlash color={props.apColors.appColor} style={{marginBottom:75}}/>
            <TextHeavy style={{color: props.apColors.tText, fontSize: 24,lineHeight:41,textAlign:'center',marginBottom:20}}>No Internet Connection</TextHeavy>
            <TextRegular style={{color: props.apColors.tText, fontSize:17,lineHeight:21,textAlign:'center'}}>You are not connected to the internet.</TextRegular>
            <TextRegular style={{color: props.apColors.tText, fontSize:17,lineHeight:21,textAlign:'center'}}>Make sure Wi-Fi is on, Airplane Mode is off and try again.</TextRegular>
            <BtnLarge bordered disabled={false} style={{alignSelf:'center', marginVertical: 10,marginTop:30}} onPress={props.onRetry}>Retry</BtnLarge>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewStyles: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        marginTop: -50
    },
});
