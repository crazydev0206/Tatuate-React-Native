import React from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
    useColorScheme,
} from 'react-native';
import getThemedColors from '../../helpers/Theme';

import TextMedium from './TextMedium';
import TextHeavy from './TextHeavy';

import {CheckMarkSvg} from '../icons/ButtonSvgIcons';

export const RadioBtn = (props) => {
    const colors = getThemedColors(useColorScheme())
    const status = null != props.status && 'checked' === props.status ? 'checked' : 'unchecked';
    let rStyle = [styles.radio,{borderColor: colors.separator}],
        rInStyle = styles.radioIn;
    if( status === 'checked' ){
        rStyle = [rStyle, {
            backgroundColor: colors.appColor,
            borderColor: colors.appColor,
        }]
        rInStyle = [rInStyle, styles.radioInChecked]
    } 
    return <View style={[styles.wrapper,props.style]}>
		<TouchableOpacity style={styles.button} onPress={props.onPress}>
			<TextMedium style={[styles.buttonText,{color: colors.tText}]}>{props.children}</TextMedium>
            <View style={rStyle}><View style={rInStyle}/></View>
		</TouchableOpacity>
	</View>;

}

export const CheckboxBtn = (props) => {
    const colors = getThemedColors(useColorScheme())
    const status = null != props.status && 'checked' === props.status ? 'checked' : 'unchecked';
    let rStyle = [styles.checkbox,{borderColor: colors.separator}],
        rInStyle = styles.radioIn;
    if( status === 'checked' ){
        rStyle = [rStyle, {
            backgroundColor: colors.appColor,
            borderColor: colors.appColor,
        }]
        rInStyle = [rInStyle, styles.radioInChecked]
    } 
    return <View style={[styles.wrapper,props.style]}>
        <TouchableOpacity style={styles.button} onPress={props.onPress}>
            <TextMedium style={[styles.buttonText,{color: colors.tText}]}>{props.children}</TextMedium>
            <View style={rStyle}>{ status === 'checked' && <CheckMarkSvg color='#FFF'/>}</View>
        </TouchableOpacity>
    </View>;

}

const styles = StyleSheet.create({
	wrapper: {
        flex: 1,
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    radio: {
        backgroundColor: '#F1F2F6',
        width: 18,
        height: 18,
        borderRadius: 9,
        
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    radioIn: {
        backgroundColor: '#F1F2F6',
        width: 8,
        height: 8,
        borderRadius: 8,
    },
    radioInChecked: {
        backgroundColor: '#FFF',
    },
    // checkbox
    checkbox: {
        backgroundColor: '#F1F2F6',
        width: 18,
        height: 18,
        borderRadius: 4,
        
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    buttonText: {
    	
		fontSize: 15,
		// lineHeight: 13,
    },
});
