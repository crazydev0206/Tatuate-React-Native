import React from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
    useColorScheme,
} from 'react-native';
import TextHeavy from './TextHeavy';

import getThemedColors from '../../helpers/Theme';

export default props => {
    const colors = getThemedColors(useColorScheme())
    return(
        <View style={[styles.wrapper,props.style]}>
            <TouchableOpacity style={[styles.button,{backgroundColor: colors.appColor}]} onPress={props.onPress} disabled={props.disabled}>
                <TextHeavy style={styles.buttonText}>{props.children}</TextHeavy>
            </TouchableOpacity>
        </View>
    )
        
}
const styles = StyleSheet.create({
	wrapper: {},
    button: {
        
        height: 44,
        borderRadius: 8,
        justifyContent: 'center',
        // marginTop: 60,
    },
    buttonText: {
        color: '#fff',
        fontSize: 17,
        textAlign: 'center',

    },
});
