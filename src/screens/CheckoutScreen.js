import React from 'react';
import { 
    ScrollView,
    View,
    TextInput,
    Image,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    Linking,
    // Modal
} from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
// import * as WebBrowser from 'expo-web-browser';
// import { WebView } from 'react-native-webview';



import {mediumFontFamily,regularFontFamily} from '../constants/Colors';
import {translate} from "../helpers/i18n";
import {checkBkPayment} from "../helpers/store";

import BtnLarge from '../components/ui/BtnLarge';
import BtnFull from '../components/ui/BtnFull';
import BtnLink from '../components/ui/BtnLink';
import TextRegular from '../components/ui/TextRegular';
import TextMedium from '../components/ui/TextMedium';
import TextHeavy from '../components/ui/TextHeavy';

import {CheckMarkSvg} from '../components/icons/ButtonSvgIcons';

// https://github.com/react-native-community/react-native-svg#use-with-xml-strings
// import { SvgXml } from 'react-native-svg';





// for redux
import { connect } from 'react-redux';
import { submitCheckout, checkoutExit } from '../actions/booking';

import Loader from '../components/Loader';
import ErrorSuccessPopup from '../components/ErrorSuccessPopup';
import ForHTML from '../components/ui/ForHTML';

let checkTimeout = null;
const checkOnlinePayment = (booking_id) => {
    
    checkTimeout = setTimeout(()=>{
        
        checkBkPayment(booking_id)
    }, 15000 );
}

class CheckoutScreen extends React.Component{
    constructor(props){
        super(props)
        this.state = { 
            notes: '' ,
            focus: '', 
            pmMethod: '',
            coupon_code: '',
            payBtnText: translate('ck_submit'),

            comSubmitted: false,
            waitingPayment: false,
            paymentCompleted: false,
            customPMForm: false,
        }
        this.onChangeNote = this.onChangeNote.bind(this)
        this.onChangeCoupon = this.onChangeCoupon.bind(this)
        this.onFucusInput = this.onFucusInput.bind(this)
        this._onSubmit= this._onSubmit.bind(this)

        // this.timeout = null;

        // console.log('CheckoutScreen -> constructor');

    }
    // componentDidMount() {
    //     console.log('CheckoutScreen -> componentDidMount');
    // }
    componentWillUnmount(){
        // console.log('CheckoutScreen -> componentWillUnmount');
         // for timeout when un mount
        if(checkTimeout != null) clearTimeout(checkTimeout)
    }
    static getDerivedStateFromProps(props, state) {
        // console.log('CheckoutScreen -> getDerivedStateFromProps');
        const {submitted, isSuccess, url, booking_id, bk_status } = props.booking;
        if( submitted == true && isSuccess == true && url != '' && state.comSubmitted == true ){
            checkOnlinePayment(booking_id);
            // WebBrowser.openBrowserAsync(url);
            Linking.openURL(url);
            return {waitingPayment: true, comSubmitted: false}
            
        }
        // check for custom form
        // https://stackoverflow.com/questions/35531679/react-native-open-links-in-browser
        // if( null != props.booking.scform && props.booking.scform == true && submitted == true && isSuccess == true && state.comSubmitted == true ){
        //     checkOnlinePayment(booking_id);
        //     return {waitingPayment: true, comSubmitted: false, customPMForm: true}
        // }
        if( bk_status != '' && bk_status != 'completed' ){
            
            if(checkTimeout != null) clearTimeout(checkTimeout)
            
            checkOnlinePayment(booking_id);
        }else if( bk_status == 'completed' ){
            
            return {waitingPayment: false, comSubmitted: true, paymentCompleted: true, customPMForm: false }
        }
        // No state update necessary
        return null;
    }
    onChangeNote(notes){
        this.setState({notes})
    }
    onChangeCoupon(coupon_code){
        this.setState({coupon_code})
    }
    
    onFucusInput = (name) =>{
        this.setState({focus: name})
    }
    onSelectPaymentMethod(method, payBtnText){
        payBtnText = payBtnText != '' ? payBtnText : translate('ck_submit')
        this.setState({pmMethod: method, payBtnText})
    }
    getSubmitData(){
        // user 
        let {ID,display_name,email_contact,email,phone} = this.props.user;
        const {notes,pmMethod,coupon_code} = this.state

            

        const {datas} = this.props.booking
        const submitDatas = {
            user_id: ID,
            lb_name: display_name,
            lb_email: null != email_contact && '' != email_contact ? email_contact : email,
            lb_phone: phone,
            ...datas,
            notes,
            payment_method: pmMethod,
            coupon_code,
        }

        return submitDatas;
    }
    _onSubmit(){
        if( this.state.pmMethod == '' ){
            Alert.alert(
                translate('checkout', 'no_payment'),
                '',
                [
                    {text: translate('slisting', '_ok'), onPress: () => {} },
                ],
                {cancelable: false},
            );

            return ;
        }
        this.setState({comSubmitted: true})
        this.props.submitCheckout( this.getSubmitData() )
    }
    _onDonePress(){
        this.setState({comSubmitted: false, paymentCompleted: false, waitingPayment: false})
        this.props.checkoutExit();
        this.props.navigation.navigate('Home')
    }
    _onGoBookingPress(){
        this.setState({comSubmitted: false})
        this.props.checkoutExit();
        // this.props.navigation.navigate('Bookings')
        this.props.navigation.navigate( 'BookingsStack', { screen: 'Bookings' } )
    }
    errorButton(){
        return (
            <BtnLarge disabled={false} style={{marginTop:30}} onPress={()=>{this.props.navigation.goBack()}}>{translate('ck_try_again')}</BtnLarge>
        )
    }
    successButton(){
        const {apColors} = this.props;
        return ( 
            <>
                <BtnLarge disabled={false} style={{marginTop:30}} onPress={()=>this._onDonePress()}>{translate('ck_gohome')}</BtnLarge>
                <TouchableOpacity onPress={()=>this._onGoBookingPress()}>
                    <TextHeavy style={{marginTop:20,fontSize:15,color: apColors.separator,textAlign:'center'}}>{translate('ck_go_booking')}</TextHeavy>
                </TouchableOpacity> 
            </>
        )
    }
    _renderPayments(){
        const {apColors} = this.props;
        const {pmMethod} = this.state
        const {payments} = this.props.listing;
        let pmJsx = [];
        if( null != payments && typeof payments == 'object' && false === Array.isArray(payments)){
            for( let pm in payments ){
                if( pm == 'stripe' ) continue;
                const btnText = null != payments[pm]['checkout_text'] ? payments[pm]['checkout_text'] : '';
                pmJsx.push(
                    <View key={pm}>
                        <TouchableOpacity key={pm} style={[styles.ckPaymentWrap,{backgroundColor: apColors.secondBg,borderColor: apColors.separator,},(pmMethod === pm ? {borderColor: apColors.appColor,} : {} )]} onPress={()=>this.onSelectPaymentMethod(pm, btnText)}>
                            { null != payments[pm]['icon'] && payments[pm]['icon'] != '' && <View style={styles.ckPaymentIconWrap}>
                                <Image
                                    style={[styles.ckPaymentIcon,{width:60}]}
                                    source={ { uri: payments[pm]['icon'] } }
                                    resizeMode="contain"
                                />
                            </View> }
                            { null != payments[pm]['title'] && <TextHeavy style={[styles.ckPaymentTitle,{color: apColors.tText,}]}>{payments[pm]['title']}</TextHeavy> }

                            { pmMethod === pm && <View style={styles.paymentVerified}><CheckMarkSvg color={apColors.appColor}/></View> }

                        </TouchableOpacity>

                        { pmMethod === pm && null != payments[pm]['desc'] && payments[pm]['desc'] != '' && <ForHTML  source={{ html: payments[pm]['desc'] }}
                        // html={payments[pm]['desc']}
                            // containerStyle={{paddingHorizontal: 15, marginBottom: 20, backgroundColor: apColors.secondBg, borderRadius: 4}} 
                            baseFontStyle={{paddingHorizontal: 15, marginBottom: 20, backgroundColor: apColors.secondBg, borderRadius: 4,fontFamily: regularFontFamily,fontSize: 15,color: apColors.pText}}
                        /> }
                    </View>
                )
            }
        }
        return <View style={styles.ckPaymentsInner}>{pmJsx}</View>
    }
    render(){
        // console.log('CheckoutScreen -> render');
        // console.log(this.props.booking);
        const _self = this
        const {apColors} = this.props;
        const {notes,focus, coupon_code,payBtnText,waitingPayment,comSubmitted,paymentCompleted,customPMForm} = this.state
        const {submitting,submitted,isSuccess,url,bk_status} = this.props.booking;
        const {price_based} = this.props.booking.datas
        let notesFocus = {},submittedBtn = {}, couponFocus = {};
        if( focus == 'notes' ) notesFocus = {borderColor: apColors.appColor,}
        if( focus == 'coupon' ) couponFocus = {borderColor: apColors.appColor,}
        if( submitting|| submitted || comSubmitted || waitingPayment || paymentCompleted ) submittedBtn = {opacity: 0.2}

        let popTitle = translate(price_based, 'ck_ok'), // translate('ck_ok'),
            popMsg = translate(price_based, 'ck_ok_message'); // translate('ck_ok_message');
        if( !isSuccess && paymentCompleted == false ){
            popTitle = translate('ck_wrong');
            popMsg = translate('ck_wrong_message');
        }

        // let cFormHtml = '';
        // if( waitingPayment && customPMForm ){
        //     const {scform_url,scform_data,scform_submit} = this.props.booking.submittedData
        //     cFormHtml += '<form id="cusFormID" method="post" action="'+scform_url+'">';
        //     if(scform_data instanceof Object){
        //         for(let fname in scform_data){
        //             cFormHtml += '<input type="text" name="'+fname+'" value="'+scform_data[fname]+'"/>';
        //         }
        //     }
        //     cFormHtml += '<input type="submit" name="submit" value="Confirm" />';
        //     cFormHtml += '</form>';

        // }

                    // { waitingPayment && customPMForm && cFormHtml != '' && <Modal
                    //     style={{marginTop: 100,padding: 100,backgroundColor: '#ccc'}}
                    //     containerStyle={{ marginTop: 100,padding: 100,backgroundColor: '#ddd' }}
                    //     transparent={true}
                    //     animationType={'fade'} // 'none', 'slide', 'fade'
                    //     visible={true}
                    //     onRequestClose={() => {console.log('close modal')}}>
                    //     <WebView originWhitelist={['*']} source={{ html: cFormHtml }} onNavigationStateChange={(st)=>console.log(st)}/>
                    // </Modal> }

        return(
            <SafeAreaInsetsContext.Consumer style={{flex: 1}}>
                {insets => <View style={[styles.container,{backgroundColor: apColors.appBg,paddingBottom: insets.bottom,paddingLeft: insets.left,paddingRight: insets.right}]}>
                    
                    { submitting === true && <Loader loading={true}/> }

                    { waitingPayment && <View style={[styles.waitingPayment,{backgroundColor: apColors.modalBg,}]}>
                        <View style={styles.activityIndicatorWrapper}>
                            <ActivityIndicator animating={true} color="#FFF"/>
                        </View>
                        <TextHeavy style={{fontSize: 17,marginTop: 5,color:'#FFF'}}>{translate('checkout','waiting_payment')}</TextHeavy>
                        
                        <BtnLink style={{ marginTop: 15}} textStyle={{fontSize:15,color:'#FFF',textAlign:'center',textDecorationLine: 'underline'}} onPress={() => _self.setState({waitingPayment: false,comSubmitted:false}) }>{translate('btn_close')}</BtnLink>
                        
                        <BtnLarge style={{ marginTop: 0}} onPress={() => _self._onGoBookingPress() }>{translate('ck_go_booking')}</BtnLarge>

                    </View> }


                    

                    { false == waitingPayment && <ErrorSuccessPopup isSuccess={comSubmitted && ( isSuccess && submitted || paymentCompleted) } isError={comSubmitted && !isSuccess && submitted} title={popTitle} message={popMsg} successButton={this.successButton()} errorButton={this.errorButton()}/> }
                    <ScrollView style={[styles.scrollView,{backgroundColor: apColors.secondBg,}]} contentContainerStyle={styles.contentContainer}>
                        <View style={[styles.ckInner,{backgroundColor: apColors.appBg,shadowColor: apColors.shadowCl,}]}>
                            <View style={styles.ckDetails}>
                                <View style={styles.ckAddInfos}>
                                    <TextHeavy style={styles.ckTitle}>{translate('ck_notes')}</TextHeavy>
                                    
                                    <TextInput 
                                        multiline={true}
                                        placeholder={translate('ck_notes_plh')}
                                        style={[styles.textInput,{borderColor: apColors.separator,color: apColors.pText,},notesFocus]}
                                        onChangeText={this.onChangeNote}
                                        onFocus={e=>this.onFucusInput('notes')}
                                        returnKeyType='done'
                                        // onSubmitEditing = {this.nextField}
                                        autoCorrect={false}
                                        underlineColorAndroid={'transparent'}
                                        keyboardType="default"
                                        value={notes}
                                    />

                                    

                                </View>
                                <View style={styles.ckPayments}>
                                    
                                    <TextHeavy style={styles.ckTitle}>{translate('ck_payments')}</TextHeavy>

                                    {this._renderPayments()}

                                    <TextInput 
                                        multiline={false}
                                        placeholder={translate('ck_coupon_plh')}
                                        style={[styles.textInput,{borderColor: apColors.separator,color: apColors.pText,marginTop: 20,minHeight: 50},couponFocus]}
                                        onChangeText={this.onChangeCoupon}
                                        onFocus={e=>this.onFucusInput('coupon')}
                                        returnKeyType='done'
                                        // onSubmitEditing = {this.nextField}
                                        autoCorrect={false}
                                        underlineColorAndroid={'transparent'}
                                        keyboardType="default"
                                        value={coupon_code}
                                    />
                                </View>
                            </View>
                            
                        </View>
                    </ScrollView>
                    <View style={[styles.bookingFooter,{borderTopColor: apColors.separator,}]}>
                        <BtnFull disabled={submitting||submitted||comSubmitted||waitingPayment||paymentCompleted} style={submittedBtn} onPress={()=>this._onSubmit({})}>{payBtnText}</BtnFull>
                    </View>

                    

                </View>}
            </SafeAreaInsetsContext.Consumer>
        );
    }
}

//Map the redux state to your props.
const mapStateToProps = state => ({
    booking : state.booking,
    user : state.user,

    listing : state.listing,
})

//Map your action creators to your props.
const mapDispatchToProps = {
    submitCheckout,
    checkoutExit
}

//export your list as a default export 
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutScreen);



const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: 20,
        // paddingHorizontal: 15,
        
    },
    scrollView: {
        flex: 1,
        
    },
    contentContainer: {
        // padding: 15,
        // flex: 1,
        paddingBottom: 15,
    },

    bookingFooter: {
        borderTopWidth: 1,
        
        paddingHorizontal: 30,
        // justifyContent: 'space-between',
        paddingVertical: 15,

        // backgroundColor: 'yellow',
    },

    ckInner: {
        paddingHorizontal: 15,
        paddingVertical: 20,
        
        // borderRadius: 8,

        
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 10,  
        elevation: 1,

        minHeight: 200,
        justifyContent: 'space-between',
    },

    ckDetails: {

    },
    ckAddInfos: {
        marginBottom: 20,
    },
    ckPayments: {

    },
    ckPaymentsInner: {

    },
    ckTitle: {
        marginBottom: 15,
        fontSize: 15,
    },
    textInput:{
        minHeight: 100,
        // marginTop: 5,
        // paddingVertical: 5,
        
        borderWidth: 1,
        borderStyle: 'solid',
        fontSize: 15,
        
        fontFamily: mediumFontFamily,
        borderRadius: 5,
        padding: 10,
    },
    ckPaymentWrap: {
        padding: 10,
        

        borderWidth: 1,
        

        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        borderRadius: 5,
        marginBottom: 10,
        minHeight: 50,
    },
    ckPaymentIconWrap: {
        width: 60,
        marginRight: 15,
    },
    ckPaymentIcon: {
        maxWidth: 60,
        height: 30,
        // marginRight: 15,
        // alignSelf:'flex-start',
    },
    ckPaymentTitle: {
        
        fontSize: 15,
    },
    paymentVerified: {
        width: 18,
        height: 18,
        position: 'absolute',
        right: 10,
        
        justifyContent: 'center',
        alignItems: 'center',
    },
    // backgroundColor: '#F8F8F8',
    activityIndicatorWrapper: {
        // backgroundColor: '#FFFFFF',
        height: 50,
        width: 50,
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    waitingPayment: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 5,

        // flex: 1,
        alignItems: 'center',
        // flexDirection: 'column',
        justifyContent: 'center',
         // '#00000040'
    },
    // modalBackground: {
    //     // flex: 1,
    //     // alignItems: 'center',
    //     // flexDirection: 'column',
    //     // justifyContent: 'space-around',
    //     padding: 100,
    // },
});
