import React from 'react';
import {
	StyleSheet,
	View,
    Image,
	TouchableOpacity,
    useColorScheme,
} from 'react-native';

import getThemedColors from '../../helpers/Theme';


import {translate} from '../../helpers/i18n';
import {fomartCurrOut} from '../../helpers/currency';

import TextRegular from '../ui/TextRegular';
import TextMedium from '../ui/TextMedium';
import TextHeavy from '../ui/TextHeavy';
import {MarkerSvg} from '../icons/ButtonSvgIcons';
import Cats from '../inners/Cats';

export default function Listing(props){
    const colors = getThemedColors(useColorScheme())
    const {title,thumbnail,address,cats} = props.data
    return(
        <View style={[styles.container,props.style]}>
            <View style={styles.inner}>
                { '' != thumbnail && <View style={styles.thumbnail}>
                    <Image source={{uri:thumbnail}} style={styles.thumbnailImage} resizeMode="cover"/>
                </View> }

                <View style={styles.details}>
                    {title != '' && <TextHeavy style={{fontSize: 20,lineHeight: 24, color: colors.tText,marginBottom:3}}>{title}</TextHeavy>}
                    { 1 == 1 && address != '' && <View style={styles.addressWrap}>
                        <MarkerSvg color={colors.addressText} style={{marginRight:5}}/>
                        <TextMedium style={{fontSize:12,color: colors.addressText}}>{address}</TextMedium>
                    </View>}

                    { 1 == 2 && null != cats && <Cats data={cats} showTitle={false}/>}

                    <TextHeavy style={{fontSize:13,color: colors.appColor,marginTop: 10}}>{translate(props.priceBased,'bk_listing', { count: parseFloat(props.price), price:fomartCurrOut(props.price) })}</TextHeavy>
                        
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
	container: {
    },
    inner: {
        // flex: 1,
        flexDirection: 'row',
        // flexWrap: 'nowrap',
        justifyContent: 'space-between',
        // alignItems: 'center',
    },
    thumbnail: {
        flex: 1,
        minHeight: 60,
        // borderRadius: 4,
        // overflow: 'hidden',
        marginRight: 10,
    },
    thumbnailImage: {
        flex: 1,
        maxHeight: 90,
        borderRadius: 4,
        overflow: 'hidden',
    },
    details: {
        flex: 2,
        // backgroundColor:'red'
    },
    addressWrap:{
        // width: '100%',
        flexDirection: 'row',
        // flexWrap: 'wrap',
        alignItems: 'flex-start',
        // alignItems: 'center',
    },
    markerIcon: {
        marginRight: 5
    }
});