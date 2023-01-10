import React from 'react';
import {
    ScrollView,
  	View,
    Image,
    TouchableOpacity,
    FlatList,
  	StyleSheet
} from 'react-native';

import NavigationService from '../../helpers/NavigationService';



import SectionTitle from './SectionTitle'
import TextRegular from '../ui/TextRegular';
import TextMedium from '../ui/TextMedium';
import TextHeavy from '../ui/TextHeavy';

import LList from '../inners/LList';
import LCard from '../inners/LCard';

import Reviews from '../Reviews';

import {translate} from "../../helpers/i18n";
import {extractPostParams,filterReset}  from "../../helpers/store";

import {fomartCurrOut} from '../../helpers/currency';

export default class Popular extends React.Component{
  	constructor(props){
	    super(props)
        this.state = {data: [], viewableItems: [0,1]}
  	}
    goToListing(p){
        NavigationService.navigate('Listing', extractPostParams(p) );
    }
  	render(){
        const _self = this
        const {viewableItems} = _self.state
  		const {title,data,show_view_all,viewall_text,layout} = _self.props.eleObj;

        let CardCom = LList,
            flatListStyle = styles.flatList;
        if( null != layout && layout == 'grid' ){
            CardCom = LCard;
            flatListStyle = styles.flatListGrid;
        }


        let posts = []
        if( null != data && Array.isArray(data) && data.length > 0 ){
            data.forEach((p,idx)=>{
                posts.push(<CardCom key={idx} post={p} onPress={()=>_self.goToListing(p)}/>)
            })
        }
  		return(
  			<View style={styles.container}>
                <SectionTitle title={title} showAll={show_view_all} allText={viewall_text} onViewAllPress={ ()=>{
                    filterReset();
                    NavigationService.navigate('Archive');
                } }/>
                <View style={flatListStyle}>{posts}</View>
            </View>
  		)
  	}
}
const styles = StyleSheet.create({
    container: {
        paddingLeft: 15,
        paddingRight: 15,

        marginTop: 20,
    },
    flatList: {
        // paddingHorizontal: 15,
    },
    flatListGrid: {
        // flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -7.5,
        // paddingTop: 15,
        // backgroundColor: '#F7F8FA',
    },
});
