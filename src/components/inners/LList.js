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
import TextBold from '../ui/TextBold';
import TextHeavy from '../ui/TextHeavy';
import {BookmarkSvg} from '../icons/ButtonSvgIcons';


import Reviews from '../Reviews';

export default function LList(props){
    const colors = getThemedColors(useColorScheme())
    const {ID,thumbnail,title,address,price,rating,distance} = props.post
    const bookmarked = null != props.bookmarks && Array.isArray(props.bookmarks) &&  -1 !== props.bookmarks.findIndex(bm => bm == ID) ? true : false;
    return (
        <View style={[styles.cardWrap,{borderBottomColor: colors.separator,},props.style]}>
            <TouchableOpacity onPress={ props.onPress } style={styles.cardInner}>
                { null != thumbnail && '' != thumbnail && <Image source={{uri: thumbnail}} style={styles.cardImage}/> }
                <View style={styles.cardDetails}>
                    <TextBold style={styles.cardTitle}>{title}</TextBold>
                    { bookmarked && <BookmarkSvg style={styles.bookmarkIcon}/> }
                    {null != address && address !== '' && <TextRegular style={[styles.lAddress,{color: colors.addressText,}]}>{address}</TextRegular>}
                    { null != distance && distance !== '' && 
                        <View style={styles.farWrap}>
                            <TextMedium style={[styles.farVal,{color: colors.pText,}]}>{formatNumber(distance)}</TextMedium>
                            <TextRegular style={[styles.farKM,{color: colors.addressText,}]}>{translate('km')}</TextRegular>
                        </View>
                    }

                    <Reviews rating={rating} showNum={true} style={{marginTop: 5}}/>

                    {
                        null != price && price !== '' && 
                        <View style={styles.priceWrap}>
                            <TextRegular style={[styles.priceTitle,{color: colors.addressText,}]}>{translate('home','from')}</TextRegular>
                            <TextBold style={[styles.priceAmount,{color: colors.appColor,}]}>{fomartCurrOut(price)}</TextBold>
                        </View>
                    }
                    
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
	cardWrap: {
        paddingVertical: 20,
        
        borderBottomWidth: 1,
    },
    cardInner: {
        flexDirection: 'row',
    },
    cardImage: {
        minHeight: 100,
        borderRadius: 5, 
        overflow: 'hidden',
        flex: 1,
        marginRight: 17,
    },
    cardDetails: {
        // paddingLeft: 20,
        flex: 2,
    },
    cardTitle: {
        fontSize: 20,
        lineHeight: 24,
        marginRight: 25,
        // marginBottom: 10
    },
    bookmarkIcon: {
        position: 'absolute',
        top: -2,
        right: 0,
    },
    lAddress: {
        fontSize: 13,
        
        lineHeight: 18,
        marginTop: 2,
    },
    // card price
    priceWrap: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    priceTitle: {
        fontSize: 13,
        
        lineHeight: 15,
        marginRight: 10,
    },
    priceAmount: {
        fontSize: 17,
        
        lineHeight: 18,
    },
    // distance
    farWrap: {
        flexDirection: 'row',
        alignItems: 'center',

        position: 'absolute',
        right: 0,
        bottom: 0,
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



			