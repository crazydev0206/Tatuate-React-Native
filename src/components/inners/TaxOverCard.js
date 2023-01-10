import React from 'react';
import {
	StyleSheet,
	View,
	Image,
	TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {translate} from "../../helpers/i18n";
import TextRegular from '../ui/TextRegular';
// import TextMedium from '../ui/TextMedium';
import TextHeavy from '../ui/TextHeavy';

export default function TaxOverCard(props){
    return (
        <View style={[styles.card,props.style]}>
            <TouchableOpacity onPress={ props.onPress } style={styles.cardOverInner}>
                <View style={styles.cardImageWrap}>
                    {null != props.post.thumbnail && props.post.thumbnail !== '' && <Image source={{uri:props.post.thumbnail}} style={styles.cardImage}/>}
                </View>
                {props.overlay && <LinearGradient colors={['rgba(0,0,0,0.15)','rgba(0,0,0,0.50)']} style={styles.linearGradient}></LinearGradient>}
                <View style={styles.cardDetails}>
                    <View style={styles.cardDetailsInner}>
                        <TextHeavy style={styles.cardTitle}>{props.post.title}</TextHeavy>
                        <TextRegular style={styles.cardSubTitle}>{translate('home','lcount',{count: props.post.count })}</TextRegular>
                    </View>
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
    cardOverInner: {
        flex: 1,
        borderRadius: 8, 
        overflow: 'hidden',
    },
    cardImageWrap: {
        minHeight: 165,
        width: '100%',
        // borderRadius: 8, 
        // overflow: 'hidden',
        // marginBottom: 13
    },
    cardImage: {
        flex: 1
    },
    linearGradient: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 3,
    },
    cardDetails: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        // alignItems: 'center',
        // flex: 1,
        // backgroundColor: 'red',
        justifyContent: 'center',

        zIndex: 10,
    },
    cardDetailsInner: {
        // backgroundColor: 'red',
    },
    cardTitle: {
        fontSize: 17,
        color: '#FFF',
        lineHeight: 23,
        textAlign: 'center',
    },
    cardSubTitle: {
        fontSize: 13,
        color: '#EAECEF',
        lineHeight: 18,
        textAlign: 'center',
    },
});



			