import React from 'react';
import {
	StyleSheet,
	View,
    ScrollView,
    Modal,
    Dimensions,
} from 'react-native';


// for dates modal
import moment from 'moment';
import CloseButton from './CloseButton';
import TextRegular from '../ui/TextRegular';
import TextMedium from '../ui/TextMedium';
import TextHeavy from '../ui/TextHeavy';
import Availability from './Availability';
import Slot from '../booking/Slot';

import NavigationService from '../../helpers/NavigationService';

// for redux
import { connect } from 'react-redux';


class AvailabilityModal extends React.Component{
  	constructor(props){
	    super(props)
	    this.state = {
            dateOne: {},
            dateTwo: {},
        }

        this._onDatesSelect = this._onDatesSelect.bind(this)
  	}
    _onDatesSelect(vals){
        let dateOne = vals[0], dateTwo = {};
        if( vals.length === 2 ){
            dateOne = vals[1];
        }
        this.setState({dateOne,dateTwo})
    }
    _onSelectSlot(slot){
        NavigationService.navigate('Main',{},'Booking',{slot})
    }
  	render(){
        
        const {showDates, _onCloseDates, listing} = this.props
        let availability = {}
        if( null != listing && null != listing.data && null != listing.data.availability) availability = listing.data.availability
  		const {dateOne,dateTwo} = this.state
        const windowHeight = Dimensions.get('window').height;
        let botHeight = 0,checkin = '', checkout = '';
        if( null != dateOne.dateString && dateOne.dateString !== '' ){
            checkin = dateOne.dateString;
            botHeight = 180;
        } 
        if( null != dateTwo.dateString && dateTwo.dateString !== '' ) checkout = dateTwo.dateString;

        // for booking metas - custom
        let slotsJsx = []
        if( null != dateOne.metas ){
            const {slots} = dateOne.metas
            // for slots
            if( null != slots && Array.isArray(slots) ){
                slots.forEach(sl=>{
                    slotsJsx.push( <Slot key={sl._id} data={sl} onPress={()=>this._onSelectSlot(sl)}/> )
                    // (
                    //     <View style={styles.datesMeta} key={sl._id}>
                    //         <TextHeavy style={styles.datesMetaTitle}>{sl.start} - {sl.end}</TextHeavy>
                    //         <TextRegular style={styles.datesMetaDetails}>Available: {sl.guests}</TextRegular>
                    //     </View>
                    // )
                })
            }
        }
  		return(
            <Modal
                transparent={false}
                animationType={'slide'}
                visible={showDates}
                onRequestClose={() => {
                    // this.ShowModalFunction(!this.state.ModalVisibleStatus, '');
                }}
            >
                <View style={styles.datesModal}>

                    <View style={styles.datesModalHeader}>
                        <CloseButton isBlack={true} onPress={_onCloseDates} style={styles.datesModalCloser}/>
                        <TextMedium style={{fontSize: 15,color:'#1E2432',textAlign:'center'}}>SELECT DATES</TextMedium>
                        <View style={styles.modalHeaderSpacer}></View>
                    </View>

                    <View style={[styles.datesModalInner,{height: windowHeight - 92 - botHeight}]}><Availability availabilityData={availability} onDatesSelect={this._onDatesSelect}/></View>

                    <View style={styles.datesModalFooter}>
                        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                            
                            <View style={styles.datesInOut}>
                                <TextHeavy style={styles.datesInOutIn}>{moment(checkin).format('MMMM DD, YYYY')}</TextHeavy>
                                { checkout !== '' && <TextHeavy style={styles.datesInOutOut}> - {moment(checkout).format('MMMM DD, YYYY')}</TextHeavy>}
                            </View>
                            {slotsJsx}
                        </ScrollView>
                            
                    </View>
                    
                </View>
            </Modal>
  		)
  	}
}

//Map the redux state to your props.
const mapStateToProps = state => ({
    listing: state.listing,
    // availability: state.listing.data.availability,
})

//Map your action creators to your props.
const mapDispatchToProps = {
}

//export your list as a default export 
// export default AvailabilityModal
export default connect(mapStateToProps, mapDispatchToProps)(AvailabilityModal);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderTopColor: '#E4E4E4',
    },
	datesModal: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#fff',
    },
    datesModalHeader: {
        width: '100%',
        height: 92,
        borderBottomWidth: 1,
        borderBottomColor: '#EAECEF',
        backgroundColor: '#F7F8FA',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingBottom: 12,
        paddingHorizontal: 15,
    },
    datesModalCloser: {
        // marginLeft: 15,
        // marginTop: 52,
    },
    modalHeaderSpacer: {
        width: 28,
    },
    datesModalInner: {
        // flex: 1,
        // paddingHorizontal: 15,
        // paddingBottom: 40,
        width: '100%',
        minHeight: 350,
        // marginBottom: 15,
    },
    datesModalFooter: {
        height: 180,
        // paddingHorizontal: 15,
        width: '100%',
        // backgroundColor: '#F7F8FA',
    },
    datesInOut: {
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    datesInOutIn: {
        fontSize: 15,
        color: '#1E2432',
    },
    datesInOutOut: {
        fontSize: 15,
        color: '#1E2432',
        // marginLeft: 10
    },
    datesMeta: {
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#E4E4E4',
    },
    datesMetaTitle: {
        fontSize: 15,
        color: '#1E2432',
        marginBottom: 5,
    },
    datesMetaDetails: {
        fontSize: 13,
        color: '#BEC2CE',
    },
});



			