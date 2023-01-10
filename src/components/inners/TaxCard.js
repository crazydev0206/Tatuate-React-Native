import React from 'react';
import {
	StyleSheet,
	View,
	Image,
	TouchableOpacity,
    useColorScheme,
} from 'react-native';

import getThemedColors from '../../helpers/Theme';

import {translate} from "../../helpers/i18n";
import TextRegular from '../ui/TextRegular';
// import TextMedium from '../ui/TextMedium';
import TextHeavy from '../ui/TextHeavy';

export default function TaxCard(props){
    const colors = getThemedColors(useColorScheme())
    return (
        <View style={[styles.card,props.style]}>
            <TouchableOpacity onPress={ props.onPress } style={{flex:1}}>
                <View style={styles.cardImageWrap}>
                    {null != props.post.thumbnail && props.post.thumbnail !== '' && <Image source={{uri:props.post.thumbnail}} style={styles.cardImage}/>}
                </View>
                <View style={styles.cardDetails}>
                    <TextHeavy style={[styles.cardTitle,{color: colors.taxTitle,}]}>{props.post.title}</TextHeavy>
                    <TextRegular style={[styles.cardSubTitle,{color: colors.taxCount,}]}>{translate('home','lcount',{count: props.post.count })}</TextRegular>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
	card: {
        // flex: 1,
        width: '50%',
        marginBottom: 15,
        paddingHorizontal: 7.5,
    },
    cardImageWrap: {
        minHeight: 165,
        width: '100%',
        borderRadius: 8, 
        overflow: 'hidden',
        marginBottom: 13
    },
    cardImage: {
        flex: 1
    },
    cardDetails: {

    },
    cardTitle: {
        fontSize: 17,
        
        lineHeight: 23,
    },
    cardSubTitle: {
        fontSize: 13,
        
        lineHeight: 18,
    },
});



			