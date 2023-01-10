import React from 'react';
import {
	StyleSheet,
	View,
    Image,
	TouchableOpacity,
    ActivityIndicator,
    useColorScheme,
} from 'react-native';


import getThemedColors from '../../helpers/Theme';

import {translate} from '../../helpers/i18n';
import {fomartCurrOut} from '../../helpers/currency';

import TextRegular from '../ui/TextRegular';
// import TextMedium from '../ui/TextMedium';
import TextHeavy from '../ui/TextHeavy';
import Qtts from '../ui/Qtts';


export default class TimeSlots extends React.Component{
    constructor(props){
        super(props)
        this.state = {booked: []}
        this.onChangeQtt = this.onChangeQtt.bind(this)
    }
    onChangeQtt(qtt, slot){
        let {booked} = this.state
        const findIdx = booked.findIndex(bk=>bk._id === slot._id)
        if( -1 !== findIdx ){
            booked[findIdx]['quantity'] = qtt
            booked[findIdx]['adults'] = qtt
        }else{
            booked.push( { _id:slot._id, quantity: qtt, adults: qtt, title: slot.time, ...this.props.prices } )
        }
        this.props.onSelectItems(booked)
        this.setState({booked})
    }
    render(){
        const {slots, apColors,prices} = this.props
        const {booked} = this.state
        let slotsJsx = [], count = 1;
        if( null != slots ){
            slots.forEach(slot=>{
                // get booked qtt
                let bQtt = 0;
                const findQtt = booked.find(bk => bk._id === slot._id )
                if( findQtt != null ) bQtt = findQtt.quantity

                let adStyle = {}
                if( count > 1 ) adStyle = {marginTop: 15, paddingTop: 15,borderTopWidth: 1,borderTopColor: apColors.separator,}
                slotsJsx.push( <Child key={slot._id} data={slot} priceBased={this.props.priceBased} prices={prices} style={adStyle} qtt={bQtt} onChangeQtt={(qtt)=>this.onChangeQtt(qtt,slot)}/>)

                count++;
            })
        }   
        return(
        <View style={[styles.container,this.props.style]}>
            <View style={styles.inner}>{slotsJsx}</View>
        </View>
        )
    }
}


function Child(props){
    const colors = getThemedColors(useColorScheme())
    const {available} = props.data;
    const {price} = props.prices;
    return (
        <View style={[styles.childWrap,props.style]}>
            <View style={styles.datesMetaLeft}>
                <TextHeavy style={[styles.datesMetaTitle,{color: colors.tText}]}>{props.data.time}</TextHeavy>
                <TextRegular style={[styles.datesMetaDetails,{color: colors.addressText}]}>{translate(props.priceBased,'bk_slot_avai', {count: parseInt(available)} )}</TextRegular>
                <TextRegular style={[styles.datePrice,{color: colors.appColor}]}>{fomartCurrOut(price)}</TextRegular>
            </View>
            <View style={styles.datesMetaRight}>
                <Qtts min={0} max={available} onChange={props.onChangeQtt} value={props.qtt}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
	container: {
    },
    inner: {
    },
    childWrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    datesMetaLeft: {

    },
    datesMetaRight: {

    },
    datesMetaTitle: {
        fontSize: 15,
        
        marginBottom: 5,
    },
    datesMetaDetails: {
        fontSize: 13,
        
    },
});