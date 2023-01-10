import React from 'react'
import { 
    View, 
    Button, 
    TextInput, 
    StyleSheet, 
    TouchableOpacity 
} from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import axios from 'axios';

import {getAppLangCode} from '../helpers/store';

import {mediumFontFamily} from '../constants/Colors';
import {translate} from "../helpers/i18n";


import CloseButton from '../components/inners/CloseButton';
import TextRegular from '../components/ui/TextRegular';
import TextMedium from '../components/ui/TextMedium';
import TextHeavy from '../components/ui/TextHeavy';
import Loader from '../components/Loader';
import ErrorSuccessPopup from '../components/ErrorSuccessPopup';


export default class ForgetPwdScreen extends React.Component {
    // custom header button/title
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
            user_login: '',
            validating: false,
            focus: '',
            isSuccess: false, 
            title: translate('forget_wrong'),
            message: '',
            isError: false,
        }
    }
    
    onInputChange = (name)=>(text)=>{
        this.setState({[name]:text})
    }
    onFucusInput = (name) =>{
        this.setState({focus: name})
    }
    _resetPwdAsync = async () => {
        const {user_login} = this.state
        if(user_login.length < 3){
            this.setState({ isError: true, message: translate('forget_enter_email'), title:translate('forget_wrong') })
            return;
        }
        this.setState({ validating: true });

        const lang = await getAppLangCode();

        axios({
            method:'POST',
            url: `/resetpwd`, 
            data: {
                user_login,
                cthlang: lang,
            },
        }).then(res => {
            //Set the results to the people array.
            console.log(res.data);
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
                    <TextHeavy style={styles.loginButtonText}>{translate('forget_try_again')}</TextHeavy>
                </View>
            </TouchableOpacity>
        )
    }
    successButton(){
        const {apColors} = this.props;
        return (
            <TouchableOpacity onPress={()=>{this.setState({ isSuccess: false });this.props.navigation.goBack();}}>
                <View style={[styles.popupButton,{backgroundColor: apColors.appColor,}]}>
                    <TextHeavy style={styles.loginButtonText}>{translate('forget_done')}</TextHeavy>
                </View>
            </TouchableOpacity>
        )
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
        let logStyle = [styles.textInput,{borderColor: apColors.separator,color: apColors.pText,}]
        if( focus == 'user_login' ) logStyle = [logStyle,{borderColor: apColors.inputFocus,}]
        return (
            <SafeAreaInsetsContext.Consumer style={{flex: 1}}>
                {insets => <View style={[styles.container,{backgroundColor: apColors.appBg,paddingTop: insets.top,paddingBottom: insets.bottom,paddingLeft: insets.left,paddingRight: insets.right}]}>
                    
                    {this._renderHeader()}

                    <Loader loading={validating}/>
                    
                    <ErrorSuccessPopup isSuccess={isSuccess} isError={isError} title={title} message={message} successButton={this.successButton()} errorButton={this.errorButton()}/>

                    <View style={styles.loginInner}>
                        <TextHeavy style={[styles.loginGreeting,{color: apColors.hText,}]}>{translate('forget_title')}</TextHeavy>
                        <TextRegular style={[styles.forgetDirection,{color: apColors.pText,}]}>{translate('forget_message')}</TextRegular>

                        <TextRegular style={[styles.fieldLabel,{color: apColors.fieldLbl,}]}>{translate('forget_user_email')}</TextRegular>
                        <TextInput 
                            style={logStyle}
                            onChangeText={this.onInputChange('user_login')}
                            onFocus={e=>this.onFucusInput('user_login')}
                            returnKeyType='done'
                            // onSubmitEditing = {this.nextField}
                            autoCorrect={false}
                            autoCapitalize="none"
                            autoCompleteType="off"
                            underlineColorAndroid={'transparent'}
                            keyboardType="email-address"
                            value={this.state.user_login}
                        />
                        
                        <View style={styles.spacer}/>
                        <TouchableOpacity onPress={this._resetPwdAsync}>
                            <View style={[styles.loginButton,{backgroundColor: apColors.appColor,}]}>
                                <TextHeavy style={styles.loginButtonText}>{translate('forget_send')}</TextHeavy>
                            </View>
                        </TouchableOpacity>

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
    forgetDirection: {
        marginTop: 30,
        fontSize: 17, 
        lineHeight: 22,
        
    },
    fieldLabel:{
        fontSize: 17,
        
        marginTop: 40,
    },
    textInput:{
        height: 35,
        // marginTop: 5,
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
    popupButton: {
        
        height: 35,
        borderRadius: 8,
        justifyContent: 'center',
        paddingHorizontal: 30,
        marginTop: 20
    },
})