import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Modal,
	useColorScheme,
} from 'react-native';
import getThemedColors from '../helpers/Theme';


const ResultPopup = props => {
	const {
		loading,
		...attributes
	} = props;
	const colors = getThemedColors(useColorScheme())
	return (
    	<Modal
			transparent={true}
			animationType={'slide'} // 'none', 'slide', 'fade'
			visible={loading}
			onRequestClose={() => {console.log('close modal')}}>
			<View style={[styles.modalBackground,{backgroundColor: colors.modalBg}]}>
				<View style={[styles.activityIndicatorWrapper,{backgroundColor: colors.modalInner}]}>
					{props.children}
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
	    
	    // flex: 1,
	    borderRadius: 15,
	    marginHorizontal: 30,
	    padding: 30,
	    display: 'flex',
	    alignItems: 'center',
	    justifyContent: 'space-around'
  	}
});
export default ResultPopup;