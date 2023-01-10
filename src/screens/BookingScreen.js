import React from 'react';
import { 
    ScrollView, 
    StyleSheet,
    View ,
    Text,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';

import moment from 'moment';



import {translate,dateFormat,dateTimeFormat} from "../helpers/i18n";
import {fomartCurrOut,formatFloat,formatInt} from '../helpers/currency';

import Listing from '../components/booking/Listing';
import TextMedium from '../components/ui/TextMedium';
import TextHeavy from '../components/ui/TextHeavy';
import TextRegular from '../components/ui/TextRegular';

import BtnFull from '../components/ui/BtnFull';
import Rooms from '../components/booking/Rooms';
import Slots from '../components/booking/Slots';
import Tickets from '../components/booking/Tickets';
import Menus from '../components/booking/Menus';
import Quantity from '../components/booking/Quantity';
import Person from '../components/booking/Person';
import PersonSlots from '../components/booking/PersonSlots';
import TimeSlots from '../components/booking/TimeSlots';


import LServices from '../components/booking/LServices';
// for redux
import { processToCheckout } from '../actions/booking';
import { connect } from 'react-redux';

class BookingScreen extends React.Component{
    constructor(props){
        super(props)
        this.state = { 
            rooms: [], 
            rooms_old_data: [],
            tour_slots: [], 
            tickets: [], 
            book_services: [], 
            bk_menus: [], 
            bk_qtts: 0,
            adults: 0,
            children: 0,
            infants: 0,
            // hour/slot person
            person_slots: [],
            // hour/slot
            time_slots: [],
        }
        
    }
    _onSelectRooms(rooms){
        let parseRooms = []
        const {dateTwo} = this.props.booking
        let checkout = '';
        if( null != dateTwo.dateString && dateTwo.dateString != '' ) checkout = dateTwo.dateString
        if( Array.isArray(rooms) && rooms.length > 0 ){
            rooms.forEach(room => {
                const {price, dPrices} = room;
                let rObj = {
                    ID: room.ID,
                    title: room.title,
                    quantity: formatInt(room.qtt)
                };
                let rDates = {};
                const bookedAPrice = formatFloat(price);
                for ( const bdate in dPrices ) {
                    if( dPrices[bdate]['iso'] != checkout ){ // for night do not include checkout
                        const   bdPrice = formatFloat( dPrices[bdate]['price'] );
                        if( bdPrice > 0 ){
                            rDates[dPrices[bdate]['iso']] = bdPrice;
                        }else{
                            rDates[dPrices[bdate]['iso']] = bookedAPrice;
                        }

                    }
                }
                rObj.rdates = rDates;

                parseRooms.push(rObj)
            });
        }
        this.setState({rooms, rooms_old_data: parseRooms})
    }
    _onSelectSlots(slots){
        this.setState({tour_slots: slots})
    }
    _onSelectTickets(items){
        this.setState({tickets: items})
    }
    _onSelectItems(items, name){
        this.setState({[name]: items})
    }
    _onSelectQtts(qtts){
        this.setState({bk_qtts: qtts})
    }
    _onSelectPersons(persons){
        this.setState(persons)
    }
    getNights(inDay = false){
        const {dateOne,dateTwo} = this.props.booking
        let dayOneStamp = 0, dayTwoStamp = 0
        if( null != dateOne.timestamp && dateOne.timestamp > 0 ) dayOneStamp = dateOne.timestamp;
        if( null != dateTwo.timestamp && dateTwo.timestamp > 0 ) dayTwoStamp = dateTwo.timestamp;
        if( dayTwoStamp < dayOneStamp ){
            if( inDay === true ) return 1;
            return 0;
        }
        let diff = Math.floor((dayTwoStamp - dayOneStamp) / (1000*60*60*24))
        if( inDay === true ) ++diff;

        return diff;
    }
    getSubtotal(){
        const {
            rooms_old_data,
            tour_slots,
            tickets,
            bk_menus, 
            book_services,
            bk_qtts,
            adults,
            children,
            infants,
            person_slots,
            time_slots,
        } = this.state
        const {
            price_based, 
        } = this.props.listing

        const {dateOne} = this.props.booking
        let subtotal = 0;
        if( Array.isArray(rooms_old_data) && rooms_old_data.length > 0 ){
            rooms_old_data.forEach(room => {
                if( null != room.rdates && Object.keys(room.rdates).length > 0 ){
                    for ( const bdate in room.rdates ) {
                        subtotal += room.quantity * room.rdates[bdate];
                    }
                }
            });
        }
                    

        // if( Array.isArray(rooms) && rooms.length > 0 ){
        //     const nights = this.getNights(false)
        //     rooms.forEach(room => {
        //         subtotal += formatInt(room.qtt) * parseFloat(room.price) * nights;
        //     });
        // }

        // for price based day
        
        let lprice =  dateOne.price , 
            children_price = dateOne.children_price , 
            infant_price =  dateOne.infant_price ;
        if( Array.isArray(tour_slots) && tour_slots.length > 0 ){
            tour_slots.forEach(slot => {
                subtotal += formatInt(slot.quantity) * lprice;
            });
        }

        // for per listing
        if( bk_qtts && formatInt(bk_qtts) > 0 ){
            subtotal += formatInt(bk_qtts) * lprice;
        }

        // for per person
        if( price_based == 'per_person' ){
            subtotal += formatInt(adults) * lprice;
            subtotal += formatInt(children) * children_price;
            subtotal += formatInt(infants) * infant_price;
        }

        // for hour/slot person
        if( price_based == 'hour_person' && Array.isArray(person_slots) && person_slots.length > 0 ){
            person_slots.forEach(slt => {
                subtotal += formatInt(slt.adults) * lprice;
                subtotal += formatInt(slt.children) * children_price;
                subtotal += formatInt(slt.infants) * infant_price;
            });
        }

        // for hour/slot
        if( price_based == 'per_hour' && Array.isArray(time_slots) && time_slots.length > 0 ){
            time_slots.forEach(slt => {
                subtotal += formatInt(slt.quantity) * slt.price;
            });
        }
        
        // for event
        if( Array.isArray(tickets) && tickets.length > 0 ){
            tickets.forEach(evt => {
                subtotal += formatInt(evt.quantity) * evt.price;
            });
        }
        // for menus
        if( Array.isArray(bk_menus) && bk_menus.length > 0 ){
            bk_menus.forEach(itm => {
                subtotal += formatInt(itm.quantity) * itm.price;
            });
        }
        // for additional services
        if( Array.isArray(book_services) && book_services.length > 0 ){
            book_services.forEach(itm => {
                subtotal += formatInt(itm.quantity) * itm.price;
            });
        }

        return subtotal;
    }
    getTaxes(subtotal){
        const {vat_tax} = this.props.listing
        return subtotal * formatFloat(vat_tax)/100
    }
    getAddFees(subtotal){
        const {add_fees} = this.props.listing
        return subtotal * formatFloat(add_fees)/100
    }
    getTaxFeeTotal(){
        const {tax_with_fees} = this.props.listing
        const subtotal = this.getSubtotal()
        const fees = this.getAddFees(subtotal)
        // subtotal with fees for vat ?
        if( null != tax_with_fees && tax_with_fees === true ){
            var taxes = this.getTaxes( subtotal + fees )
        }else{
            var taxes = this.getTaxes( subtotal )
        }

        
        const total = subtotal + taxes + fees;

        return {
            subtotal,
            taxes,
            fees,
            total
        }
    }
    getBookingDatas(){
        const {ID,price_based} = this.props.listing
        const {
            rooms_old_data,
            tour_slots,
            tickets,
            bk_menus,
            book_services,
            bk_qtts,
            adults,
            children,
            infants,
            person_slots,
            time_slots,
        } = this.state
        
        const {dateOne,dateTwo} = this.props.booking
        let ckInOut = {};
        if( null != dateOne.dateString && dateOne.dateString != '' ) ckInOut.checkin = dateOne.dateString
        if( null != dateTwo.dateString && dateTwo.dateString != '' ) ckInOut.checkout = dateTwo.dateString

        const taxesFeesTotal = this.getTaxFeeTotal();

        return {
            listing_id: ID, 
            ...ckInOut,
            price_based,
            price: dateOne.price , 
            children_price : dateOne.children_price , 
            infant_price : dateOne.infant_price ,

            bk_qtts,
            // per person
            adults,
            children,
            infants,
            // hour/slot person
            person_slots,
            // hour/slot
            time_slots,
            // per night
            rooms_old_data,
            tour_slots,
            tickets,
            bk_menus,
            book_services,

            ...taxesFeesTotal
        }
    }
    _onSubmit(){
        const {isLoggedIn} = this.props.user
        if( null != isLoggedIn && isLoggedIn ){
            this.props.processToCheckout(this.getBookingDatas())
            this.props.navigation.navigate('Checkout')
        }else{
            this.props.navigation.navigate('SignIn',{backRoute: 'Booking',loggedInRoute: 'Booking'});
        }
    }
    render(){
        // const windowHeight = Dimensions.get('window').height;
        // const botHeight = 230;
        const {listing,booking,apColors} = this.props
        const {dateOne,dateTwo} = booking
        let checkin = '', checkout = '',
            start_time = '', end_date = '';
        // per person
        let {guests} = listing;
        if( null != dateOne.dateString && dateOne.dateString != '' ) checkin = dateOne.dateString
        if( null != dateTwo.dateString && dateTwo.dateString != '' ) checkout = dateTwo.dateString
        
        if( null != dateOne.metas ){
            var {slots,ev_tickets,person_slots,ltime_slots} = dateOne.metas
            if( null != dateOne.metas.start_time ) start_time = dateOne.metas.start_time;
            if( null != dateOne.metas.end_date ) end_date = dateOne.metas.end_date;
            if( null != dateOne.metas.guests ) guests = dateOne.metas.guests;
        }else{
            var slots = null, ev_tickets = null, person_slots = null, ltime_slots = null;
        }


        const {price,children_price,infant_price} = dateOne

        const {
            price_based, 
            evt_tickets, 
            lmenus, 
            lservices, 
            rooms,
            quantities, // for per listing available

            // check if allow free booking
            allow_free_booking,
            free_hide_services,
        } = listing

        const {subtotal,taxes,fees,total} = this.getTaxFeeTotal();

        const nights = this.getNights(false)

        let submitting = false, 
            booking_enable = true,
            submittedBtn = {};
        if( allow_free_booking == false && subtotal <= 0 ) booking_enable = false;

        if( submitting || booking_enable == false ) submittedBtn = {opacity: 0.2}

        const aBCardTitleStyle = {color: apColors.addressText,}
        const aBookingCardStyle = {
            backgroundColor: apColors.appBg,

            borderTopColor: apColors.separator,

            borderBottomColor: apColors.separator,

            shadowColor: apColors.shadowCl,
        }
        const aDatesInOutStyle = {color: apColors.tText,}
        return(
            <SafeAreaInsetsContext.Consumer style={{flex: 1}}>
                {insets => <View style={[styles.container,{backgroundColor: apColors.appBg,paddingBottom: insets.bottom,paddingLeft: insets.left,paddingRight: insets.right}]}>
                    <ScrollView style={[styles.scrollView,{backgroundColor: apColors.secondBg,}]} contentContainerStyle={styles.contentContainer}>
                        <View style={[styles.bookingDetails,{backgroundColor: apColors.appBg,borderBottomColor: apColors.separator,shadowColor: apColors.shadowCl,}]}>
                            <Listing data={listing} price={dateOne.price} priceBased={price_based} style={styles.listing}/>
                        </View>

                        <View style={[styles.bookingCard,aBookingCardStyle,{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-end',flexWrap:'wrap'}]}>
                            <View style={styles.datesInOutWrap}>
                                <TextRegular style={[styles.datesInOutTitle,{color: apColors.pText,}]}>{translate(price_based, 'bk_checkin')}</TextRegular>
                                <TextHeavy style={[styles.datesInOut,aDatesInOutStyle]}>{moment(checkin).format('ddd, MMM DD, YYYY')}</TextHeavy>

                                { checkout !== '' && <><TextRegular style={[styles.datesInOutTitle,{color: apColors.pText,marginTop:10}]}>{translate(price_based, 'bk_checkout')}</TextRegular><TextHeavy style={styles.datesInOut}>{moment(checkout).format('ddd, MMM DD, YYYY')}</TextHeavy></>}
                            </View>
                            { nights > 0 && <View style={styles.datesDaysNights}>
                                <TextHeavy style={[styles.datesInOut,aDatesInOutStyle]}>{translate(price_based, 'bk_days_nights', {count: nights} )}</TextHeavy>
                            </View>}

                            { start_time != '' && end_date != '' && <View style={styles.evtTimes}>
                                <TextMedium style={[styles.evtTimeTxt,{color: apColors.tText,}]}>{ translate('evt_start','',{ time: dateTimeFormat(`${checkin} ${start_time}`) }) }</TextMedium>
                                <TextMedium style={[styles.evtTimeTxt,{color: apColors.tText,}]}>{ translate('evt_end','',{ time: dateTimeFormat(end_date) }) }</TextMedium>
                            </View> }
                        </View>
                        
                        { price_based == 'listing' && <View style={[styles.bookingCard,aBookingCardStyle,{marginTop: 25}]}>
                            <Quantity available={quantities} onSelectQtts={qtt => this._onSelectQtts(qtt) } priceBased={price_based} prices={{price,children_price,infant_price}} apColors={apColors}/>
                        </View> }

                        { price_based == 'per_person' && guests > 0 && <>
                            <TextHeavy style={[styles.bCardTitle,aBCardTitleStyle]}>{translate('bk_persons')}</TextHeavy>
                            <View style={[styles.bookingCard,aBookingCardStyle,{marginTop: 5}]}>
                                <Person available={guests} onSelectPersons={pers => this._onSelectPersons(pers) } priceBased={price_based} prices={{price,children_price,infant_price}} apColors={apColors}/>
                            </View>
                        </> }

                        { price_based == 'hour_person' && <>
                            <TextHeavy style={[styles.bCardTitle,aBCardTitleStyle]}>{translate('bk_persons')}</TextHeavy>
                            <View style={[styles.bookingCard,aBookingCardStyle,{marginTop: 5}]}>
                                <PersonSlots data={person_slots} onSelectItems={ its => this._onSelectItems(its,'person_slots') } priceBased={price_based} prices={{price,children_price,infant_price}} apColors={apColors}/>
                            </View>
                        </> }

                        { price_based == 'per_hour' && null != ltime_slots && Array.isArray(ltime_slots) && ltime_slots.length > 0 && <>
                            <TextHeavy style={[styles.bCardTitle,aBCardTitleStyle]}>{translate('bk_slots')}</TextHeavy>
                            <View style={[styles.bookingCard,aBookingCardStyle,{marginTop: 5}]}>
                                <TimeSlots slots={ltime_slots} onSelectItems={its => this._onSelectItems(its,'time_slots') } priceBased={price_based} prices={{price,children_price,infant_price}} apColors={apColors}/>
                            </View>
                        </> }

                        { null != rooms && Array.isArray(rooms) && rooms.length > 0 && <>
                            <TextHeavy style={[styles.bCardTitle,aBCardTitleStyle]}>{translate('bk_rooms')}</TextHeavy>
                            <View style={[styles.bookingCard,aBookingCardStyle,{marginTop: 5}]}>
                                <Rooms checkin={checkin} checkout={checkout} lid={listing.ID} onSelectRooms={rms=>this._onSelectRooms(rms)} priceBased={price_based} apColors={apColors}/>
                            </View>
                        </>}
                        
                        { null != slots && Array.isArray(slots) && slots.length > 0 && <>
                            <TextHeavy style={[styles.bCardTitle,aBCardTitleStyle]}>{translate('bk_slots')}</TextHeavy>
                            <View style={[styles.bookingCard,aBookingCardStyle,{marginTop: 5}]}>
                                <Slots slots={slots} onSelectSlots={sls=>this._onSelectSlots(sls)} priceBased={price_based} prices={{price,children_price,infant_price}} apColors={apColors}/>
                            </View>
                        </> }
                        
                        { price_based == 'event_single' && null != evt_tickets && Array.isArray(evt_tickets) && evt_tickets.length > 0 && <>
                            <TextHeavy style={[styles.bCardTitle,aBCardTitleStyle]}>{translate('bk_tickets')}</TextHeavy>
                            <View style={[styles.bookingCard,aBookingCardStyle,{marginTop: 5}]}>
                                <Tickets data={evt_tickets} onSelectTickets={tks => this._onSelectTickets(tks) } priceBased={price_based} prices={{price,children_price,infant_price}} apColors={apColors}/>
                            </View>
                        </> }

                        { null != ev_tickets && Array.isArray(ev_tickets) && ev_tickets.length > 0 && <>
                            <TextHeavy style={[styles.bCardTitle,aBCardTitleStyle]}>{translate('bk_tickets')}</TextHeavy>
                            <View style={[styles.bookingCard,aBookingCardStyle,{marginTop: 5}]}>
                                <Tickets data={ev_tickets} onSelectTickets={tks => this._onSelectTickets(tks) } priceBased={price_based} prices={{price,children_price,infant_price}} apColors={apColors}/>
                            </View>
                        </> }

                        { null != lmenus && Array.isArray(lmenus) && lmenus.length > 0 && <>
                            <TextHeavy style={[styles.bCardTitle,aBCardTitleStyle]}>{translate('bk_menus')}</TextHeavy>
                            <View style={[styles.bookingCard,aBookingCardStyle,{marginTop: 5}]}>
                                <Menus data={lmenus} onSelectTickets={ its => this._onSelectItems(its,'bk_menus') } priceBased={price_based} prices={{price,children_price,infant_price}} apColors={apColors}/>
                            </View>
                        </> }
                        

                        { ( free_hide_services == false || free_hide_services && subtotal > 0 ) && null != lservices && Array.isArray(lservices) && lservices.length > 0 && <>
                            <TextHeavy style={[styles.bCardTitle,aBCardTitleStyle]}>{translate(price_based, 'bk_addservices')}</TextHeavy>
                            <View style={[styles.bookingCard,aBookingCardStyle,{marginTop: 5}]}>
                                <LServices data={lservices} onSelectItems={its => this._onSelectItems(its,'book_services') } priceBased={price_based} apColors={apColors}/>
                            </View>
                        </> }
                        
                    </ScrollView>
                    <View style={[styles.bookingFooter,{borderTopColor: apColors.separator,}]}>
                        <View style={styles.bookingSubtotalWrap}>
                            <View style={styles.bookingSubtotalItem}>
                                <TextRegular style={[styles.bookingSubtotalTitle,{color: apColors.tText,}]}>{translate(price_based, 'bk_subtotal')}</TextRegular>
                                <TextMedium style={[styles.datesInOut,aDatesInOutStyle]}>{fomartCurrOut(subtotal)}</TextMedium>
                            </View>
                            <View style={styles.bookingSubtotalItem}>
                                <TextRegular style={[styles.bookingSubtotalTitle,{color: apColors.tText,}]}>{translate(price_based, 'bk_tax')}</TextRegular>
                                <TextMedium style={[styles.datesInOut,aDatesInOutStyle]}>{fomartCurrOut(taxes)}</TextMedium>
                            </View>
                            { fees > 0 && <View style={styles.bookingSubtotalItem}>
                                <TextRegular style={[styles.bookingSubtotalTitle,{color: apColors.tText,}]}>{translate(price_based, 'bk_fees')}</TextRegular>
                                <TextMedium style={[styles.datesInOut,aDatesInOutStyle]}>{fomartCurrOut(fees)}</TextMedium>
                            </View> }
                            <View style={styles.bookingSubtotalItem}>
                                <TextHeavy style={[styles.bookingSubtotalTitle,{color: apColors.tText,}]}>{translate(price_based, 'bk_total')}</TextHeavy>
                                <TextHeavy style={[styles.datesInOut,aDatesInOutStyle]}>{fomartCurrOut(total)}</TextHeavy>
                            </View>
                        </View>
                        <View style={[styles.submitBtnWrap,{borderTopColor: apColors.separator,}]}>
                            <BtnFull disabled={( submitting || booking_enable == false )} style={submittedBtn} onPress={()=>this._onSubmit()}>{translate(price_based, 'btn_bk_book_now')}</BtnFull>
                        </View>
                    </View>
                </View>}
            </SafeAreaInsetsContext.Consumer>
        );
    }
}

//Map the redux state to your props.
const mapStateToProps = state => ({
    listing: state.listing,
    booking: state.booking,
    user: state.user,
})

//Map your action creators to your props.
const mapDispatchToProps = {
    processToCheckout
}

//export your list as a default export 
export default connect(mapStateToProps, mapDispatchToProps)(BookingScreen);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: 15,
        
    },
    scrollView: {
        flex: 1,
        
    },
    contentContainer: {
        // padding: 15,
        // flex: 1,
        paddingBottom: 15,
    },
    bookingDetails: {
        // borderRadius: 8,
        
        borderBottomWidth: 1,
        

        
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 10,  
        elevation: 1,
        // padding: 15,

        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    listing: {
        // backgroundColor: '#F8F8F8',
        // padding: 15,
    },
    bookingCard: {
        
        borderTopWidth: 1,
        
        borderBottomWidth: 1,
        

        
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 10,  
        elevation: 1,

        marginTop: 15,
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    datesInOutWrap: {

    },
    datesDaysNights: {

    },
    datesInOutTitle: {
        fontSize: 15,
        
        marginBottom: 2,
    },
    datesInOut: {
        fontSize: 15,
        
    },
    evtTimes: {
        width: '100%',
        marginTop: 5,
    },
    evtTimeTxt:{
        fontSize: 13,
        
        marginTop: 2,
    },
    bookingFooter: {
        borderTopWidth: 1,
        
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        paddingBottom: 15,

        // backgroundColor: 'yellow',
    },
    bookingSubtotalWrap: {
        // borderBottomWidth: 1,
        // borderBottomColor: '#EAECEF',
        paddingBottom: 15,
    },
    bookingSubtotalItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    bookingSubtotalTitle: {
        fontSize: 15,
        
    },
    submitBtnWrap: {
        paddingTop: 15,
        borderTopWidth: 1,
        

        marginHorizontal: 15,
    },
    // submitBtn: {
    //     backgroundColor: apColors.appColor,
    //     height: 44,
    //     borderRadius: 8,
    //     justifyContent: 'center',
    //     // marginTop: 60,
    //     // alignSelf: 'flex-end',
    //     marginLeft: 15,
    //     marginRight: 15,
    // },
    submitBtnText: {
        color: '#fff',
        fontSize: 15,
        textAlign: 'center',

    },
    bCardTitle: {
        fontSize: 17,
        lineHeight: 23,
        // color: '#1E2432',
        // paddingBottom: 15,
        
        marginLeft: 15,
        marginTop: 25,
    }
});
