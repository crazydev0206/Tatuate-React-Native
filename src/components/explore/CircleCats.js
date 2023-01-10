import React from 'react';
import {
    ScrollView,
	Text,
  	View,
    Image,
    TouchableOpacity,
  	StyleSheet,
    useColorScheme,
} from 'react-native';
import NavigationService from '../../helpers/NavigationService';
import {filterByCat} from '../../helpers/store';

// import { FontAwesome } from '@expo/vector-icons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { aweIcon, categoryColor } from '../../helpers/helpers';

import getThemedColors from '../../helpers/Theme';


import SectionTitle from './SectionTitle'
// import TextMedium from '../ui/TextMedium';
import TextBold from '../ui/TextBold';

export default class CircleCats extends React.Component{
    goToArchive(term){
        const {id} = term;
        if( null != id ){
            filterByCat( id )
            NavigationService.navigate('Archive')
        }
        
    }
  	render(){
  		const {title,data,show_view_all,viewall_text} = this.props.eleObj;
        let posts = []
        if( null != data && Array.isArray(data) && data.length > 0 ){
            data.forEach((p,idx)=>{
                posts.push(<Card key={idx} post={p} onPress={()=>this.goToArchive(p)}/>)
            })
        }
  		return(
  			<View style={[styles.container,this.props.style]}>
            
                <SectionTitle title={title} showAll={show_view_all} allText={viewall_text} onViewAllPress={ ()=>NavigationService.navigate('Categories') }/>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.scrollView}>{posts}</ScrollView>
            </View>
  		)
  	}
}
function Card(props){
    const colors = getThemedColors(useColorScheme())
    const {title,icon,color} = props.post
    let cStyle = Object.assign({},styles.cardIconWrap)
    if( null != color ) cStyle.backgroundColor = categoryColor(color)

    return (
        <TouchableOpacity onPress={ props.onPress } style={styles.card}>
            <View style={cStyle}>
                {null != icon && icon !== '' && <FontAwesome5 name={aweIcon(icon)} style={styles.icon}/>}
            </View>
            <View style={styles.cardDetails}>
                <TextBold style={[styles.cardTitle,{color: colors.taxTitle}]}>{title}</TextBold>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    scrollView: {
        flex: 1,
    },
    card: {
        marginRight: 26,
        alignItems: 'center',
    },
    cardIconWrap: {
        height: 64,
        width: 64,
        borderRadius: 32, 
        overflow: 'hidden',
        marginBottom: 5,
        backgroundColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardImage: {
        flex: 1
    },
    cardDetails: {

    },
    cardTitle: {
        // fontSize: 15,
        // color: '#B3B6C1',
        // textAlign: 'center',
        // lineHeight: 20,

        fontSize: 17,
        
        textAlign: 'left',
        lineHeight: 22,
        
    },
    icon: {
        fontSize: 24,
        color: '#fff'
    }
});
