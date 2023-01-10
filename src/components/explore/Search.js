import React from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    useColorScheme,
} from 'react-native';

import getThemedColors from '../../helpers/Theme';

import {translate} from "../../helpers/i18n";
import TextRegular from '../ui/TextRegular';

import {SearchSvg} from '../icons/ButtonSvgIcons';
export default function Search(props) {
    const colors = getThemedColors(useColorScheme())
    return (
        <View style={[styles.container,{backgroundColor: colors.searchBg},props.style]}>
            <SearchSvg style={styles.searchIcon} color={colors.searchText}/>
            <TextRegular style={[styles.searchTitle,{color: colors.searchText}]}>{translate('home','search')}</TextRegular>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
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



