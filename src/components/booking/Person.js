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


export default class Person extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            adults: 0,
            children: 0,
            infants: 0,
        }
        
    }
    onChangeQtt(qtt,name){
        let {available} = this.props
        available = formatInt(available);
        let oldState = this.state
        if( oldState.adults + oldState.children + oldState.infants < available ){
            oldState[name] = qtt;

            this.props.onSelectPersons(oldState)
            this.setState(oldState)
        }
        
        // 
    }
    render(){

        let {apColors,available} = this.props
        const {price,children_price,infant_price} = this.props.prices
        const {adults,children,infants} = this.state
        available = formatInt(available);

        return(
        <View style={[styles.container,this.props.style]}>
            <View style={styles.inner}>

                

                <View style={styles.childWrap}>
                    <View style={styles.datesMetaLeft}>
                        <TextHeavy style={[styles.datesMetaTitle,{color: apColors.tText}]}>{translate('bk_adults')}</TextHeavy>
                        <TextRegular style={[styles.datePrice,{color: apColors.appColor}]}>{fomartCurrOut(price)}</TextRegular>
                    </View>
                    <View style={styles.datesMetaRight}>
                        <Qtts min={0} max={available} onChange={qtt=>this.onChangeQtt(qtt,'adults')} value={adults}/>
                    </View>
                </View>

               <View style={[styles.childWrap,{marginTop: 15}]}>
                    <View style={styles.datesMetaLeft}>
                        <TextHeavy style={[styles.datesMetaTitle,{color: apColors.tText}]}>{translate('bk_children')}</TextHeavy>
                        <TextRegular style={[styles.datePrice,{color: apColors.appColor}]}>{fomartCurrOut(children_price)}</TextRegular>
                    </View>
                    <View style={styles.datesMetaRight}>
                        <Qtts min={0} max={available} onChange={qtt=>this.onChangeQtt(qtt,'children')} value={children}/>
                    </View>
                </View>

                <View style={[styles.childWrap,{marginTop: 15}]}>
                    <View style={styles.datesMetaLeft}>
                        <TextHeavy style={[styles.datesMetaTitle,{color: apColors.tText}]}>{translate('bk_infants')}</TextHeavy>
                        <TextRegular style={[styles.datePrice,{color: apColors.appColor}]}>{fomartCurrOut(infant_price)}</TextRegular>
                    </View>
                    <View style={styles.datesMetaRight}>
                        <Qtts min={0} max={available} onChange={qtt=>this.onChangeQtt(qtt,'infants')} value={infants}/>
                    </View>
                </View>

                { available > 0 && <TextRegular style={[styles.datesMetaDetails,{color: apColors.addressText}]}>{translate(this.props.priceBased,'bk_slot_avai', {count: available} )}</TextRegular> }

            </View>
        </View>
        )
    }
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
        marginTop: 5,
        textAlign: 'right',
    },

    datePrice: {
        marginTop: 4,
        
        fontSize: 13,
    }
});