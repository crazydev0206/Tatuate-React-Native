import React from 'react';
import {
    ScrollView,
	Text,
  	View,
    Image,
    TouchableOpacity,
  	StyleSheet
} from 'react-native';
import NavigationService from '../../helpers/NavigationService';
import {filterByCat} from '../../helpers/store';

import {translate} from "../../helpers/i18n";

import TaxCard from '../inners/TaxCard';

import SectionTitle from './SectionTitle'

import TextRegular from '../ui/TextRegular';
// import TextMedium from '../ui/TextMedium';
import TextHeavy from '../ui/TextHeavy';





export default class CatsCol extends React.Component{
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
                posts.push(<TaxCard key={idx} post={p} onPress={()=>this.goToArchive(p)}/>)
            })
        }
  		return(
  			<View style={[styles.container,this.props.style]}>
                <SectionTitle title={title} showAll={show_view_all} allText={viewall_text} onViewAllPress={ ()=>NavigationService.navigate('Categories') }/>
                <View style={styles.locColWrap}>{posts}</View>
            </View>
  		)
  	}
}

const styles = StyleSheet.create({
    container: {
        minHeight: 150,
        paddingHorizontal: 15,
        marginTop: 20,
    },
    scrollView: {
        flex: 1,
    },
    locColWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginLeft: -7.5,
        marginRight: -7.5,
        marginBottom: -15,
    },
});
