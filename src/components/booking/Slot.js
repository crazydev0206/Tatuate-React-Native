import React from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
    useColorScheme,
} from 'react-native';


import getThemedColors from '../../helpers/Theme';


import TextRegular from '../ui/TextRegular';
import TextHeavy from '../ui/TextHeavy';

import Qtts from '../ui/Qtts';

export default props => {
    const colors = getThemedColors(useColorScheme())
    return (
        <View style={[styles.datesMeta,props.style]}>
            <View style={styles.datesMetaLeft}>
                <TextHeavy style={[styles.datesMetaTitle,{color: colors.tText}]}>{props.data.start} - {props.data.end}</TextHeavy>
                <TextRegular style={[styles.datesMetaDetails,{color: colors.addressText}]}>Available: {props.data.guests}</TextRegular>
            </View>
            <View style={styles.datesMetaRight}>
                <Qtts min={0} max={props.data.guests} onChange={props.onSelectSlot} value={props.qtt}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
	datesMeta: {
        paddingVertical: 10,
        // borderTopWidth: 1,
        // borderTopColor: '#E4E4E4',
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