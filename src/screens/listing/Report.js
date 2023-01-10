import React from 'react';
import { 
    View,
    // Image,
    TextInput,
    // FlatList,
    // TouchableOpacity,
    ScrollView, 
    StyleSheet,
    Keyboard,
} from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';

// import {filterByLoc} from '../../helpers/store';
import {translate} from "../../helpers/i18n";
// import {validateEmail} from "../../helpers/helpers";

import {boldFontFamily} from "../../constants/Colors";

import BtnFull from '../../components/ui/BtnFull';
import BtnLarge from '../../components/ui/BtnLarge';


import TextRegular from '../../components/ui/TextRegular';
import TextHeavy from '../../components/ui/TextHeavy';

import Loader from '../../components/Loader';
import SuccessPopup from '../../components/SuccessPopup';

import { submitReport } from '../../actions/listing';
import { connect } from 'react-redux';

class ReportScreen extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            details: '',

            validate: true,
            comSubmitted: false,
            popTitle: '',
            popMessage: '',
        }
        
    }
    onInputChange = (name)=>(text)=>{
        this.setState({[name]:text})
    }
    hideKeyboard(){
        Keyboard.dismiss()
    }
    _onSubmit(){
        const _self = this
        let {
            details,
        } = _self.state
        
        let popTitle = '', 
            popMessage = ''; 
        if( details.length < 30 ){
            popTitle = translate('report', 'title_wrong')
            popMessage = translate('report', 'details_length')

            _self.setState({validate: false, popTitle, popMessage })
            return;
        }

        _self.props.submitReport( {listing_id: _self.props.listing.ID, report_message: details, user_id: _self.props.user.ID } )
        _self.setState({comSubmitted: true,validate: true})
    }
    errorButton(){
        return ( 
            <BtnLarge disabled={false} style={{marginTop:30}} onPress={ ()=>this.setState({validate: true}) }>{translate('report','try_again')}</BtnLarge>
        )
    }
    successButton(){
        return ( 
            <BtnLarge disabled={false} style={{marginTop:30}} onPress={ ()=>{this.props.navigation.goBack()} }>{translate('report','done')}</BtnLarge>
        )
    }
    render(){
        const _self = this;
        const {apColors} = _self.props
        let {
            details,

            validate,
            popTitle,
            popMessage,
            
            comSubmitted
        } = _self.state
        const {submitting, submitted, submitError,submittedMsg} = _self.props.listing;
        let submittedBtn = {}
        if( submitting ) submittedBtn = {opacity: 0.2}
        if( submitted ){
            popTitle = translate('report', 'title_ok'); 
            if( submitError ) {
                popTitle = translate('report', 'title_wrong');
            }
            popMessage = submittedMsg;
        }
        return(
            <SafeAreaInsetsContext.Consumer style={{flex: 1}}>
                {insets => <View style={[styles.container,{backgroundColor: apColors.appBg,paddingBottom: insets.bottom,paddingLeft: insets.left,paddingRight: insets.right}]}>
                    
                    { submitting === true && <Loader loading={true}/> }

                    <SuccessPopup visible={!validate} title={popTitle} message={popMessage} buttons={ this.errorButton() }/>
                    <SuccessPopup visible={comSubmitted && submitted} title={popTitle} message={popMessage} buttons={ this.successButton() }/>

                    <ScrollView style={{flex: 1}} contentContainerStyle={styles.contentContainer}>
                        <View style={styles.formWrap}>

                            <TextRegular style={[styles.reportIntro,{color: apColors.pText,}]}>{translate('report','intro')}</TextRegular>
                            
                            <TextRegular style={[styles.fieldLabel,{color: apColors.fieldLbl,}]}>{translate('report','details')}</TextRegular>
                            <TextInput 
                                style={[styles.textInput,{borderColor: apColors.separator,color: apColors.pText, minHeight: 85}]}
                                onChangeText={_self.onInputChange('details')}
                                // onFocus={e=>_self.onFucusInput('details')}
                                // returnKeyType='done'
                                // onSubmitEditing = {_self.hideKeyboard}
                                autoCorrect={true}
                                underlineColorAndroid='transparent'
                                autoCapitalize="none"
                                autoCompleteType="off"
                                // keyboardType="email-address"
                                value={details}
                                multiline={true}
                            />

                            <View style={styles.listingDetails}>
                                <TextHeavy style={[styles.listingTitle,{color: apColors.tText,}]}>{ translate( 'report','listing', {title: _self.props.listing.title} ) }</TextHeavy>
                            </View>
                        </View>
                    </ScrollView>
                    
                    <View style={styles.submitWrap}>
                        <BtnFull disabled={submitting} style={submittedBtn} onPress={()=>_self._onSubmit()}>{translate('report','send_report')}</BtnFull>
                    </View>
                </View>}
            </SafeAreaInsetsContext.Consumer>
        )
    }
}

//Map the redux state to your props.
const mapStateToProps = state => ({
    user: state.user,
    listing: state.listing,
})

//Map your action creators to your props.
const mapDispatchToProps = {
    submitReport
}
    
//export your list as a default export 
export default connect(mapStateToProps, mapDispatchToProps)(ReportScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: 15,
        
    },
    contentContainer: {
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
    formWrap: {

    },
    reportIntro: {
        fontSize: 17,
        lineHeight: 22,
        
        marginTop: 20,
    },
    fieldLabel:{
        fontSize: 17,
        lineHeight: 22,
        
        marginTop: 20,
    },
    textInput:{
        height: 35,
        paddingVertical: 5,
        
        borderBottomWidth: 1,
        borderStyle: 'solid',
        fontSize: 17,
        
        fontFamily: boldFontFamily,
    },
    // textInputFocus: {
    //     borderColor: apColors.inputFocus,
    // },
    listingDetails: {
        marginTop: 35,
    },
    listingTitle: {
        fontSize: 17,
        lineHeight: 22,
        
    },
    submitWrap: {
        height: 60,
        paddingTop: 5,
        paddingHorizontal: 30,
    },

});
