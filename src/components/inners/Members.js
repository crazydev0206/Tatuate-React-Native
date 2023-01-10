import React, { useState } from 'react';
import {
	StyleSheet,
	View,
	Image,
    ScrollView,
    Dimensions,
    useColorScheme,
} from 'react-native';


import getThemedColors from '../../helpers/Theme';

import {regularFontFamily} from '../../constants/Colors';
import {translate} from "../../helpers/i18n";
import {fomartCurrOut,formatNumber} from '../../helpers/currency';

import TextBold from '../../components/ui/TextBold';
import TextRegular from '../../components/ui/TextRegular';
import ForHTML from '../ui/ForHTML';

export default class Members extends React.Component{
  	render(){
  		const {data} = this.props
  		let jsx = []
        const windowWidth = Dimensions.get('window').width;
		data.forEach((dtbj,idx)=>{
            const {avatar} = dtbj;
            let sWidth = windowWidth - 30,
                imageStyle = {width: sWidth, height: 260}
            if( null != avatar && avatar != '' ){
                Image.getSize( avatar, (wid,hei)=>{
                    imageStyle.height = hei * ( sWidth / wid )
                } );
            }
			jsx.push(<Member key={idx} data={dtbj} index={idx} style={{width: sWidth}} imageStyle/>)
		});
  		return(
            <View style={[styles.container,this.props.style]}>
                
                <ScrollView 
                    horizontal={true} 
                    showsHorizontalScrollIndicator={false} 
                    style={styles.scrollView}

                    pagingEnabled={true}
                    // snapToAlignment="center"
                    // snapToInterval="1"
                >{jsx}</ScrollView>
            </View>
  		)
  	}
}

function Member(props){
    const colors = getThemedColors(useColorScheme())
    const propShow = props.index === 0 ? true : false;
    const {avatar,name,job,desc} = props.data
	return (
		<View style={[styles.itemWrap,props.style]}>
			
            <View style={styles.itemInner}>
                {avatar != '' && <Image source={{uri: avatar}} style={[styles.memberImage,props.imageStyle]} resizeMode="contain"/> }
                <View style={styles.itemLeft}>
                    <TextBold style={styles.itemTitle}>{name}</TextBold>
                </View>
                <TextRegular style={[styles.itemSubTitle,{color: colors.appColor,}]}>{job}</TextRegular>
                <View style={styles.itemRight}>
                    { desc !== '' && <ForHTML  source={{ html: desc }}
                    // html={desc}
                        // containerStyle={{marginTop:0,paddingTop: 0}} 
                        baseFontStyle={{marginTop:0,paddingTop: 0,fontFamily: regularFontFamily,fontSize: 15,color: colors.pText}}
                    />}
                </View>
            </View>
            
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    childsWrap: {
        marginBottom: -15,
    },
    itemWrap: {
        marginBottom: 15,
    },
    itemInner: {
        flex: 1,
    },
    memberImage: {
        borderRadius: 8,
        flex: 1,
        minHeight: 260,
        // width: '100%',
        marginBottom: 10,
        overflow: 'hidden',
    },
    itemLeft: {
        // padding: 15,
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // borderRadius: 4,
    },
    itemRight: {
        // paddingHorizontal: 15,
    },
    
    itemTitle: {
        fontSize: 15,
        // color: '#1E2432',
        lineHeight: 20,
    },
    
    itemSubTitle: {
        fontSize: 13,
        
        lineHeight: 18,
    },
});



			