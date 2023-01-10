import React from 'react';
import { 
    View,
    Image,
    TextInput,
    FlatList,
    TouchableOpacity,
    ScrollView, 
    StyleSheet,
    Keyboard,
} from 'react-native';
import Slider from '@react-native-community/slider';

import { SafeAreaInsetsContext } from 'react-native-safe-area-context';

import {formatNumber} from '../../helpers/currency';
import {filterByLoc} from '../../helpers/store';
import {translate} from "../../helpers/i18n";
import {validateEmail} from "../../helpers/helpers";


import {boldFontFamily} from "../../constants/Colors";


import BtnFull from '../../components/ui/BtnFull';
import BtnLarge from '../../components/ui/BtnLarge';


import TextRegular from '../../components/ui/TextRegular';
import TextBold from '../../components/ui/TextBold';

import Loader from '../../components/Loader';
import SuccessPopup from '../../components/SuccessPopup';

import { submitReview, reviewClosePopup} from '../../actions/listing';
import { connect } from 'react-redux';

class CommentsScreen extends React.Component{
    constructor(props){
        super(props)
        const {reviewFields} = this.props.listing;
        let criteria = {};
        if(null != reviewFields && Array.isArray(reviewFields) && reviewFields.length ){
            reviewFields.forEach(rfield=>{
                criteria[rfield.name] = rfield.default;
            });
        }
        this.state = {
            name:'',
            email:'',
            comment: '',
            criteria: criteria,

            validate: true,
            comSubmitted: false,
            popTitle: '',
            popMessage: '',
        }
        
    }
    setReviewCriteria(name,val){
        let {criteria} = this.state
        criteria[name] = val;
        this.setState({criteria})
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
            name,
            email,
            comment,
            criteria,
        } = _self.state
        const {isLoggedIn, display_name,registered_email, ID} = _self.props.user;
        if( null != isLoggedIn && isLoggedIn ){
            name = display_name;
            email = registered_email;
        }

        let popTitle = '', 
            popMessage = ''; 
        if( name.length < 3 ){
            popTitle = translate('reviews', 'title_wrong')
            popMessage = translate('reviews', 'name_length')

            _self.setState({validate: false, popTitle, popMessage })
            return;
        }
        if(  email.length < 3  ){
            popTitle = translate('reviews', 'title_wrong')
            popMessage = translate('reviews', 'email_length')

            _self.setState({validate: false, popTitle, popMessage })
            return;
        }
        if( ! validateEmail(email)  ){
            popTitle = translate('reviews', 'title_wrong')
            popMessage = translate('reviews', 'email_wrong')

            _self.setState({validate: false, popTitle, popMessage })
            return;
        }
        
        if( comment.length < 30 ){
            popTitle = translate('reviews', 'title_wrong')
            popMessage = translate('reviews', 'review_length')

            _self.setState({validate: false, popTitle, popMessage })
            return;
        }

        _self.props.submitReview({ 
            comment_author: name, 
            comment_author_email: email, 
            comment_content: comment, 
            user_id: ID, 
            comment_post_ID: _self.props.listing.ID,

            reviewCriteria: criteria,
        });
        _self.setState({comSubmitted: true,validate: true})
    }
    errorButton(){
        return ( 
            <BtnLarge disabled={false} style={{marginTop:30}} onPress={ ()=>this.setState({validate: true}) }>{translate('reviews','try_again')}</BtnLarge>
        )
    }
    successButton(){
        return ( 
            <BtnLarge disabled={false} style={{marginTop:30}} onPress={ ()=>{this.props.reviewClosePopup();this.props.navigation.goBack()} }>{translate('reviews','done')}</BtnLarge>
        )
    }
    render(){
        const _self = this;
        const {apColors} = _self.props
        let {
            name,
            email,
            comment,
            criteria,
    
            validate,
            popTitle,
            popMessage,
            
            comSubmitted
        } = _self.state
        let editable = true;
        const {isLoggedIn, display_name,registered_email} = _self.props.user;
        if( null != isLoggedIn && isLoggedIn ){
            editable = false;
            name = display_name;
            email = registered_email;
        }
        const {
            submitting, 
            submitted, 
            submitError,
            reviewFields,
        } = _self.props.listing;
        let submittedBtn = {}
        if( submitting ) submittedBtn = {opacity: 0.2}

        let smpopTitle = translate('reviews', 'title_ok'), 
            smpopMessage = translate('reviews', 'message_ok'); 
        if( submitError ) {
            smpopTitle = translate('reviews', 'title_wrong')
            smpopMessage = translate('reviews', 'message_wrong')
        }

        let criteriaJsx = [], totalScore = 0;
        if(null != reviewFields && Array.isArray(reviewFields) && reviewFields.length ){
            reviewFields.forEach((dtbj,idx)=>{
                criteriaJsx.push(<View key={idx}>
                    <TextRegular style={{color: apColors.tText,marginBottom:5,fontSize: 15}}>{dtbj['title']}</TextRegular>
                    <Slider
                        value={criteria[dtbj.name]}
                        onValueChange={val=>_self.setReviewCriteria(dtbj.name,val)}
                        style={{height: 40,width:'100%',flex:1}}
                        step={1}
                        minimumValue={1}
                        maximumValue={dtbj.base}
                        minimumTrackTintColor={apColors.appColor}
                        maximumTrackTintColor="#EAECEF"
                    />
                </View>)
                totalScore += criteria[dtbj.name]
            });
        }

        return(
            <SafeAreaInsetsContext.Consumer style={{flex: 1}}>
                {insets => <View style={[styles.container,{backgroundColor: apColors.appBg,paddingBottom: insets.bottom,paddingLeft: insets.left,paddingRight: insets.right}]}>
                    
                    { submitting === true && <Loader loading={true}/> }

                    <SuccessPopup visible={!validate} title={popTitle} message={popMessage} buttons={ this.errorButton() }/>
                    <SuccessPopup visible={comSubmitted && submitted} title={smpopTitle} message={smpopMessage} buttons={ this.successButton() }/>

                    <ScrollView style={{flex: 1}} contentContainerStyle={styles.contentContainer}>
                        <View style={styles.formWrap}>

                            <View style={styles.reviewsTop}>
                                <View style={styles.reviewsTopLeft}>
                                    <View style={[styles.reviewScore,{backgroundColor: apColors.appColor,}]}><TextBold style={{color:'#FFF', fontSize: 24}}>{formatNumber(totalScore/criteriaJsx.length)}</TextBold></View>
                                    
                                </View>
                                
                                <View style={styles.reviewsTopRight}>
                                    {criteriaJsx}
                                </View>
                            </View>

                            <TextRegular style={[styles.fieldLabel,{color: apColors.fieldLbl,}]}>{translate('reviews','yname')}</TextRegular>
                            <TextInput 
                                style={[styles.textInput,{borderColor: apColors.separator,color: apColors.pText,}]}
                                onChangeText={_self.onInputChange('name')}
                                returnKeyType='next'
                                // onSubmitEditing = {_self.nextField}
                                // autoCorrect={false}
                                underlineColorAndroid='transparent'
                                // autoCapitalize="none"
                                // autoCompleteType="off"
                                // keyboardType="email-address"
                                textContentType="name"
                                value={name}
                                editable={editable}
                            />
                            <TextRegular style={[styles.fieldLabel,{color: apColors.fieldLbl,marginTop:40}]}>{translate('reviews','yemail')}</TextRegular>
                            <TextInput 
                                style={[styles.textInput,{borderColor: apColors.separator,color: apColors.pText,}]}
                                onChangeText={_self.onInputChange('email')}
                                returnKeyType='next'
                                // onSubmitEditing = {_self.nextField}
                                // autoCorrect={false}
                                underlineColorAndroid='transparent'
                                // autoCapitalize="none"
                                // autoCompleteType="off"
                                keyboardType="email-address"
                                textContentType="emailAddress"
                                value={email}
                                editable={editable}
                            />

                            <TextRegular style={[styles.fieldLabel,{color: apColors.fieldLbl,marginTop:40}]}>{translate('reviews','ycomment')}</TextRegular>
                            <TextInput 
                                style={[styles.textInput,{borderColor: apColors.separator,color: apColors.pText,minHeight: 85}]}
                                onChangeText={_self.onInputChange('comment')}
                                // onFocus={e=>_self.onFucusInput('comment')}
                                // returnKeyType='done'
                                // onSubmitEditing = {_self.hideKeyboard}
                                autoCorrect={true}
                                underlineColorAndroid='transparent'
                                autoCapitalize="none"
                                autoCompleteType="off"
                                // keyboardType="email-address"
                                value={comment}
                                multiline={true}
                            />

                        </View>
                    </ScrollView>
                    
                    <View style={styles.submitWrap}>
                        <BtnFull disabled={submitting} style={submittedBtn} onPress={()=>_self._onSubmit()}>{translate('reviews','send_comment')}</BtnFull>
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
    submitReview,
    reviewClosePopup
}
    
//export your list as a default export 
export default connect(mapStateToProps, mapDispatchToProps)(CommentsScreen);

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

    reviewsTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'flex-end',
    },
    reviewsTopLeft: {
        width: 85,
    },
    reviewsTopRight: {
        flex: 1,
    },
    reviewScore: {
        width: 70,
        height: 60,
        borderRadius: 5,
        
        // textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },

    submitWrap: {
        height: 60,
        paddingTop: 5,
        paddingHorizontal: 30,
    },

});
