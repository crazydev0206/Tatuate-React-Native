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
    let bStyle = [styles.button,{backgroundColor: colors.appColor}],
        tStyle = styles.buttonText;
    if( null != props.bordered ){
        bStyle = [bStyle,styles.buttonBordered,{borderColor: colors.appColor}]
        tStyle = [tStyle,{color: colors.appColor}]
    }
    bStyle = [bStyle,props.style]
    tStyle = [tStyle,props.textStyle]
    
    return (
        <TouchableOpacity style={bStyle} onPress={props.onPress} disabled={props.disabled}>
			<TextHeavy style={tStyle}>{props.children}</TextHeavy>
		</TouchableOpacity>
    );
}

const styles = StyleSheet.create({
	wrapper: {},
    button: {
        
        // height: 35,
        borderRadius: 8,
        justifyContent: 'center',
        paddingHorizontal: 30,
        // marginTop: 20
        paddingVertical: 8,
    },
    buttonBordered: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        
    },
    buttonText: {
        color: '#FFF',
        fontSize: 15,
        lineHeight: 20,
        textAlign: 'center',

    },
});
