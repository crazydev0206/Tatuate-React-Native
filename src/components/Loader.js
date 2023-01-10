import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Modal,
	ActivityIndicator,
	useColorScheme,
} from 'react-native';
import getThemedColors from '../helpers/Theme';


const Loader = props => {
	const {
		loading,
		...attributes
	} = props;
	const colors = getThemedColors(useColorScheme())
	return (
    	<Modal
    		// style={{backgroundColor: colors.appBg,}}
			transparent={true}
			animationType={'fade'} // 'none', 'slide', 'fade'
			visible={loading}
			onRequestClose={() => {console.log('close modal')}}>
			<View style={[styles.modalBackground,{backgroundColor: colors.modalBg},props.style]}>
				<View style={[styles.activityIndicatorWrapper,{backgroundColor: colors.secondBg}]}>
					<ActivityIndicator animating={loading} />
				</View>
			</View>
		</Modal>
  	)
}
const styles = StyleSheet.create({
	modalBackground: {
	    flex: 1,
	    alignItems: 'center',
	    flexDirection: 'column',
	    justifyContent: 'space-around',
	    
  	},
  	activityIndicatorWrapper: {
	    
	    height: 50,
	    width: 50,
	    borderRadius: 5,
	    display: 'flex',
	    alignItems: 'center',
	    justifyContent: 'space-around'
  	}
});
export default Loader;