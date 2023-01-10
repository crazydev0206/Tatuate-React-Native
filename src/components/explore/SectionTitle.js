import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    useColorScheme,
} from 'react-native';
import {translate} from "../../helpers/i18n";
import TextHeavy from '../ui/TextHeavy';

import getThemedColors from '../../helpers/Theme';

export default function SectionTitle(props) {
    const colors = getThemedColors(useColorScheme())
    return (
        <View style={[styles.container,props.style]}>
            {null != props.title && props.title != '' && <TextHeavy style={[styles.title,{color: colors.tText}]}>{props.title}</TextHeavy> }
            {null != props.showAll && props.showAll && <TouchableOpacity onPress={ props.onViewAllPress }>
                <Text style={[styles.subTitle,{color: colors.tText}]}>{ null != props.allText && props.allText != '' ? props.allText : translate('home','view_all')}</Text>
            </TouchableOpacity> }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 15,
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 20,
        
        lineHeight: 25,
    },
    subTitle: {
        fontSize: 15,
        
        lineHeight: 20,
    },
});
