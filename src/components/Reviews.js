import React from 'react';
import {
	Text,
  	View,
  	StyleSheet,
    useColorScheme,
} from 'react-native';
import getThemedColors from '../helpers/Theme';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
export default function Reviews(props){
    const colors = getThemedColors(useColorScheme())
  	const {rating, showCount, showNum, fSize, oneStar} = props
    let stars = [], addSt = {};
    if( null != fSize && fSize ) addSt.fontSize = parseInt(fSize)
    if( null != rating && rating.rating > 0 ){
        for (let i = 1; i <= rating.base; i++ ) {
            let color = i <= rating.rating ? '#FF9500' : '#D1D1D6'; // 'rgb(255,138,37)' : 'rgb(204,203,212)'; // #FFCC00 #F1F2F6
            stars.push(<FontAwesome5 key={i} name="star" solid style={Object.assign({color: color, marginRight: 4, fontSize: 13}, addSt)}/>)
            if( null != oneStar && oneStar && i === 1) break;
        }

        if( null != showNum && showNum ) stars.push( <Text key="reviews-text" style={[{fontSize: 13, color: colors.addressText},addSt]}>({rating.rating})</Text> )
        if( null != showCount && showCount && rating.count_text !== '' ) stars.push( <Text key="reviews-count" style={[styles.countText,{color: colors.addressText},addSt]}>{rating.count_text}</Text> )
    }

	return stars.length > 0 && <View style={[styles.reviews,props.style]}>{stars}</View>

}

const styles = StyleSheet.create({
    reviews: {
        flexDirection: 'row',
    },
    countText: {
        fontSize: 13,
        marginLeft: 10
    }
});