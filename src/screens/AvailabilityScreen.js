import React from 'react';
import { 
    ScrollView, 
    StyleSheet,
    View ,
    Dimensions
} from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import {translate,dateFormat} from "../helpers/i18n";


import Btn from '../components/ui/Btn';
import TextRegular from '../components/ui/TextRegular';
import TextMedium from '../components/ui/TextMedium';
import TextHeavy from '../components/ui/TextHeavy';
import TextBold from '../components/ui/TextBold';
import Availability from '../components/inners/Availability';

import Slot from '../components/available/Slot';
import Ticket from '../components/available/Ticket';
import TimeSlot from '../components/available/TimeSlot';


// for redux
import { checkInOutSelect } from '../actions/booking';
import { connect } from 'react-redux';

class AvailabilityScreen extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            dateOne: {},
            dateTwo: {},
        }
        

        this._onDatesSelect = this._onDatesSelect.bind(this)
        this._onSelectSlot = this._onSelectSlot.bind(this)

    }
    _onDatesSelect(vals){
        // parse prices
        let {
            price,
            children_price,
            infant_price,
            price_based,
        } = this.props.listing
        let dateOne = vals[0], dateTwo = {};
        // pass prices to selected date
        if( null != dateOne.metas ){
            if( null != dateOne.metas.price ){
                price = dateOne.metas.price
            }else if( null != dateOne.metas.price_adult ){
                price = dateOne.metas.price_adult
            }
            if( null != dateOne.metas.price_children ){
                children_price = dateOne.metas.price_children
            }
            if( null != dateOne.metas.price_infant ){
                infant_price = dateOne.metas.price_infant
            }
        }
        dateOne.price = parseFloat( price )
        dateOne.children_price = parseFloat( children_price )
        dateOne.infant_price = parseFloat( infant_price )

        if( vals.length === 2 ){
            dateTwo = vals[1];
        }
        this.props.checkInOutSelect({dateOne,dateTwo})
        this.setState({dateOne,dateTwo})
    }
    _onSelectSlot(slot){
        this.props.navigation.navigate('Booking')
    }
    render(){
        const {_onCloseDates, listing, apColors} = this.props
        let availability = {}
        if( null != listing && null != listing.availability ) availability = listing.availability
        
        const {dateOne,dateTwo} = this.state
        // let checkin = '', checkout = '';
        
        // const windowHeight = Dimensions.get('window').height;
        let botHeight = 0, hasBotInfos = false,checkin = '', checkout = '';
        if( null != dateOne.dateString && dateOne.dateString !== '' ){
            checkin = dateOne.dateString;
            botHeight = 70;
            hasBotInfos = true;
        } 
        if( null != dateTwo.dateString && dateTwo.dateString !== '' ) checkout = dateTwo.dateString;

        const {price_based} = listing

        // for booking metas - custom
        let slotsJsx = [],ticketsJsx = [];
        if( null != dateOne.metas ){
            const {
                slots,
                ev_tickets,
                person_slots,
                ltime_slots,
            } = dateOne.metas
            // for slots
            if( null != slots && Array.isArray(slots) ){
                slots.forEach(sl=>{
                    slotsJsx.push( <Slot key={sl._id} price={dateOne.price} priceBased={price_based} data={sl} onPress={()=>this._onSelectSlot(sl)}/> )
                })
                botHeight = 200;
                hasBotInfos = true;
            }
            // for tickets
            if( null != ev_tickets && Array.isArray(ev_tickets) ){
                ev_tickets.forEach(it=>{
                    ticketsJsx.push( <Ticket key={it._id} price={dateOne.price} priceBased={price_based} data={it}/> )
                })
                botHeight = 200;
                hasBotInfos = true;
            }
            // for person slot
            if( null != person_slots && Array.isArray(person_slots) ){
                person_slots.forEach(sl=>{
                    slotsJsx.push( <TimeSlot key={sl._id} price={dateOne.price} priceBased={price_based} data={sl} onPress={()=>this._onSelectSlot(sl)}/> )
                })
                botHeight = 200;
                hasBotInfos = true;
            }
            // for hour/slot
            if( null != ltime_slots && Array.isArray(ltime_slots) ){
                ltime_slots.forEach(sl=>{
                    slotsJsx.push( <TimeSlot key={sl._id} price={dateOne.price} priceBased={price_based} data={sl} onPress={()=>this._onSelectSlot(sl)}/> )
                })
                botHeight = 200;
                hasBotInfos = true;
            }
        }
        return(
            <SafeAreaInsetsContext.Consumer style={{flex: 1}}>
                    {insets => <View style={[styles.container,{backgroundColor: apColors.appBg,paddingBottom: insets.bottom,paddingLeft: insets.left,paddingRight: insets.right}]}>

                    <View style={styles.datesModalInner}><Availability availabilityData={availability} onDatesSelect={this._onDatesSelect} apColors={apColors}/></View>

                    { hasBotInfos && <View style={[styles.datesModalFooter,{minHeight: botHeight}]}>
                        <ScrollView style={[styles.scrollView,{borderTopColor: apColors.separator,}]} contentContainerStyle={styles.contentContainer}>
                            <View style={styles.datesInOutWrap}>
                                <View style={styles.datesInOut}>
                                    <TextHeavy style={[styles.datesInOutIn,{color: apColors.tText,}]}>{dateFormat(checkin)}</TextHeavy>
                                    { checkout !== '' && <TextHeavy style={[styles.datesInOutOut,{color: apColors.tText,}]}>{dateFormat(checkout)}</TextHeavy>}
                                    
                                </View>
                                { checkin != '' && <Btn onPress={()=>this._onSelectSlot({})}>{translate(price_based,'btn_continue')}</Btn> }
                            </View>
                            {slotsJsx}
                            {ticketsJsx}
                        </ScrollView>
                            
                    </View> }
                    
                </View>}

            </SafeAreaInsetsContext.Consumer>

        )
    }

}

//Map the redux state to your props.
const mapStateToProps = state => ({
    listing: state.listing,
})

//Map your action creators to your props.
const mapDispatchToProps = {
    checkInOutSelect
}

//export your list as a default export 
export default connect(mapStateToProps, mapDispatchToProps)(AvailabilityScreen);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        
        // borderBottomWidth: 0,
    },
    
    datesModalInner: {
        flex: 1,
        // paddingHorizontal: 15,
        // paddingBottom: 40,
        // width: '100%',
        minHeight: 350,
        // marginBottom: 15,
        // backgroundColor: '#F7F8FA',
    },
    datesModalFooter: {
        // height: 280,
        // paddingHorizontal: 15,
        // width: '100%',
        // backgroundColor: '#F7F8FA',
        // minHeight: 100,
    },
    scrollView: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#fff',

        borderTopWidth: 1,
        
    },
    contentContainer: {
        paddingHorizontal: 15,
        
        paddingTop: 15,
    },
    datesInOutWrap: {
        // paddingVertical: 10,
        flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    datesInOut: {

    },
    datesInOutIn: {
        fontSize: 15,
        
    },
    datesInOutOut: {
        fontSize: 15,
        
        marginTop: 5,
        // marginLeft: 10
    },
});
