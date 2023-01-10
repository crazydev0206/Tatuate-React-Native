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


export default class Quantity extends React.Component{
    constructor(props){
        super(props)
        this.state = {value: 0}
        
    }
    onChangeQtt(qtt){
        let {value} = this.state
        
        value = qtt;

        this.props.onSelectQtts(value)
        this.setState({value})
    }
    render(){

        const {apColors,available} = this.props
        const {price} = this.props.prices
        const {value} = this.state
        return(
        <View style={[styles.container,this.props.style]}>
            <View style={styles.inner}>

                <View style={styles.childWrap}>
                    <View style={styles.datesMetaLeft}>
                        <TextHeavy style={[styles.datesMetaTitle,{color: apColors.tText}]}>{translate('bk_quantity')}</TextHeavy>

                        { available > 0 && <TextRegular style={[styles.datesMetaDetails,{color: apColors.addressText}]}>{translate(this.props.priceBased,'bk_slot_avai', {count: available} )}</TextRegular> }
                        <TextRegular style={[styles.datePrice,{color: apColors.appColor}]}>{fomartCurrOut(price)}</TextRegular>
                    </View>
                    <View style={styles.datesMetaRight}>
                        <Qtts min={0} max={available} onChange={qtt=>this.onChangeQtt(qtt)} value={value}/>
                    </View>
                </View>

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
        
    },

    datePrice: {
        marginTop: 4,
        
        fontSize: 13,
    }
});