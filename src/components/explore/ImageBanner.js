import React from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    Linking,
    StyleSheet,
    // useColorScheme,
} from 'react-native';

// import getThemedColors from '../../helpers/Theme';

// import {translate} from "../../helpers/i18n";
// import TextRegular from '../ui/TextRegular';

export default function ImageBanner(props) {

    const {src,url,height,width} = props.eleObj;
    let dfStyle = {}
    if( null != height && height > 0 ){
        dfStyle.height = height
    }
    if( null != width && width > 0 ){
        dfStyle.width = width
        dfStyle.alignSelf = 'center'
    }
    return (
        <View style={[styles.container,props.style,dfStyle]}>
            
            <TouchableOpacity onPress={ () => Linking.openURL(url) } style={styles.thumbnailBtn}>
                { null != src && src !== '' && <Image source={{uri:src}} style={styles.cardThumbnail}/> }
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 150,
        // flexDirection: 'row',
        // alignItems: 'center',
        // alignSelf: 'center',
        paddingHorizontal: 15,
        marginTop: 15,
    },
    thumbnailBtn: {
        flex: 1,
        borderRadius: 10,
        overflow: 'hidden',
    },
    cardThumbnail: {
        flex: 1,
    },
    searchIcon: {
        width: 22,
        height: 22,
        marginLeft: 12,
    },
    searchTitle: {
        marginLeft: 7,
        fontSize: 16,
        marginTop: 5,
    },

});



