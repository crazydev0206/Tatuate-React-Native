import React from 'react'
import { 
    View, 
    TextInput, 
    StyleSheet, 
    TouchableOpacity, 
    Dimensions,
    // AsyncStorage 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';

import axios from 'axios';

import {getAppLangCode} from '../helpers/store';

import {mediumFontFamily} from '../constants/Colors';
import {translate} from "../helpers/i18n";
import {getUserDatas} from '../helpers/user';


import BackButton from '../components/inners/BackButton';
import TextRegular from '../components/ui/TextRegular';
import TextMedium from '../components/ui/TextMedium';
import TextHeavy from '../components/ui/TextHeavy';

import Loader from '../components/Loader';
import ErrorSuccessPopup from '../components/ErrorSuccessPopup';

// const wHeight = Dimensions.get('window').height;

export default class SignInScreen extends React.Component {
    static navigationOptions = {
        headerShown: false,
        headerTransparent: true,
        title: 'Please sign in',
    };

    constructor(props){
        super(props);
        this.state = {
            log: '',
            password: '',
            validating: false,
            focus: '',

            isSuccess: false, 
            title: translate('login_wrong'),
            message: '',
            isError: false,
        }
        this._ismounted = true;
    }
    componentWillUnmount() {
        this._ismounted = false;
    }
    // static navigationOptions = ({ navigation }) => {
    //     return {

    //         title: translate('chat_screen'),
    //         headerLeft: () => {
    //             return <BackButton isBlack={true} onPress={navigation.goBack} style={{marginLeft: 10}}/>
    //         },
    //     };
    // };
    toForgetPwd = ()=>{
        this.props.navigation.navigate('ForgetPwd');
    }
    toRegister = () => {
       this.props.navigation.navigate('Register');
    }
    onInputChange = (name)=>(text)=>{
        this.setState({[name]:text})
    }
    onFucusInput = (name) =>{
        this.setState({focus: name})
    }
    _signInAsync = async () => {
        const _self = this
        const {log,password} = _self.state
        if(log.length < 3 || password.length < 3){
            _self.setState({ isError: true, message:translate('login_enter_email'), title:translate('login_wrong') })
            return;
        }

        _self.setState({ validating: true });

        const lang = await getAppLangCode();

        axios({
            method: 'POST',
            url: `/login`, 
            data: {
                log,
                password,
                cthlang: lang,
            },
        }).then(res => {
            //Set the results to the people array.
            // console.log(res.data);
            const {success} = res.data
            const title = null != res.data.title ? res.data.title : '';
            const message = null != res.data.message ? res.data.message : '';
            if( success ){
                _self.saveToStorage(res.data.data).then(rt=>{
                    if( _self._ismounted ){
                        if( rt == true ){
                            _self.setState({ isSuccess: true, validating: false, message, title })
                        }else{
                            _self.setState({ isSuccess: true, validating: false, message:'Failed to store auth', title:translate('login_wrong') })
                        }
                    }
                });
            }else{
                _self.setState({ isError: true, validating: false, message, title })
            }
            //Error handle the promise and set your errorMessage
        }).catch(err => {
            _self.setState({ validating: false, isError: true });
            console.log(err)
        } );

    }

    saveToStorage = async (userData) => {
        
        let rt = false;
        //if (userData) {
            try {
                await AsyncStorage.setItem('user', JSON.stringify({
                    isLoggedIn: true,
                    authToken: userData.auth_token,
                    id: userData.user_id,
                    name: userData.user_login
                }));
                // await getUserDatas() // .then(rt=>console.log(rt))
                getUserDatas() // .then(rt=>console.log(rt))
                
                rt = true
            } catch (error) {
                // Error saving data
                rt = false;
                // if( null != error.message )
            }
            // return true;
        //}
        
        return rt;
    }

    nextField = ()=>{
        this.password.focus()
    }
    errorButton(){
        const {apColors} = this.props;
        return (
            <TouchableOpacity onPress={()=>{this.setState({ isError: false });}}>
                <View style={[styles.popupButton,{backgroundColor: apColors.appColor,}]}>
                    <TextHeavy style={styles.loginButtonText}>{translate('login_try_again')}</TextHeavy>
                </View>
            </TouchableOpacity>
        )
    }
    successButton(){
        const {apColors} = this.props;
        return (
            <TouchableOpacity onPress={() => this._onPressDone() }>
                <View style={[styles.popupButton,{backgroundColor: apColors.appColor,}]}>
                    <TextHeavy style={styles.loginButtonText}>{translate('login_done')}</TextHeavy>
                </View>
            </TouchableOpacity>
        )
    }
    _onPressDone(){
        this.setState({ isSuccess: false });
        const {route,navigation} = this.props;
        const loggedInRoute = route.params?.loggedInRoute ?? 'Home';
        const backRoute = route.params?.backRoute ?? 'Home';
        switch (loggedInRoute){
            case 'Profile':
                navigation.navigate( 'ProfileStack', { screen: 'Profile', params: {backRoute} } )
                break;
            case 'Bookings':
                navigation.navigate( 'BookingsStack', { screen: 'Bookings', params: {backRoute} } )
                break;
            case 'Bookmarks':
                navigation.navigate( 'BookmarksStack', { screen: 'Bookmarks', params: {backRoute} } )
                break;
            default: 
                navigation.navigate( loggedInRoute, {backRoute} )
        }
        
    }
    _renderGreeting(){
        const {apColors} = this.props;
        return (
            <>
                <TextHeavy style={[styles.loginGreeting,{color: apColors.hText,}]}>{translate('login_hi')}</TextHeavy>
                <TextHeavy style={[styles.loginGreeting,{color: apColors.hText,}]}>{translate('login_welcome')}</TextHeavy>
            </>
        )
    }
    _onGoBack(){
        
        // const backRoute = this.props.navigation.getParam('backRoute', 'Home');
        const backRoute = this.props.route.params?.backRoute ?? 'Home';
        this.props.navigation.navigate(backRoute)
    }
    _renderHeader(cstyle = {}){
        // {top: 30 + insets.top}
        const {apColors} = this.props;
        return (
            <View style={[styles.navBar,cstyle]}>
                <BackButton color={apColors.backBtn} onPress={ () => this._onGoBack() }/>
            </View>
        )
    }
    _renderFooter(){
        const {apColors} = this.props;
        return (
            <View style={styles.signUp}>
                <TextRegular style={[styles.signUpText,{color: apColors.pText,}]}>{translate('dont_have_account')}</TextRegular>
                <TouchableOpacity onPress={this.toRegister}>
                    <TextMedium style={[styles.signUpButton,{color: apColors.pText,}]}>{translate('sign_up')}</TextMedium>
                </TouchableOpacity>

            </View>
        )
    }
    
    render() {
        const {apColors} = this.props;
        const {focus,validating,isSuccess,isError,title,message} = this.state
        let logStyle = [styles.textInput,{borderColor: apColors.separator,color: apColors.pText}],
            pwdStyle = [styles.textInput,{borderColor: apColors.separator,color: apColors.pText}];
        if( focus == 'log' ) logStyle = [logStyle,{borderColor: apColors.inputFocus,}]
        if( focus == 'password' ) pwdStyle = [pwdStyle,{borderColor: apColors.inputFocus,}]
        
        // return null;
        return (
            <SafeAreaInsetsContext.Consumer style={{flex: 1}}>
                {insets => <View style={[styles.container,{backgroundColor: apColors.appBg,paddingTop: insets.top,paddingBottom: insets.bottom,paddingLeft: insets.left,paddingRight: insets.right}]}>
                    {this._renderHeader()}

                    <Loader loading={validating}/>
                    
                    <ErrorSuccessPopup isSuccess={isSuccess} isError={isError} title={title} message={message} successButton={this.successButton()} errorButton={this.errorButton()}/>

                    <View style={styles.loginInner}>
                        {this._renderGreeting()}

                        <TextRegular style={[styles.fieldLabel,{color: apColors.fieldLbl,marginTop:40}]}>{translate('user_email')}</TextRegular>
                        <TextInput 
                            // placeholder="Username or Email"
                            style={logStyle}
                            onChangeText={this.onInputChange('log')}
                            onFocus={e=>this.onFucusInput('log')}
                            returnKeyType='next'
                            onSubmitEditing = {this.nextField}
                            autoCorrect={false}
                            underlineColorAndroid='transparent'
                            autoCapitalize="none"
                            autoCompleteType="off"
                            keyboardType="email-address"
                            value={this.state.log}
                        />
                        <TextRegular style={[styles.fieldLabel,{color: apColors.fieldLbl,}]}>{translate('password')}</TextRegular>
                        <TextInput 
                            // placeholder="Password"
                            style={pwdStyle}
                            onChangeText={this.onInputChange('password')}
                            onFocus={e=>this.onFucusInput('password')}
                            secureTextEntry={true}
                            returnKeyType='done'
                            ref={input=>this.password = input}
                            autoCorrect={false}
                            autoCapitalize="none"
                            underlineColorAndroid='transparent'
                            // autoCompleteType="off"
                            // keyboardType="visible-password"
                            value={this.state.password}

                        />

                        <TouchableOpacity onPress={this.toForgetPwd}>
                            <TextRegular style={[styles.forgetPassword,{color: apColors.appColor,}]}>{translate('forget_password')}</TextRegular>
                        </TouchableOpacity>
                        <View style={styles.spacer}/>
                        <TouchableOpacity onPress={this._signInAsync}>
                            <View style={[styles.loginButton,{backgroundColor: apColors.appColor,}]}>
                                <TextHeavy style={styles.loginButtonText}>{translate('login')}</TextHeavy>
                            </View>
                        </TouchableOpacity>

                        
                        

                    </View>
                    
                    {this._renderFooter()}

                </View>}
            </SafeAreaInsetsContext.Consumer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        
        flex:1,
        // alignItems:'center',
        // justifyContent:'center'

        minHeight: Dimensions.get('window').height - 200,
    },
    navBar: {
        // position: 'absolute',
        // top: 52,
        // // marginTop: 52,
        // left: 0,
        // right: 0,
        // zIndex: 200,
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'red',
        paddingTop: 8,
        paddingBottom: 7,
        
    },
    loginInner: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 30,

        // backgroundColor: 'red',
    },
    loginGreeting: {
        
        fontSize: 34,
    },
    fieldLabel:{
        fontSize: 17,
        
        marginTop: 20,
    },

    textInput:{
        // margin:0,
        // marginTop:20,
        // height:40,
        // backgroundColor:'red',
        // // borderRadius:20,
        // paddingLeft:15,
        // // fontSize: AppFontSize,
        // // fontFamily: AppFontFamily,
        // borderRadius: 4,
        // width: 150,
        // flex: 1,
        height: 35,
        // marginTop: 5,
        paddingVertical: 5,
        
        borderBottomWidth: 1,
        borderStyle: 'solid',
        fontSize: 17,
        fontFamily: mediumFontFamily,
    },
    forgetPassword: {
        marginTop: 35,
        fontSize: 17,
        
        textAlign: 'right',
    },
    spacer: {
        height: 60,
    },
    loginButton: {
        
        height: 44,
        borderRadius: 8,
        justifyContent: 'center',
        // marginTop: 60,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 15,
        textAlign: 'center',

    },
    signUp: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // alignSelf: 'flex-end'
        // position: 'absolute',
        // bottom: 30,
        // left: 0,
        // right: 0,
        marginBottom: 15,
    },
    signUpText: {
        
        fontSize: 15,
        lineHeight: 20,
    },
    signUpButton: {
        
        fontSize: 15,
        lineHeight: 17,
        marginLeft: 5,
    },
    popupButton: {
        
        height: 35,
        borderRadius: 8,
        justifyContent: 'center',
        paddingHorizontal: 30,
        marginTop: 20
    },
})