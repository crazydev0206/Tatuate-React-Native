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


import TextBold from '../ui/TextBold';
import TextRegular from '../ui/TextRegular';
import TextMedium from '../ui/TextMedium';
import TextHeavy from '../ui/TextHeavy';
import {BookmarkSvg} from '../icons/ButtonSvgIcons';



export default function LHostedBy(props){
    const {post,apColors} = props
    const {author_name,author_avatar,author_lcouts,author_desc,author_phone,author_address,author_email} = post
    
    // const colors = getThemedColors(useColorScheme())
    // const {ID,thumbnail,title,address,price,rating,distance} = props.post
    // const bookmarked = null != props.bookmarks && Array.isArray(props.bookmarks) &&  -1 !== props.bookmarks.findIndex(bm => bm == ID) ? true : false;
    return (
        <View style={[styles.cardWrap,props.style]}>
            
                
                    <TextBold style={{color: apColors.tText, fontSize: 15,marginTop: 15,}}>{translate('slisting','hosted_by')}</TextBold>
                    
                    <View style={styles.commentHead}>
                        { null != author_avatar && author_avatar != '' && <Image
                            style={styles.avatar}
                            source={{uri: author_avatar}}
                            resizeMode="cover"
                        />}
                        <View>
                            <TextBold style={{color: apColors.tText, fontSize: 15,lineHeight:20}}>{author_name}</TextBold>
                            <TextRegular style={{color: '#878C9F', fontSize: 12,marginTop:10}}>{author_lcouts}</TextRegular>
                        </View>
                    </View>

                    <View style={styles.detailsWrap}>
                            {/* {author_address != '' && <View style={styles.detailsItem}>
                                <TextMedium style={styles.detailTitle}>Address</TextMedium>
                                <TextRegular style={styles.detailInfo}>{author_address}</TextRegular>
                            </View>}
                             */}
                            {author_email != '' && <View style={styles.detailsItem}>
                                <TextMedium style={styles.detailTitle}>{translate('slisting','hosted_by_email')}</TextMedium>
                                <TouchableOpacity onPress={()=>props.sendMail(author_email)}><TextRegular style={styles.detailInfo}>{author_email}</TextRegular></TouchableOpacity>
                            </View>}
                            {author_phone != '' && <View style={styles.detailsItem}>
                                <TextMedium style={styles.detailTitle}>{translate('slisting','hosted_by_phone')}</TextMedium>
                                <TouchableOpacity onPress={()=>props.callPhome(author_phone)}><TextRegular style={styles.detailInfo}>{author_phone}</TextRegular></TouchableOpacity>
                            </View>}
                    </View>

                    {/* <TextRegular style={{color: '#566985', fontSize: 14 ,marginTop:15}}>{author_desc}</TextRegular> */}

                    
                

        </View>
    )
}

const styles = StyleSheet.create({
	cardWrap: {
        // width: 180,

        // marginBottom: 15,
        // paddingHorizontal: 7.5,
    },
    detailsWrap: {
        flexDirection: 'row',
        // flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    detailTitle: {

    },
    detailInfo: {
        marginTop: 10
    },
    detailsItem: {
        // flexDirection: 'row',
        // flexWrap: 'wrap',
        // justifyContent: 'space-between'
        marginTop: 15,
        width: '48%',
    },
    commentHead: {
        flex: 1,
        flexDirection: 'row',
        // justifyContent: 'space-between',
        marginTop: 15,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        overflow: 'hidden',
        marginRight: 15,
    },
});



			