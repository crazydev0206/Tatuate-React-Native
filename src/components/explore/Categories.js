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

import getThemedColors from '../../helpers/Theme';

import {translate} from "../../helpers/i18n";
import SectionTitle from './SectionTitle'
import TextRegular from '../ui/TextRegular';
// import TextMedium from '../ui/TextMedium';
import TextHeavy from '../ui/TextHeavy';



export default class Categories extends React.Component{

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
    return (
        <View style={styles.card}>
            <TouchableOpacity onPress={ props.onPress } style={{flex:1}}>
                <View style={styles.cardImageWrap}>
                    {null != props.post.thumbnail && props.post.thumbnail !== '' && <Image source={{uri:props.post.thumbnail}} style={styles.cardImage}/>}
                </View>
                <View style={styles.cardDetails}>
                    <TextHeavy style={[styles.cardTitle,{color: colors.taxTitle}]}>{props.post.title}</TextHeavy>
                    <TextRegular style={[styles.cardSubTitle,{color: colors.taxCount}]}>{translate('home','lcount',{count: props.post.count })}</TextRegular>
                </View>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        minHeight: 150,
        // backgroundColor: '#fff',
        // marginBottom: 20,
        // paddingBottom: 10,
        paddingTop: 20,
        paddingLeft: 15,
        // paddingRight: 10,
    },
    scrollView: {
        flex: 1,
    },
    card: {
        marginRight: 15,
        // marginBottom: 15,
    },
    cardImageWrap: {
        height: 100,
        width: 150,
        borderRadius: 5, 
        overflow: 'hidden',
        marginBottom: 10
    },
    cardImage: {
        flex: 1
    },
    cardDetails: {

    },
    cardTitle: {
        fontSize: 17,
        
        lineHeight: 23,
    },
    cardSubTitle: {
        fontSize: 13,
        
        lineHeight: 18,
    },
});
