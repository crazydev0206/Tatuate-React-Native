import React from 'react';
import {
	StyleSheet,
	View,
	Image,
	TouchableOpacity,
    useColorScheme,
} from 'react-native';

import TextBold from '../ui/TextBold';
import TextRegular from '../ui/TextRegular';
import TextMedium from '../ui/TextMedium';
import {MarkerSvg} from '../icons/ButtonSvgIcons';

import getThemedColors from '../../helpers/Theme';

export default function Address(props){
    const colors = getThemedColors(useColorScheme())
    const {isBlack,address,style} = props
    return(
        <View style={[styles.container,style]}>
            <MarkerSvg color={colors.addressText} style={{marginRight: 5}}/>
            <TextMedium style={{fontSize: 12,color: colors.addressText}}>{address}</TextMedium>
        </View>
    )
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        // marginTop: 10,
    },
    markerIcon: {
        // width: 22,
        // height: 22,
        marginRight: 5
    }
});



			