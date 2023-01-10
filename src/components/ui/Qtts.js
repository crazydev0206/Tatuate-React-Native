import React, {useState,useEffect} from 'react';
import {
	StyleSheet,
	View,
	// Button,
    TouchableOpacity,
    useColorScheme,
} from 'react-native';
import TextRegular from './TextRegular';
import TextHeavy from './TextHeavy';

import getThemedColors from '../../helpers/Theme';
import {formatInt} from '../../helpers/currency';
export default function Qtts(props) {
    let propVal = 0
    if( null != props.value ) propVal = props.value;
    let [value, setValue] = useState(propVal);
    let {min, max} = props
    if( null == min ) min = 0;
    if( null == max ) max = 1;
    min = formatInt(min)
    max = formatInt(max)
    const colors = getThemedColors(useColorScheme())
    let maxStyle = {}, minStyle = {}, minDisabled = false, maxDisabled = false;
    const _onPress = (minus) => {
        if( minus ){
            if( null == min || value > min ){
                value -= 1
                props.onChange( value )
            }
        }else if( null == max || value < max ){
            value += 1
            props.onChange( value )
        }
    }
    useEffect(() => {
        setValue(props.value)
    }, [props.value])
    if( null != min && value <= min ){
        minDisabled = true;
        minStyle = {opacity: 0.3}
    }
    if( null != max && value >= max ){
        maxDisabled = true;
        maxStyle = {opacity: 0.3}
    }

    return (
        <View style={[styles.wrapper,props.style]}>
            <View style={styles.inner}>
                <TouchableOpacity style={[styles.btns,{borderColor: colors.appColor,},minStyle]} onPress={()=>_onPress(true)} disabled={minDisabled}>
                    <TextRegular style={[styles.btnText,{color: colors.appColor,}]}>-</TextRegular>
                </TouchableOpacity>
                <TextHeavy style={styles.qttText}>{value}</TextHeavy>
                <TouchableOpacity style={[styles.btns,{borderColor: colors.appColor,},maxStyle]} onPress={()=>_onPress(false)} disabled={maxDisabled}>
                    <TextRegular style={[styles.btnText,{color: colors.appColor,lineHeight: 23,fontSize:20}]}>+</TextRegular>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
	wrapper: {
    },
    inner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    btns: {
        width: 24,
        height: 24,
        borderRadius: 12,
        
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    qttText: {
        marginLeft: 10,
        marginRight: 10,
        fontSize: 15,
        lineHeight: 24,
        width: 30,
        textAlign: 'center',
    },
    btnText: {
    	
        fontSize: 24,
        lineHeight: 23,
        textAlignVertical: 'center',
    },
});
