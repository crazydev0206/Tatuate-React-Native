import React from 'react';
import { 
    View,
    Image,
    // TextInput,
    Alert,
    // FlatList,
    // TouchableOpacity,
    ScrollView, 
    StyleSheet,
    Keyboard,
} from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import axios from 'axios';



// import {filterByLoc} from '../../helpers/store';
import {translate,dateFormat} from "../../helpers/i18n";
// import {validateEmail} from "../../helpers/helpers";
import {fomartCurrOut} from '../../helpers/currency';



import BtnFull from '../../components/ui/BtnFull';
import BtnLarge from '../../components/ui/BtnLarge';


import TextRegular from '../../components/ui/TextRegular';
import TextMedium from '../../components/ui/TextMedium';
import TextHeavy from '../../components/ui/TextHeavy';

import Loader from '../../components/Loader';
import SuccessPopup from '../../components/SuccessPopup';

import { cancelBooking } from '../../actions/booking';
import { connect } from 'react-redux';

class SBookingScreen extends React.Component{
    constructor(props){
        super(props)
        this.state = { loading: false, post: {}, comSubmitted: false }
    }
    componentDidMount(){
        const id = this.props.route.params?.id ?? '';//   this.props.navigation.getParam('id', '')
        this.setState({loading:true})

        axios.get(`/booking/${id}`).then(res => {
            //Set the results to the people array.
            this.setState({post: res.data, loading: false})
        }).catch(err => {
            this.setState({post: {}, loading: false})
        } );
    }
    _renderQtts(qtts, price){
        const {apColors} = this.props;
        return (
            
            <View style={[styles.bkWItem,{backgroundColor: apColors.appBg,borderColor: apColors.separator,}]}>
                <View style={styles.roomTop}>
                    <TextMedium style={styles.titleText}>{translate('sbooking','quantity')}</TextMedium>
                    <TextMedium style={styles.titleText}>{fomartCurrOut(price)} x {qtts}</TextMedium>
                </View>
            </View>

        )
    }
    _renderPersons(){
        const {
            price,
            children_price,
            infant_price,
            // per person
            adults,
            children,
            infants,
        } = this.state.post;
        const {apColors} = this.props;
        return (
            <>
                <View style={styles.bkDetailsHead}><TextMedium style={styles.titleText}>{translate('sbooking','persons')}</TextMedium></View>
                <View style={[styles.bkWItem,{backgroundColor: apColors.appBg,borderColor: apColors.separator,}]}>
                    { adults > 0 && <View style={styles.roomTop}>
                        <TextMedium style={styles.titleText}>{translate('sbooking','adults')}</TextMedium>
                        <TextMedium style={styles.titleText}>{fomartCurrOut(price)} x {adults}</TextMedium>
                    </View> }
                    { children > 0 && <View style={styles.roomTop}>
                        <TextMedium style={styles.titleText}>{translate('sbooking','children')}</TextMedium>
                        <TextMedium style={styles.titleText}>{fomartCurrOut(children_price)} x {children}</TextMedium>
                    </View> }
                    { infants > 0 && <View style={styles.roomTop}>
                        <TextMedium style={styles.titleText}>{translate('sbooking','infants')}</TextMedium>
                        <TextMedium style={styles.titleText}>{fomartCurrOut(infant_price)} x {infants}</TextMedium>
                    </View> }
                </View>
            </>
        )
    }
    _renderSlotsPersons(){
        const {
            price,
            children_price,
            infant_price,
            // hour/slot person
            person_slots,
        } = this.state.post;
        const {apColors} = this.props;
        return (
            <>
                <View style={styles.bkDetailsHead}><TextMedium style={styles.titleText}>{translate('sbooking','slots')}</TextMedium></View>
                { person_slots.map(data => {
                    return (
                        <View key={data._id} style={[styles.bkWItem,{backgroundColor: apColors.appBg,borderColor: apColors.separator,}]}>
                            <View style={[styles.roomTop,{alignItems: 'flex-start',}]}>
                                <TextMedium style={styles.titleText}>{data.title}</TextMedium>
                                <View style={styles.slotPersons}>
                                    <View style={styles.roomTop}>
                                        <TextMedium style={styles.titleText}>{translate('sbooking','adults')}</TextMedium>
                                        <TextMedium style={styles.titleText}>{fomartCurrOut(price)} x {data.adults}</TextMedium>
                                    </View>
                                    <View style={styles.roomTop}>
                                        <TextMedium style={styles.titleText}>{translate('sbooking','children')}</TextMedium>
                                        <TextMedium style={styles.titleText}>{fomartCurrOut(children_price)} x {data.children}</TextMedium>
                                    </View>
                                    <View style={styles.roomTop}>
                                        <TextMedium style={styles.titleText}>{translate('sbooking','infants')}</TextMedium>
                                        <TextMedium style={styles.titleText}>{fomartCurrOut(infant_price)} x {data.infants}</TextMedium>
                                    </View>
                                </View>
                                
                                
                                
                            </View>
                        </View>
                    );
                }) }
            </>
        )
    }

    _renderTimeSlots(){
        const {
            // hour/slot
            time_slots,
        } = this.state.post;
        const {apColors} = this.props;
        return (
            <>
                <View style={styles.bkDetailsHead}><TextMedium style={styles.titleText}>{translate('sbooking','slots')}</TextMedium></View>
                { time_slots.map(data => {
                    return (
                        <View key={data._id} style={[styles.bkWItem,{backgroundColor: apColors.appBg,borderColor: apColors.separator,}]}>
                            <View style={styles.roomTop}>
                                <TextMedium style={styles.titleText}>{data.title}</TextMedium>
                                <TextMedium style={styles.titleText}>{fomartCurrOut(data.price)} x {data.quantity}</TextMedium>
                            </View>
                        </View>
                    );
                }) }
            </>
        )
    }
    
    _renderRooms(rooms){
        const {apColors} = this.props;
        return (
            <>
                <View style={styles.bkDetailsHead}><TextMedium style={styles.titleText}>{translate('sbooking','rooms')}</TextMedium></View>
                { rooms.map(room => {
                    let rDates = [];
                    const {rdates} = room;
                    if( null != rdates && Object.keys(rdates).length > 0 ){
                        for(const d in rdates){
                            rDates.push(
                                <View key={d} style={[styles.roomTop,styles.roomDate]}>
                                    <TextMedium style={styles.titleText}>{dateFormat(d)}</TextMedium>
                                    <TextMedium style={styles.titleText}>{fomartCurrOut(rdates[d])}</TextMedium>
                                </View>
                            )
                        }
                    }
                    return (
                        <View key={room.ID} style={[styles.bkWItem,{backgroundColor: apColors.appBg,borderColor: apColors.separator,}]}>
                            <View style={styles.roomTop}>
                                <TextMedium style={styles.titleText}>{room.title}</TextMedium>
                                <TextMedium style={styles.titleText}>x{room.quantity}</TextMedium>
                            </View>
                            {rDates}
                        </View>);
                }) }
            </>
        )
    }
    _renderTourSlots(datas){
        const {apColors} = this.props;
        return (
            <>
                <View style={styles.bkDetailsHead}><TextMedium style={styles.titleText}>{translate('sbooking','slots')}</TextMedium></View>
                { datas.map(data => {
                    return (
                        <View key={data._id} style={[styles.bkWItem,{backgroundColor: apColors.appBg,borderColor: apColors.separator,}]}>
                            <View style={styles.roomTop}>
                                <TextMedium style={styles.titleText}>{data.title}</TextMedium>
                                <TextMedium style={styles.titleText}>{fomartCurrOut(data.price)} x {data.adults}</TextMedium>
                            </View>
                        </View>
                    );
                }) }
            </>
        )
    }
    _renderTickets(datas){
        const {apColors} = this.props;
        return (
            <>
                <View style={styles.bkDetailsHead}><TextMedium style={styles.titleText}>{translate('sbooking','tickets')}</TextMedium></View>
                { datas.map(data => {
                    return (
                        <View key={data._id} style={[styles.bkWItem,{backgroundColor: apColors.appBg,borderColor: apColors.separator,}]}>
                            <View style={styles.roomTop}>
                                <TextMedium style={styles.titleText}>{data.title}</TextMedium>
                                <TextMedium style={styles.titleText}>{fomartCurrOut(data.price)} x {data.quantity}</TextMedium>
                            </View>
                        </View>
                    );
                }) }
            </>
        )
    }
    _renderBKMenus(datas){
        const {apColors} = this.props;
        return (
            <>
                <View style={styles.bkDetailsHead}><TextMedium style={styles.titleText}>{translate('sbooking','menus')}</TextMedium></View>
                { datas.map(data => {
                    return (
                        <View key={data._id} style={[styles.bkWItem,{backgroundColor: apColors.appBg,borderColor: apColors.separator,}]}>
                            <View style={styles.roomTop}>
                                <TextMedium style={styles.titleText}>{data.title}</TextMedium>
                                <TextMedium style={styles.titleText}>{fomartCurrOut(data.price)} x {data.quantity}</TextMedium>
                            </View>
                        </View>
                    );
                }) }
            </>
        )
    }
    
    
    _renderServices(datas){
        const {apColors} = this.props;
        return (
            <>
                <View style={styles.bkDetailsHead}><TextMedium style={styles.titleText}>{translate('sbooking','addservices')}</TextMedium></View>
                { datas.map(data => {
                    return (
                        <View key={data._id} style={[styles.bkWItem,{backgroundColor: apColors.appBg,borderColor: apColors.separator,}]}>
                            <View style={styles.roomTop}>
                                <TextMedium style={styles.titleText}>{data.title}</TextMedium>
                                <TextMedium style={styles.titleText}>{fomartCurrOut(data.price)} x {data.quantity}</TextMedium>
                            </View>
                        </View>
                    );
                }) }
            </>
        )
    }
    _cancelBooking(){
        const {ID} = this.state.post;
        if( null != ID ){
            this.props.cancelBooking({
                id: ID,
                user_id: this.props.user.ID
            })
            this.setState({comSubmitted: true})
        }
    }
    render(){
        const _self = this;
        const {apColors} = _self.props;
        let {loading,post,comSubmitted} = _self.state
        if( false == loading && ( null == post || typeof post != 'object' || Object.keys(post).length < 1 ) ) return null
        const {submitting,submitted,message} = _self.props.booking;
        
        const {
            ID,

            ltitle,
            thumbnail,
            address,
            author_id,
            author_name,

            subtotal,
            taxes,
            fees,
            total,
            checkin,
            checkout,
            pmmethod,
            price,

            price_based,

            bk_qtts,
            // per person
            // adults,
            // children,
            // infants,

            rooms_old,
            tickets,
            tour_slots,
            bk_menus,

            book_services,

            notes,
        } = post;



        let {
            status
        } = post;
        if( null == status ) status = 'pending';

        let submittedBtn = {}
        if( status != 'pending' || submitting ) submittedBtn = {opacity: 0.2}
            
        
        if( comSubmitted && submitted ) {
            setTimeout(()=> {
                Alert.alert(
                    message != '' ? message : translate('sbooking', 'canceled_message'),
                    '',
                    [
                        {text: translate('btn_ok'), onPress: () => _self.props.navigation.goBack() },
                    ],
                    {cancelable: false},
                );
            }, 1000 );
        }
        return(
            <SafeAreaInsetsContext.Consumer style={{flex: 1}}>
                {insets => <View style={[styles.container,{backgroundColor: apColors.secondBg,paddingBottom: insets.bottom,paddingLeft: insets.left,paddingRight: insets.right}]}>
                    
                    { (loading === true || submitting ) && <Loader loading={true} /> }

                    <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
                        <View style={styles.bkWrap}>

                            <View style={[styles.bkWItem,{backgroundColor: apColors.appBg,borderColor: apColors.separator,},styles.bkTop]}>
                                <View style={styles.bkID}>
                                    {/* <TextMedium style={styles.titleText}>{translate('sbooking','id')}</TextMedium> */}
                                    <TextMedium style={styles.titleText}>#{ID}</TextMedium>
                                    <TextMedium style={[styles.idText,{color: apColors.appColor,}]}>{translate('bookings',status)}</TextMedium>
                                </View>
                                <View style={[styles.bkID,styles.bkProfile,{borderColor: apColors.separator,}]}>
                                    <TextMedium style={styles.titleText}>{author_name}</TextMedium>
                                    <TextHeavy style={styles.titleText}>{translate('sbooking','view_profile')}</TextHeavy>
                                </View>
                            </View>

                            <View style={[styles.bkListingHead,{borderColor: apColors.separator,}]}><TextMedium style={styles.titleText}>{translate('sbooking','listing')}</TextMedium></View>
                            <View style={styles.bkListing}>
                                { null != thumbnail && '' != thumbnail && <Image source={{uri:thumbnail}} style={[styles.cardImage,{borderColor: apColors.separator,}]}/> }
                                <View style={styles.bkListingRight}>
                                    <TextMedium style={styles.lTitle}>{ltitle}</TextMedium>
                                    {null != address && address !== '' && <TextRegular style={[styles.lAddress,{color: apColors.addressText,}]}>{address}</TextRegular>}
                                </View>
                            </View>

                            <View style={[styles.bkWItem,{backgroundColor: apColors.appBg,borderColor: apColors.separator,}]}>
                                <TextRegular style={styles.titleText}>{translate('sbooking','checkin')}</TextRegular>
                                <TextMedium style={styles.titleText}>{dateFormat(checkin)}</TextMedium>

                                { checkout !== '' && <><TextRegular style={[styles.titleText,{marginTop:5}]}>{translate('sbooking','checkout')}</TextRegular>
                                    <TextMedium style={styles.titleText}>{dateFormat(checkout)}</TextMedium></>}

                            </View>

                            { null != bk_qtts && bk_qtts > 0 && _self._renderQtts(bk_qtts, price) }

                            { price_based == 'per_person' && _self._renderPersons() }
                            { price_based == 'hour_person' && _self._renderSlotsPersons() }
                            { price_based == 'per_hour' && _self._renderTimeSlots() }



                            { null != rooms_old && Array.isArray(rooms_old) && rooms_old.length > 0 && _self._renderRooms(rooms_old) }
                            { null != tickets && Array.isArray(tickets) && tickets.length > 0 && _self._renderTickets(tickets) }
                            { null != tour_slots && Array.isArray(tour_slots) && tour_slots.length > 0 && _self._renderTourSlots(tour_slots) }
                            
                            { null != bk_menus && Array.isArray(bk_menus) && bk_menus.length > 0 && _self._renderBKMenus(bk_menus) }

                            { null != book_services && Array.isArray(book_services) && book_services.length > 0 && _self._renderServices(book_services) }

                            <View style={styles.bkSubtotal}>
                                { subtotal != '' && <View style={styles.bkSubItem}>
                                    <TextMedium style={styles.titleText}>{translate('sbooking','subtotal')}</TextMedium>
                                    <TextMedium style={styles.titleText}>{fomartCurrOut(subtotal)}</TextMedium>
                                </View> }
                                { taxes != '' && <View style={styles.bkSubItem}>
                                    <TextMedium style={styles.titleText}>{translate('sbooking','taxes')}</TextMedium>
                                    <TextMedium style={styles.titleText}>{fomartCurrOut(taxes)}</TextMedium>
                                </View> }
                                { fees != '' && <View style={styles.bkSubItem}>
                                    <TextMedium style={styles.titleText}>{translate('sbooking','fees')}</TextMedium>
                                    <TextMedium style={styles.titleText}>{fomartCurrOut(fees)}</TextMedium>
                                </View> }
                            </View>
                            <View style={[styles.bkWItem,{backgroundColor: apColors.appBg,borderColor: apColors.separator,},styles.bkTotal]}>
                                <TextMedium style={styles.titleText}>{translate('sbooking','total')}</TextMedium>
                                <TextHeavy style={[styles.titleText,{color: apColors.appColor,}]}>{fomartCurrOut(total)}</TextHeavy>
                            </View>
                            <View style={[styles.bkWItem,{backgroundColor: apColors.appBg,borderColor: apColors.separator,},styles.bkPayment]}>
                                <TextMedium style={styles.titleText}>{translate('sbooking','payment')}</TextMedium>
                                <TextMedium style={[styles.titleText,{marginTop: 5,color:'#797979'}]}>{pmmethod}</TextMedium>
                            </View>

                            <View style={[styles.bkWItem,{backgroundColor: apColors.appBg,borderColor: apColors.separator,},styles.bkPayment]}>
                                <TextMedium style={styles.titleText}>{translate('sbooking','notes')}</TextMedium>
                                <TextMedium style={[styles.titleText,{marginTop: 5,color:'#797979'}]}>{notes}</TextMedium>
                            </View>

                            <BtnLarge bordered disabled={ status != 'pending'|| submitting } style={[{alignSelf:'center', marginVertical: 10},submittedBtn]} onPress={()=>_self._cancelBooking()}>{translate('sbooking','cancel')}</BtnLarge>
                            
                        </View>
                    </ScrollView>
                    
                    { 1 == 2 && <View style={styles.submitWrap}>
                        <BtnFull disabled={submitting} style={submittedBtn} onPress={()=>_self._onSubmit()}>{translate('claim','send_claim')}</BtnFull>
                    </View> }
                </View>}
            </SafeAreaInsetsContext.Consumer>
        )
    }
}

                            // { nights > 0 && <View style={styles.datesDaysNights}>
                            //     <TextHeavy style={styles.datesInOut}>{translate(price_based, 'bk_days_nights', {count: nights} )}</TextHeavy>
                            // </View>}

                            // { start_time != '' && end_date != '' && <View style={styles.evtTimes}>
                            //     <TextMedium style={styles.evtTimeTxt}>{ translate('evt_start','',{ time: dateTimeFormat(`${checkin} ${start_time}`) }) }</TextMedium>
                            //     <TextMedium style={styles.evtTimeTxt}>{ translate('evt_end','',{ time: dateTimeFormat(end_date) }) }</TextMedium>
                            // </View> }

//Map the redux state to your props.
const mapStateToProps = state => ({
    user: state.user,
    booking: state.booking,
})

//Map your action creators to your props.
const mapDispatchToProps = {
    cancelBooking
}
    
//export your list as a default export 
export default connect(mapStateToProps, mapDispatchToProps)(SBookingScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: 15,
        
    },
    scrollView: {
        flex: 1,
        // backgroundColor: apColors.secondBg,
    },
    contentContainer: {
        paddingVertical: 10,
        // paddingHorizontal: 15,
        
    },
    bkWrap: {

    },
    bkWItem: {
        
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 10,

        borderTopWidth: 1,
        borderBottomWidth: 1,
        
    },
    bkTop: {

    },
    bkID: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    bkProfile: {
        borderTopWidth: 1,
        
        marginTop: 10,
        paddingTop: 10,
    },
    titleText: {
        fontSize: 15,
        lineHeight: 20,
    },
    
    idText: {
        fontSize: 15,
        lineHeight: 20,
        
    },
    headingText: {
        fontSize: 17,
        lineHeight: 23,
    },
    bkListing: {
        flexDirection: 'row',

        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 10,
    },
    bkListingHead: {
        marginBottom: 5,
        paddingBottom: 10,
        marginHorizontal: 15,
        borderBottomWidth: 1,
        
    },

    bkListingRight: {
        flex: 1,
    },
    lTitle: {
        fontSize: 15,
        lineHeight: 20,
    },
    cardImage: {
        // minHeight: 100,
        // borderRadius: 5, 
        // overflow: 'hidden',
        
        marginRight: 10,
        width: 60,
        height: 60,
        borderWidth: 1,
        
    },
    lAddress: {
        fontSize: 11,
        
        lineHeight: 15,
        marginTop: 2,
    },
    bkSubtotal: {
        marginHorizontal: 15,
        // paddingVertical: 10,
        marginBottom: 10,
        // borderTopWidth: 1,
        // borderColor: '#EAECEF',
        // paddingTop: 5,
    },
    bkSubItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 3,
    },
    bkTotal: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    bkPayment: {

    },
    roomTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    slotPersons: {
        flex: 1,
        marginLeft: 15,
    },
    roomDate:{
        paddingLeft: 15,
        paddingTop: 5,
    },
    bkDetailsHead: {
        marginTop: 5,
        marginBottom: 5,
        // paddingBottom: 10,
        marginHorizontal: 15,
    },
    submitWrap: {
        height: 60,
        paddingTop: 5,
        paddingHorizontal: 30,
    },

});
