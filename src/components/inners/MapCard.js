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
import {fomartCurrOut,formatNumber} from '../../helpers/currency';


import TextRegular from '../ui/TextRegular';
import TextMedium from '../ui/TextMedium';
import TextHeavy from '../ui/TextHeavy';
import {BookmarkSvg} from '../icons/ButtonSvgIcons';


import Reviews from '../Reviews';

export default function MapCard(props){
    const colors = getThemedColors(useColorScheme())
    const {ID,thumbnail,title,address,price,rating,distance} = props.post
    const bookmarked = null != props.bookmarks && Array.isArray(props.bookmarks) &&  -1 !== props.bookmarks.findIndex(bm => bm == ID) ? true : false;
    return (
        <View style={[styles.cardWrap,props.style]}>
            <TouchableOpacity onPress={ props.onPress } style={[styles.cardInner,{backgroundColor: colors.appBg,shadowColor: colors.shadowCl,}]}>
                { null != thumbnail && '' != thumbnail && <Image source={{uri: thumbnail}} style={styles.cardImage}/> }
                { bookmarked && <BookmarkSvg style={styles.bookmarkIcon}/> }
                <View style={styles.cardDetails}>
                    <TextHeavy style={styles.cardTitle}>{title}</TextHeavy>
                    
                    <View style={styles.cardBot}>
                        <Reviews rating={rating} showNum={true} style={{marginTop: 5}} oneStar={true} fSize={13}/>
                        { null != distance && distance !== '' && 
                            <View style={styles.farWrap}>
                                <TextMedium style={[styles.farVal,{color: colors.pText,}]}>{formatNumber(distance)}</TextMedium>
                                <TextRegular style={[styles.farKM,{color: colors.addressText,}]}>{translate('km')}</TextRegular>
                            </View>
                        }
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
	cardWrap: {
        width: 180,

        // marginBottom: 15,
        paddingHorizontal: 7.5,
    },
    cardInner: {
        // flexDirection: 'row',
        
        borderRadius: 8,

        
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 10,  
        elevation: 1,
    },
    cardImage: {
        minHeight: 150,
        borderTopLeftRadius: 8, 
        borderTopRightRadius: 8, 
        overflow: 'hidden',
        flex: 1,
        // marginRight: 17,
    },
    cardDetails: {
        // paddingLeft: 20,
        // flex: 1,
        padding: 9,
    },
    cardTitle: {
        fontSize: 15,
        lineHeight: 18,
        marginTop: 9,
        // marginBottom: 10
    },
    bookmarkIcon: {
        position: 'absolute',
        top: 2,
        right: 5,
    },
    cardBot: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    // distance
    farWrap: {
        marginTop: 3,
        flexDirection: 'row',
        alignItems: 'center',

        // position: 'absolute',
        // right: 9,
        // bottom: 3,
        // alignSelf: 'flex-end',
    },
    farVal: {
        fontSize: 13,
        
        lineHeight: 18,
    },
    farKM: {
        fontSize: 13,
        
        lineHeight: 18,
        marginLeft: 3,
        marginTop: 4,
    }
});



			