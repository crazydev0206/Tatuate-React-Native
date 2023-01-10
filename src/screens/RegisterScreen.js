import React from 'react'
import { 
    View, 
    Button, 
    TextInput, 
    StyleSheet, 
    TouchableOpacity, 
    // AsyncStorage ,
    Linking
} from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import axios from 'axios';
// import { AuthSession } from 'expo';
// import * as WebBrowser from 'expo-web-browser';
// import { WebView } from 'react-native-webview';

import {getAppLangCode} from '../helpers/store';

import {mediumFontFamily} from '../constants/Colors';
import {translate} from "../helpers/i18n";

import SiteDetails from '../constants/SiteDetails';

import CloseButton from '../components/inners/CloseButton';
import TextRegular from '../components/ui/TextRegular';
import TextMedium from '../components/ui/TextMedium';
import TextHeavy from '../components/ui/TextHeavy';

import Loader from '../components/Loader';
import ErrorSuccessPopup from '../components/ErrorSuccessPopup';

export default class RegisterScreen extends React.Component {
    // static navigationOptions = ({ navigation }) => {
    //     return {
    //         headerTitle: '',
    //         headerTransparent: true,
    //         headerLeft: () => (
    //             <CloseButton isBlack={true} onPress={navigation.goBack} style={{marginLeft:15}}/>
    //         ),
    //     };
    // };

    constructor(props){
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            validating: false,
            focus: '',

            isSuccess: false, 
            title: translate('signup_wrong'),
            message: '',
            isError: false,
        }
    }
    goToForgetPwd = ()=>{
        this.props.navigation.navigate('ForgetPwd');
    }
    onInputChange = (name)=>(text)=>{
        this.setState({[name]:text})
    }
    onFucusInput = (name) =>{
        this.setState({focus: name})
    }
    _registerAsync = async () => {
        const {username,email,password} = this.state
        if(username.length < 3 || email.length < 3 || password.length < 3){
            this.setState({ isError: true, message:translate('signup_enter_email'), title:translate('signup_wrong') })
            return;
        }
        this.setState({ validating: true });

        const lang = await getAppLangCode();

        axios({
            method: 'POST',
            url: `/register`, 
            data: {
                username,
                password,
                email,
                cthlang: lang,
            },
        }).then(res => {
            //Set the results to the people array.
            const {success} = res.data
            const title = null != res.data.title ? res.data.title : '';
            const message = null != res.data.message ? res.data.message : '';
            if( success ){
                this.setState({ isSuccess: true, validating: false, message, title })
            }else{
                this.setState({ isError: true, validating: false, message, title })
            }
            //Error handle the promise and set your errorMessage
        }).catch(err => {
            this.setState({ validating: false, isError: true });
            console.log(err)
        } );

    }

    // nextField = ()=>{
    //     this.password.focus()
    // }
    errorButton(){
        const {apColors} = this.props;
        return (
            <TouchableOpacity onPress={()=>{this.setState({ isError: false });}}>
                <View style={[styles.popupButton,{backgroundColor: apColors.appColor,}]}>
                    <TextHeavy style={styles.loginButtonText}>{translate('signup_try_again')}</TextHeavy>
                </View>
            </TouchableOpacity>
        )
    }
    successButton(){
        const {apColors} = this.props;
        return (
            <TouchableOpacity onPress={()=>{this.setState({ isSuccess: false });this.props.navigation.goBack();}}>
                <View style={[styles.popupButton,{backgroundColor: apColors.appColor,}]}>
                    <TextHeavy style={styles.loginButtonText}>{translate('signup_done')}</TextHeavy>
                </View>
            </TouchableOpacity>
        )
    }
    goToTerms() {
        // WebBrowser.openBrowserAsync(SiteDetails.terms_page);
        // <WebView
        //     source={{ uri: SiteDetails.terms_page }}
        // />
        Linking.openURL(SiteDetails.terms_page);
    }
    _renderHeader(cstyle = {}){
        // {top: 30 + insets.top}
        const {apColors} = this.props;
        return (
            <View style={[styles.navBar,cstyle]}>
                <CloseButton color={apColors.backBtn} onPress={ () => this.props.navigation.goBack() } style={{}}/>
            </View>
        )
    }
    render() {
        const {apColors} = this.props;
        const {focus,validating,isSuccess,isError,title,message} = this.state
        let usernameStyle = [styles.textInput,{borderColor: apColors.separator,color: apColors.pText,}],
            emailStyle = usernameStyle,
            pwdStyle = usernameStyle;
        if( focus == 'username' ) usernameStyle = [usernameStyle,{borderColor: apColors.inputFocus,}]
        if( focus == 'email' ) emailStyle = [emailStyle,{borderColor: apColors.inputFocus,}]
        if( focus == 'password' ) pwdStyle = [pwdStyle,{borderColor: apColors.inputFocus,}]
        return (
            <SafeAreaInsetsContext.Consumer style={{flex: 1}}>
                {insets => <View style={[styles.container,{backgroundColor: apColors.appBg,paddingTop: insets.top,paddingBottom: insets.bottom,paddingLeft: insets.left,paddingRight: insets.right}]}>
                        
                    {this._renderHeader()}

                    <Loader loading={validating}/>
                    
                    <ErrorSuccessPopup isSuccess={isSuccess} isError={isError} title={title} message={message} successButton={this.successButton()} errorButton={this.errorButton()}/>

                    <View style={styles.loginInner}>
                        <TextHeavy style={[styles.loginGreeting,{color: apColors.hText,}]}>{translate('signup_title')}</TextHeavy>

                        <TextRegular style={[styles.fieldLabel,{color: apColors.fieldLbl,marginTop:40}]}>{translate('signup_username')}</TextRegular>
                        <TextInput 
                            style={usernameStyle}
                            onChangeText={this.onInputChange('username')}
                            onFocus={e=>this.onFucusInput('username')}
                            returnKeyType='next'
                            // onSubmitEditing = {this.nextField}
                            autoCorrect={false}
                            autoCapitalize="none"
                            underlineColorAndroid={'transparent'}
                            autoCompleteType="username"
                            value={this.state.username}
                        />
                        <TextRegular style={[styles.fieldLabel,{color: apColors.fieldLbl,}]}>{translate('signup_email')}</TextRegular>
                        <TextInput 
                            style={emailStyle}
                            onChangeText={this.onInputChange('email')}
                            onFocus={e=>this.onFucusInput('email')}
                            returnKeyType='next'
                            // onSubmitEditing = {this.nextField}
                            autoCorrect={false}
                            autoCapitalize="none"
                            autoCompleteType="off"
                            underlineColorAndroid={'transparent'}
                            autoCompleteType="email"
                            keyboardType="email-address"
                            value={this.state.email}
                        />
                        <TextRegular style={[styles.fieldLabel,{color: apColors.fieldLbl,}]}>{translate('signup_password')}</TextRegular>
                        <TextInput 
                            style={pwdStyle}
                            onChangeText={this.onInputChange('password')}
                            onFocus={e=>this.onFucusInput('password')}
                            secureTextEntry={true}
                            returnKeyType='done'
                            // ref={input=>this.password = input}
                            autoCorrect={false}
                            autoCapitalize="none"
                            // autoCompleteType="off"
                            underlineColorAndroid={'transparent'}
                            // keyboardType="visible-password"
                            value={this.state.password}

                        />
                        <View style={styles.spacer}/>
                        <TouchableOpacity onPress={this._registerAsync}>
                            <View style={[styles.loginButton,{backgroundColor: apColors.appColor,}]}>
                                <TextHeavy style={styles.loginButtonText}>{translate('signup_signup')}</TextHeavy>
                            </View>
                        </TouchableOpacity>


                        <View style={styles.signUpTerms}>
                            <TextRegular style={[styles.signUpText,{color: apColors.pText,}]}>{translate('signup_terms')}</TextRegular>
                            <TouchableOpacity onPress={this.goToTerms} style={styles.termsLink}>
                                <TextMedium style={[styles.termsLinkText,{color: apColors.pText,}]}>{translate('signup_terms_conditions')}</TextMedium>
                            </TouchableOpacity> 
                        </View>

                    </View>
                        
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
    },
    navBar: {
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 8,
        paddingBottom: 7,
        
    },
    loginInner: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 30,
    },
    loginGreeting: {
        
        fontSize: 34,
    },
    fieldLabel:{
        fontSize: 17,
        
        marginTop: 20,
    },
    textInput:{
        height: 35,
        paddingVertical: 5,
        
        borderBottomWidth: 1,
        borderStyle: 'solid',
        fontSize: 17,
        
        fontFamily: mediumFontFamily,
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
    signUpTerms: {
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // // alignSelf: 'flex-end'
        // position: 'absolute',
        // bottom: 50,
        // left: 0,
        // right: 0,
    },
    signUpText: {
        
        fontSize: 15,
        lineHeight: 20,
        textAlign: 'center',
        marginTop: 30,
    },

    popupButton: {
        
        height: 35,
        borderRadius: 8,
        justifyContent: 'center',
        paddingHorizontal: 30,
        marginTop: 20
    },
    termsLink: {

    },
    termsLinkText:{
        
        fontSize: 17,
        marginTop: 10
    }
})