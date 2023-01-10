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

import Person from './Person';

import TextRegular from '../ui/TextRegular';
// import TextMedium from '../ui/TextMedium';
import TextHeavy from '../ui/TextHeavy';
import Qtts from '../ui/Qtts';


export default class PersonSlots extends React.Component{
    constructor(props){
        super(props)
        this.state = {booked: []}
        // this.onChangeQtt = this.onChangeQtt.bind(this)
    }
    _onSelectPersons(persons,item){
        const {
            adults,
            children,
            infants,
        } = persons;
        let {booked} = this.state
        const findIdx = booked.findIndex(bk=>bk._id === item._id)
        if( -1 !== findIdx ){
            booked[findIdx]['quantity'] = 1
            booked[findIdx]['adults'] = adults
            booked[findIdx]['children'] = children
            booked[findIdx]['infants'] = infants
        }else{
            booked.push( { 
                _id:item._id, 
                quantity: 1, 
                adults, 
                children, 
                infants, 
                title: item.time, 
            } )
        }
        this.props.onSelectItems(booked)
        this.setState({booked})
    }
    render(){

        const {data,apColors} = this.props
        const {booked} = this.state
        let itemsJsx = [], count = 1;
        if( null != data ){
            data.forEach(item=>{
                // // get booked qtt
                // let bQtt = 0;
                // const findQtt = booked.find(bk => bk._id === item._id )
                // if( findQtt != null ) bQtt = findQtt.quantity

                let adStyle = {}
                if( count > 1 ) adStyle = {marginTop: 15, paddingTop: 15,borderTopWidth: 1,borderTopColor: apColors.separator,}
                itemsJsx.push( <Child key={item._id} data={item} priceBased={this.props.priceBased} prices={this.props.prices} style={adStyle} onSelectPersons={pers=>this._onSelectPersons(pers, item)}/>)

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
    const {
        time,
        available,
        guests,
    } = props.data
    const {
        price,
        children_price,
        infant_price
    } = props.prices;
    let aviNum = formatInt(available)
    return (
        <View style={[styles.childWrap,props.style]}>
            <View style={styles.datesMetaLeft}>
                <TextHeavy style={[styles.datesMetaTitle,{color: colors.tText}]}>{time}</TextHeavy>
                <TextRegular style={[styles.datesMetaDetails,{color: colors.addressText}]}>{translate(props.priceBased,'bk_slot_avai', {count: aviNum} )}</TextRegular>
                
            </View>
            <View style={styles.datesMetaRight}>
                <Person available={guests} onSelectPersons={pers => props.onSelectPersons(pers) } priceBased={props.priceBased} prices={{price,children_price,infant_price}} apColors={colors}/>
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
        flex: 1,
        marginLeft: 15,
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