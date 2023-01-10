import React from 'react';
// import {
// 	StyleSheet,
// 	View
// } from 'react-native';
import ResultPopup from './ResultPopup';
import TextHeavy from './ui/TextHeavy';
import TextRegular from './ui/TextRegular';



export default ErrorSuccessPopup = props => {
	const {
		isSuccess, 
		isError,
		title,
		message,
		successButton,
		errorButton,
	} = props;
	return (
    	<>
	        <ResultPopup loading={isSuccess}>
	            <TextHeavy style={{fontSize: 22,textAlign:'center',lineHeight:28}}>{title}</TextHeavy>
	            {message !== '' && <TextRegular  style={{fontSize: 15,textAlign:'center',marginTop:20}}>{message}</TextRegular>}
	            {successButton}
	        </ResultPopup>

	        <ResultPopup loading={isError}>
	            <TextHeavy style={{fontSize: 22,textAlign:'center',lineHeight:28}}>{title}</TextHeavy>
	            {message !== '' && <TextRegular  style={{fontSize: 15,textAlign:'center',marginTop:20}}>{message}</TextRegular>}
	            {errorButton}
	        </ResultPopup>
        </>
  	)
}
// const styles = StyleSheet.create({
	
// });


