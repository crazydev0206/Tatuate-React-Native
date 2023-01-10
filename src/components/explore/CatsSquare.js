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



import SectionTitle from './SectionTitle'
import TextRegular from '../ui/TextRegular';
import TextMedium from '../ui/TextMedium';
import TextBold from '../ui/TextBold';

import {translate} from "../../helpers/i18n";

import getThemedColors from '../../helpers/Theme';

export default class CatsSquare extends React.Component{
    goToArchive(term){
        const {id} = term;
        if( null != id ){
            filterByCat( id )
            NavigationService.navigate('Archive')
        }
        
    }
  	render(){
        // const {data} = this.state
  		const {title,data,show_view_all,viewall_text} = this.props.eleObj;
        let posts = []
        if( null != data && Array.isArray(data) && data.length > 0 ){
            data.forEach((p,idx)=>{
                posts.push(<Card key={idx} post={p} onPress={()=>this.goToArchive(p)}/>)
            })
        }
  		return(
  			<View style={[styles.container,this.props.style]}>
                <SectionTitle style={{marginRight: 15}} title={title} showAll={show_view_all} allText={viewall_text}  onViewAllPress={ ()=>NavigationService.navigate('Categories') }/>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.scrollView}>{posts}</ScrollView>
            </View>
  		)
  	}
}
function Card(props){
    const colors = getThemedColors(useColorScheme())
    const {title,icon,color,count} = props.post
    let cStyle = Object.assign({},styles.cardIconWrap)
    if( null != color ) cStyle.backgroundColor = categoryColor(color)

    return (
        <View style={styles.card}>
            <TouchableOpacity onPress={ props.onPress } style={{flex:1}}>
                <View style={cStyle}>
                    {null != icon && icon !== '' && <FontAwesome5 name={aweIcon(icon)} style={styles.icon}/>}
                </View>
                <View style={styles.cardDetails}>
                    <TextBold style={[styles.cardTitle,{color: colors.taxTitle}]}>{title}</TextBold>
                    <TextRegular style={[styles.cardCount,{color: colors.taxCount}]}>{translate('home','lcount',{count: count })}</TextRegular>
                </View>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        minHeight: 150,
        paddingLeft: 15,
        marginTop: 20,
    },
    scrollView: {
        flex: 1,
    },
    card: {
        marginRight: 17,
    },
    cardIconWrap: {
        height: 88,
        width: 88,
        borderRadius: 8, 
        overflow: 'hidden',
        marginBottom: 20,
        backgroundColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        fontSize: 44,
        color: '#fff'
    },
    cardImage: {
        flex: 1
    },
    cardDetails: {

    },
    cardTitle: {
        fontSize: 17,
        
        textAlign: 'left',
        lineHeight: 22,
    },
    cardCount: {
        fontSize: 13,
        
        lineHeight: 18,
        marginTop: 2,
    }
});
