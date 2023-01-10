import React from 'react';
import {
	useColorScheme,
	View
} from 'react-native';
import ResultPopup from './ResultPopup';
import TextHeavy from './ui/TextHeavy';
import TextRegular from './ui/TextRegular';

import getThemedColors from '../helpers/Theme';

export default SuccessPopup = props => {
	const {
		visible, 
		title,
		message,
		buttons,
	} = props;
	const colors = getThemedColors(useColorScheme())
	return (
    	<ResultPopup loading={visible}>
            <TextHeavy style={{color: colors.tText,fontSize: 22,textAlign:'center',lineHeight:28}}>{title}</TextHeavy>
            {message !== '' && <TextRegular  style={{color: colors.pText,fontSize: 15,textAlign:'center',marginTop:20}}>{message}</TextRegular>}
            {buttons}
        </ResultPopup>
  	)
}


