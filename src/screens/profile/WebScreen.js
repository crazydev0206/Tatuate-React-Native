import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';

import { WebView } from 'react-native-webview';

export default function WebScreen(props) {
    return <WebView 
    	source={{ uri: props.route.params?.url ?? '' }} 
    	style={{
    		flex:1,
    		width:'100%',
    		backgroundColor: props.apColors.secondBg,
    	}}
    />;
}


