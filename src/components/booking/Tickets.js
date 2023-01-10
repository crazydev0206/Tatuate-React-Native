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
import {formatInt,formatFloat,fomartCurrOut} from '../../helpers/currency';

import TextRegular from '../ui/TextRegular';
// import TextMedium from '../ui/TextMedium';
import TextHeavy from '../ui/TextHeavy';
import Qtts from '../ui/Qtts';


export default class Tickets extends React.Component{
    constructor(props){
        super(props)
        this.state = {booked: []}
        this.onChangeQtt = this.onChangeQtt.bind(this)
    }
    onChangeQtt(qtt, item){
        let {booked} = this.state
        const findIdx = booked.findIndex(bk=>bk._id === item._id)
        if( -1 !== findIdx ){
            booked[findIdx]['quantity'] = qtt
            booked[findIdx]['adults'] = qtt
        }else{
            booked.push( { _id:item._id, quantity: qtt, adults: qtt, title: item.name, price: formatFloat(item.price) } )
        }

        this.props.onSelectTickets(booked)
        this.setState({booked})
    }
    render(){

        const {data,apColors} = this.props
        const {booked} = this.state

        let itemsJsx = [], count = 1;
        if( null != data ){
            data.forEach(item=>{
                // get booked qtt
                let bQtt = 0;
                const findQtt = booked.find(bk => bk._id === item._id )
                if( findQtt != null ) bQtt = findQtt.quantity

                let adStyle = {}
                if( count > 1 ) adStyle = {marginTop: 15, paddingTop: 15,borderTopWidth: 1,borderTopColor: apColors.separator,}
                itemsJsx.push( <Child data={item} priceBased={this.props.priceBased} key={item._id} style={adStyle} qtt={bQtt} onChangeQtt={(qtt)=>this.onChangeQtt(qtt,item)}/>)

                count++;
            })
        }   
        return(
        <View style={[styles.container,this.props.style]}>
            <View style={styles.inner}>{itemsJsx}</View>
        </View>
        )
    }
}


function Child(props){
    const colors = getThemedColors(useColorScheme())
    const {name,price,available} = props.data
    let aviNum = formatInt(available)
    return (
        <View style={[styles.childWrap,props.style]}>
            <View style={styles.datesMetaLeft}>
                <TextHeavy style={[styles.datesMetaTitle,{color: colors.tText}]}>{name}</TextHeavy>
                <TextRegular style={[styles.datesMetaDetails,{color: colors.addressText}]}>{translate(props.priceBased,'bk_slot_avai', {count: aviNum} )}</TextRegular>
                <TextRegular style={[styles.datePrice,{color: colors.appColor}]}>{fomartCurrOut(price)}</TextRegular>
            </View>
            <View style={styles.datesMetaRight}>
                <Qtts min={0} max={aviNum} onChange={props.onChangeQtt} value={props.qtt}/>
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

    datePrice: {
        marginTop: 4,
        
        fontSize: 13,
    }
});