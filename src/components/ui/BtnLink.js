import React from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
    useColorScheme,
} from 'react-native';
import TextRegular from './TextRegular';
import getThemedColors from '../../helpers/Theme';

export default props => {
    const colors = getThemedColors(useColorScheme())
    const disabled = null != props.disabled && props.disabled == true ? true : false;
    let wStype = styles.wrapper
    if( null != props.center ) wStype = [wStype, {alignItems:'center'}]
    let tStyle = {}
    if( null != props.size ) tStyle = {fontSize: props.size}
    tStyle = [tStyle,props.textStyle]
    return  <TouchableOpacity style={[wStype,props.style]} onPress={props.onPress} disabled={disabled}>
    			<TextRegular style={[styles.buttonText,{color: colors.appColor},tStyle]}>{props.children}</TextRegular>
    		</TouchableOpacity>;
    }
const styles = StyleSheet.create({
	wrapper: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    buttonText: {
        
        fontSize: 17,
        lineHeight: 22,
        // marginTop:15
    },
});
