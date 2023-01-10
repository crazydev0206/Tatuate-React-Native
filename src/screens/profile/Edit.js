import React from 'react';
import { 
    View,
    Image,
    ScrollView,
    TextInput,
    Button,
    TouchableOpacity, 
    StyleSheet ,
    Platform
} from 'react-native';
// import ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';


import {boldFontFamily} from '../../constants/Colors';
import {translate} from "../../helpers/i18n";

import TextHeavy from '../../components/ui/TextHeavy';
import TextBold from '../../components/ui/TextBold';
import TextMedium from '../../components/ui/TextMedium';
import TextRegular from '../../components/ui/TextRegular';
import BtnLarge from '../../components/ui/BtnLarge';
import BtnFull from '../../components/ui/BtnFull';

import {
    PhotoSvg,
} from '../../components/icons/ButtonSvgIcons';
import Loader from '../../components/Loader';
import SuccessPopup from '../../components/SuccessPopup';
// for redux
import { submitProfile, profileClosePopup } from '../../actions/user';
import { connect } from 'react-redux';

class EditProfile extends React.Component {
    constructor(props){
        super(props);
        let {ID,avatar,first_name,last_name,display_name,description,email,phone,website,address,company,date_of_birth} = this.props.user

        
        let dfDate = moment(date_of_birth)
        if( dfDate.isValid() === false ){
            date_of_birth = ''
            dfDate = moment().subtract(18, 'years').format('YYYY-MM-DD')
            // dfDate = moment().subtract(18, 'years')
            
        }else{
            dfDate = dfDate.format('YYYY-MM-DD')
        }
        dfDate = new Date(dfDate)

        this.state = { 
            focus: '', 
            ID,
            first_name,
            last_name,
            display_name,
            description,
            email,
            phone,
            website,
            address,
            company,
            date_of_birth,
            // avatar,
            showDatePicker: false,
            // dfDate: dfDate.format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
            dfDate: dfDate,
            customAvatar: null,
        }

        this.onDateChange = this.onDateChange.bind(this)
    }
    // this.props.
    onInputChange = (name)=>(text)=>{
        this.setState({[name]:text})
    }
    onFucusInput = (name) =>{
        this.setState({focus: name})
    }
    onShowDatePicker = (name) =>{
        this.setState({focus: name, showDatePicker: true})
    }
    onHideDatePicker(){
        this.setState({showDatePicker: false})
    }
    onDateChange(event, selectedDate){
        const {focus,dfDate} = this.state
        const currentDate = selectedDate || dfDate;
        this.setState({dfDate: currentDate, date_of_birth: moment(currentDate).format('YYYY-MM-DD'), showDatePicker: Platform.OS === 'ios' ? true : false })
    }
    onShowImagePicker(){
        // More info on all the options is below in the API Reference... just some common use cases shown here
        // https://github.com/react-native-community/react-native-image-picker/blob/master/docs/Reference.md
        const options = {
            title:              'Select Avatar',
            // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions:     {
                skipBackup:         true,
                path:               'images',
            },
            mediaType:          'photo',
            cameraType:         'front',
            // noData:             true
            maxWidth:           2000,
            maxHeight:          2000,
            allowsEditing:      true,
            includeBase64: true,
        };

        /**
         * The first arg is the options object for customization (it can also be null or omitted for default options),
         * The second arg is the callback which sends object: response (more info in the API Reference)
         */
        // ImagePicker.showImagePicker(options, (response) => {
        launchImageLibrary(options, (response) => {
            // console.log('Response = ', response);

            if (response.didCancel) {
                // console.log('User cancelled image picker');
                this.setState({
                    customAvatar: null,
                });
            } else if (response.error) {
                // console.log('ImagePicker Error: ', response.error);
                this.setState({
                    customAvatar: null,
                });
            // } else if (response.customButton) {
            //     console.log('User tapped custom button: ', response.customButton);
            } else {
                // const source = { uri: response.uri };

                // console.log(response);

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    customAvatar: response
                    // customAvatar: {
                    //     name: response.fileName,
                    //     type: response.type,
                    //     uri: Platform.OS === 'android' ? response.uri : response.uri.replace('file://', ''),
                    // }
                });
            }
        });
    }
    _onSubmit(){
        let {
            ID,
            first_name,
            last_name,
            display_name,
            description,
            email,
            phone,
            website,
            address,
            company,
            date_of_birth,
            customAvatar,
        } = this.state
        // https://stackoverflow.com/questions/42167094/react-native-image-upload
        this.props.submitProfile({
            ID,
            first_name,
            last_name,
            display_name,
            description,
            email,
            phone,
            website,
            address,
            company,
            date_of_birth,
            customAvatar,
        })
    }
    successButton(){
        return ( 
            <BtnLarge disabled={false} style={{marginTop:30}} onPress={ ()=>{this.props.profileClosePopup();this.props.navigation.goBack()} }>{translate('editprofile','done')}</BtnLarge>
        )
    }
    render(){
        const {apColors} = this.props;
        const {
            // avatar,
            registered_email,
            submitting,
            submitted,
            isSuccess 
        } = this.props.user


        const {
            first_name,
            last_name,
            display_name,
            description,
            email,
            phone,
            website,
            address,
            company,
            date_of_birth,
            showDatePicker,
            dfDate,
            customAvatar,
        } = this.state


        let {
            avatar,
        } = this.props.user

        if( customAvatar != null ){
            avatar = customAvatar.uri
        }

        let submittedBtn = {}
        if( submitting ) submittedBtn = {opacity: 0.2}

        let popTitle = translate('editprofile', 'title_ok'), 
            popMsg = translate('editprofile', 'message_ok'); 
        if( !isSuccess ){
            popTitle = translate('editprofile', 'title_wrong');
            popMsg = translate('editprofile', 'message_wrong');
        }


        return (
            <SafeAreaInsetsContext.Consumer style={{flex: 1}}>
                {insets => <View style={[styles.container,{backgroundColor: apColors.appBg,paddingLeft: insets.left,paddingRight: insets.right,paddingBottom: insets.bottom}]}>
                    
                    { submitting === true && <Loader loading={true}/> }

                    <SuccessPopup visible={submitted} title={popTitle} message={popMsg} buttons={this.successButton()}/>

                    <ScrollView style={{flex: 1}}>

                        <View style={styles.headerSection}>
                            <TouchableOpacity style={styles.uploadAvatar} onPress={()=>this.onShowImagePicker()}>
                                <View style={[styles.avatarWrap,{shadowColor: apColors.shadowCl,}]}>
                                    {avatar && <Image
                                        source={{uri: avatar}}
                                        style={styles.avatar}
                                        resizeMode="cover"
                                    /> }
                                    
                                </View>
                                <View style={[styles.photoIconWrap,{backgroundColor: apColors.appColor,}]}>
                                    <PhotoSvg />
                                </View>
                            </TouchableOpacity>

                            

                        </View>

                        <View style={styles.formSection}>
                            <View style={styles.formWrap}>
                                <TextRegular style={[styles.fieldLabel,{color: apColors.fieldLbl,}]}>{translate('editprofile','fname')}</TextRegular>
                                <TextInput 
                                    style={[styles.textInput,{borderColor: apColors.separator,color: apColors.pText}]}
                                    onChangeText={this.onInputChange('first_name')}
                                    onFocus={e=>this.onFucusInput('first_name')}
                                    returnKeyType='next'
                                    // onSubmitEditing = {this.nextField}
                                    // autoCorrect={false}
                                    underlineColorAndroid='transparent'
                                    // autoCapitalize="none"
                                    // autoCompleteType="off"
                                    // keyboardType="email-address"
                                    value={first_name}
                                />

                                <TextRegular style={[styles.fieldLabel,{color: apColors.fieldLbl,marginTop:40}]}>{translate('editprofile','lname')}</TextRegular>
                                <TextInput 
                                    style={[styles.textInput,{borderColor: apColors.separator,color: apColors.pText}]}
                                    onChangeText={this.onInputChange('last_name')}
                                    onFocus={e=>this.onFucusInput('last_name')}
                                    returnKeyType='next'
                                    // onSubmitEditing = {this.nextField}
                                    // autoCorrect={false}
                                    underlineColorAndroid='transparent'
                                    // autoCapitalize="none"
                                    // autoCompleteType="off"
                                    // keyboardType="email-address"
                                    value={last_name}
                                />

                                <TextRegular style={[styles.fieldLabel,{color: apColors.fieldLbl,marginTop:40}]}>{translate('editprofile','dname')}</TextRegular>
                                <TextInput 
                                    style={[styles.textInput,{borderColor: apColors.separator,color: apColors.pText}]}
                                    onChangeText={this.onInputChange('display_name')}
                                    onFocus={e=>this.onFucusInput('display_name')}
                                    returnKeyType='next'
                                    // onSubmitEditing = {this.nextField}
                                    autoCorrect={false}
                                    underlineColorAndroid='transparent'
                                    autoCapitalize="none"
                                    autoCompleteType="off"
                                    // keyboardType="email-address"
                                    value={display_name}
                                />

                                <TextRegular style={[styles.fieldLabel,{color: apColors.fieldLbl,marginTop:40}]}>{translate('editprofile','email')}</TextRegular>
                                <TextInput 
                                    style={[styles.textInput,{borderColor: apColors.separator,color: apColors.pText,color: apColors.addressText}]}
                                    onChangeText={this.onInputChange('registered_email')}
                                    onFocus={e=>this.onFucusInput('registered_email')}
                                    returnKeyType='next'
                                    // onSubmitEditing = {this.nextField}
                                    autoCorrect={false}
                                    underlineColorAndroid='transparent'
                                    autoCapitalize="none"
                                    autoCompleteType="off"
                                    keyboardType="email-address"
                                    editable={false}
                                    value={registered_email}
                                />

                                <TextRegular style={[styles.fieldLabel,{color: apColors.fieldLbl,marginTop:40}]}>{translate('editprofile','contact_email')}</TextRegular>
                                <TextInput 
                                    style={[styles.textInput,{borderColor: apColors.separator,color: apColors.pText}]}
                                    onChangeText={this.onInputChange('email')}
                                    onFocus={e=>this.onFucusInput('email')}
                                    returnKeyType='next'
                                    // onSubmitEditing = {this.nextField}
                                    autoCorrect={false}
                                    underlineColorAndroid='transparent'
                                    autoCapitalize="none"
                                    autoCompleteType="off"
                                    keyboardType="email-address"
                                    value={email}
                                />

                                <TextRegular style={[styles.fieldLabel,{color: apColors.fieldLbl,marginTop:40}]}>{translate('editprofile','description')}</TextRegular>
                                <TextInput 
                                    style={[styles.textInput,{borderColor: apColors.separator,color: apColors.pText,minHeight: 85}]}
                                    onChangeText={this.onInputChange('description')}
                                    onFocus={e=>this.onFucusInput('description')}
                                    returnKeyType='next'
                                    // onSubmitEditing = {this.nextField}
                                    autoCorrect={false}
                                    underlineColorAndroid='transparent'
                                    autoCapitalize="none"
                                    autoCompleteType="off"
                                    // keyboardType="email-address"
                                    value={description}
                                    multiline={true}
                                />



                                <TextRegular style={[styles.fieldLabel,{color: apColors.fieldLbl,marginTop:40}]}>{translate('editprofile','birth')}</TextRegular>
                                
                                <TouchableOpacity style={[styles.dateTimeInput,{borderColor: apColors.separator,}]} onPress={()=>this.onShowDatePicker('date_of_birth')}>
                                    <TextHeavy style={{fontSize: 17, color: apColors.pText}}>{date_of_birth}</TextHeavy>
                                </TouchableOpacity>

                                <TextRegular style={[styles.fieldLabel,{color: apColors.fieldLbl,marginTop:40}]}>{translate('editprofile','phone')}</TextRegular>
                                <TextInput 
                                    style={[styles.textInput,{borderColor: apColors.separator,color: apColors.pText}]}
                                    onChangeText={this.onInputChange('phone')}
                                    onFocus={e=>this.onFucusInput('phone')}
                                    returnKeyType='next'
                                    // onSubmitEditing = {this.nextField}
                                    // autoCorrect={false}
                                    underlineColorAndroid='transparent'
                                    autoCapitalize="none"
                                    // autoCompleteType="off"
                                    keyboardType="phone-pad"
                                    value={phone}
                                />

                                <TextRegular style={[styles.fieldLabel,{color: apColors.fieldLbl,marginTop:40}]}>{translate('editprofile','address')}</TextRegular>
                                <TextInput 
                                    style={[styles.textInput,{borderColor: apColors.separator,color: apColors.pText}]}
                                    onChangeText={this.onInputChange('address')}
                                    onFocus={e=>this.onFucusInput('address')}
                                    returnKeyType='next'
                                    // onSubmitEditing = {this.nextField}
                                    // autoCorrect={false}
                                    underlineColorAndroid='transparent'
                                    autoCapitalize="none"
                                    // autoCompleteType="off"
                                    // keyboardType="phone-pad"
                                    value={address}
                                />
                                
                                <TextRegular style={[styles.fieldLabel,{color: apColors.fieldLbl,marginTop:40}]}>{translate('editprofile','company')}</TextRegular>
                                <TextInput 
                                    style={[styles.textInput,{borderColor: apColors.separator,color: apColors.pText}]}
                                    onChangeText={this.onInputChange('company')}
                                    onFocus={e=>this.onFucusInput('company')}
                                    returnKeyType='next'
                                    // onSubmitEditing = {this.nextField}
                                    // autoCorrect={false}
                                    underlineColorAndroid='transparent'
                                    autoCapitalize="none"
                                    // autoCompleteType="off"
                                    // keyboardType="phone-pad"
                                    value={company}
                                />

                                <TextRegular style={[styles.fieldLabel,{color: apColors.fieldLbl,marginTop:40}]}>{translate('editprofile','website')}</TextRegular>
                                <TextInput 
                                    style={[styles.textInput,{borderColor: apColors.separator,color: apColors.pText}]}
                                    onChangeText={this.onInputChange('website')}
                                    onFocus={e=>this.onFucusInput('website')}
                                    returnKeyType='done'
                                    // onSubmitEditing = {this.nextField}
                                    // autoCorrect={false}
                                    underlineColorAndroid='transparent'
                                    autoCapitalize="none"
                                    // autoCompleteType="off"
                                    // keyboardType="phone-pad"
                                    value={website}
                                    textContentType="URL"
                                />

                                <View style={styles.submitWrap}>
                                    <BtnFull disabled={submitting} style={[{marginLeft:15,marginRight:15},submittedBtn]} onPress={()=>this._onSubmit({})}>{translate('editprofile','save')}</BtnFull>
                                </View>
                        
                            </View>
                        </View>
                        
                        

                    </ScrollView>
                    {showDatePicker && (
                        <View style={styles.datePickerWrap}>
                            <TouchableOpacity style={styles.datePickerSave} onPress={()=>this.onHideDatePicker()}>
                                <TextMedium style={{fontSize: 17, color: apColors.appColor,textAlign:'right'}}>{translate('editprofile','save')}</TextMedium>
                            </TouchableOpacity>
                            <DateTimePicker
                                testID="dateTimePicker"
                                // timeZoneOffsetInMinutes={0}
                                value={dfDate}
                                // mode={mode}
                                is24Hour={true}
                                display="default"
                                onChange={this.onDateChange}
                                // style={{backgroundColor:'red'}}
                            />
                        </View>
                    )}
                </View>}
            </SafeAreaInsetsContext.Consumer>
        )
    }
}

//Map the redux state to your props.
const mapStateToProps = state => ({
    user: state.user,
})

//Map your action creators to your props.
const mapDispatchToProps = {
    submitProfile,
    profileClosePopup
}

//export your list as a default export 
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);



const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    headerSection: {
        padding: 20,
        // paddingBottom: 35,
        // paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        // alignItems: 'center',
        // borderBottomWidth: 1,
        // borderBottomColor: '#EAECEF',
        // marginBottom: 40,
    },
    uploadAvatar: {
        width: 150,
        height: 150,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    avatarWrap: {
        height: 142,
        width: 142,
        // borderRadius: 71,
        // borderWidth: 3,
        // borderColor: '#FFF',
        // overflow: 'hidden',

        
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 10,  
        elevation: 1,
    },
    avatar: {
        height: 142,
        width: 142,
        borderRadius: 71,
        borderWidth: 3,
        borderColor: '#FFF',
    },
    photoIconWrap: {
        width: 40,
        height: 40,
        borderRadius: 20,
        
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',

        position: 'absolute',
        bottom: 5,
        right: 5,
        zIndex: 100,
    },
    formSection: {
        // paddingTop: 15,
        paddingHorizontal: 15,
        paddingBottom: 30,
    },
    formWrap: {

    },
    fieldLabel:{
        fontSize: 15,
        
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
        
        fontFamily: boldFontFamily,
    },
    // textInputFocus: {
    //     borderColor: apColors.inputFocus,
    // },
    dateTimeInput: {
        height: 35,
        paddingVertical: 5,
        
        borderBottomWidth: 1,
        borderStyle: 'solid',
        
    },
    datePickerWrap: {
        // backgroundColor: 'yellow',
    },
    datePickerSave: {
        // backgroundColor: '#ccc',
        paddingVertical: 5,
        paddingRight: 15,
        width: 100,
        alignSelf: 'flex-end',
    },
    submitWrap: {
        marginTop: 40,
        marginBottom: 50,
    },
});
