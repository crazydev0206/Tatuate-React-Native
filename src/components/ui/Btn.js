import React from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
    useColorScheme,
} from 'react-native';
import TextHeavy from './TextHeavy';

import getThemedColors from '../../helpers/Theme';

export default props =>{
    const colors = getThemedColors(useColorScheme())
    return (
        <View style={[styles.wrapper,props.style]}>
            <TouchableOpacity style={[styles.button,{backgroundColor: colors.appColor}]} onPress={props.onPress}>
                <TextHeavy style={styles.buttonText}>{props.children}</TextHeavy>
            </TouchableOpacity>
        </View>
    )
} 


const styles = StyleSheet.create({
	wrapper: {
    },
    button: {
		paddingVertical: 7,
		paddingHorizontal: 15,
        // height: 44,
        borderRadius: 4,
        justifyContent: 'center',
    },
    buttonText: {
    	color: '#fff',
    },
});
