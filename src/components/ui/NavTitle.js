import React from 'react';
import {
	StyleSheet,
	View,
    useColorScheme,
} from 'react-native';
import TextHeavy from './TextHeavy';

import getThemedColors from '../../helpers/Theme';

export default props =>{
    const colors = getThemedColors(useColorScheme())
    return (
        <View style={[styles.wrapper,props.style]}>
            <TextHeavy style={[styles.title,{color: colors.backBtn}]}>{props.title}</TextHeavy>
        </View>
    )
} 

const styles = StyleSheet.create({
	wrapper: {
        alignItems: 'center',
        // backgroundColor: 'red',
    },
    title: {
        textAlign: 'center', 
        fontSize: 17, 
        
    },
});
