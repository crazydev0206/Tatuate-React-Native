import React from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
    useColorScheme,
} from 'react-native';
import getThemedColors from '../../helpers/Theme';


import {fomartCurrOut} from '../../helpers/currency';
import {translate} from '../../helpers/i18n';
import TextRegular from '../ui/TextRegular';
import TextHeavy from '../ui/TextHeavy';


export default props => {
    const colors = getThemedColors(useColorScheme())
    return(
        <View style={[styles.datesMeta,{borderTopColor: colors.separator},props.style]}>
    		<View style={styles.datesMetaLeft}>
                <TextHeavy style={[styles.datesMetaTitle,{color: colors.tText}]}>{props.data.time}</TextHeavy>
                <TextRegular style={[styles.datesMetaDetails,{color: colors.pText}]}>{translate(props.priceBased,'slot_price', { price: fomartCurrOut(props.price) } )}{translate(props.priceBased, 'slot_available', {count: parseInt(props.data.available)} )}</TextRegular>
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
	datesMeta: {
        paddingVertical: 10,
        borderTopWidth: 1,
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