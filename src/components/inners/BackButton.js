import React from 'react';
import {
	StyleSheet,
	View,
	Image,
	TouchableOpacity
} from 'react-native';

import {ArrowLeftSvg} from '../icons/ButtonSvgIcons';

export default function BackButton(props) {
	const _onPressButton = () => {
        if( null != props.onPress){
            props.onPress()
        }
		// NavigationService.navigate('Home', { })
	}
    const fill = null != props.color ? props.color : ( null!=props.isBlack && props.isBlack ? '#000' : '#FFF' );
  	return (
	    <View style={[styles.container, props.style]}>
	    	<TouchableOpacity onPress={_onPressButton}>
                <View style={styles.navButton}>
                    <ArrowLeftSvg fill={fill} />
                </View>
            </TouchableOpacity>
	   	</View>
  	);
}

const styles = StyleSheet.create({
	container: {
		width: 28,
    },
    navButton: {
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#DDDDDD',
        // padding: 10,
        width: 28,
        height: 28,
        // color: '#fff',
    },
    navButtonIcon: {
        // width: 28,
        // height: 28,
    },
});



			