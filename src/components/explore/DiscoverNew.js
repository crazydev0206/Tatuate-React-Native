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

import Reviews from '../Reviews';

import {translate} from "../../helpers/i18n";
import {extractPostParams,filterReset}  from "../../helpers/store";

export default class DiscoverNew extends React.Component{
  	constructor(props){
	    super(props)
        this.state = {data: [], viewableItems: [0,1]}

        this.viewabilityConfig = {
            waitForInteraction: true,
            // viewAreaCoveragePercentThreshold: 95,
            itemVisiblePercentThreshold: 15,
        }

        this.onViewableItemsChanged = this.onViewableItemsChanged.bind(this)
  	}
    goToListing(p){
        NavigationService.navigate('Listing', extractPostParams(p) );
    }
    onViewableItemsChanged(info){
        const {viewableItems} = info;
        let viewableIndexs = []
        if( null != viewableItems && Array.isArray(viewableItems) && viewableItems.length > 0 ){
            viewableIndexs = viewableItems.map(it=>it.index)
            this.setState( {viewableItems: viewableIndexs} )
        }
    }
  	render(){
        const _self = this
        const {apColors} = _self.props;
  		const {viewableItems} = _self.state
        const {title,data,show_view_all,viewall_text} = _self.props.eleObj;
  		return(
  			<View style={styles.container}>
                <SectionTitle title={title} showAll={show_view_all} allText={viewall_text} onViewAllPress={ ()=>{
                    filterReset();
                    NavigationService.navigate('Archive');
                } } style={{marginRight: 15}}/>
                <FlatList

                    data={data}
                    renderItem={({ item, index }) => (
                        <Card id={item.ID} cIndex={index} viewableItems={viewableItems} post={item} onPress={()=>_self.goToListing(item)} apColors={apColors}/>
                    )}
                    keyExtractor={item => String(item.ID)}
                    // extraData={selected}
                    // style={styles.scrollView}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    viewabilityConfig={_self.viewabilityConfig}
                    onViewableItemsChanged={_self.onViewableItemsChanged}
                />
            </View>
  		)
  	}
}

class Card extends React.Component{
    constructor(props){
        super(props)
        this.state = {loaded: false}
    }
    static getDerivedStateFromProps(nextProps, prevState){
        if( false === prevState.loaded ){
            const {cIndex,viewableItems} = nextProps
            if( -1 !== viewableItems.findIndex( vid => cIndex === vid ) ) return { loaded: true };
        }

        return null;
    }
    render(){
        const {apColors} = this.props;
        const {loaded} = this.state
        const {thumbnail,title,address,rating} = this.props.post
        return (
            <View style={styles.card}>
                <TouchableOpacity onPress={ this.props.onPress } style={{flex:1}}>
                    <View style={styles.cardThumbnail}>
                        { loaded === true && null != thumbnail && thumbnail !== '' && <Image source={{uri:thumbnail}} style={styles.cardImage}/> }
                    </View>
                    <View style={styles.cardDetails}>
                        <TextHeavy style={[styles.cardTitle,{color: apColors.tText,}]}>{title}</TextHeavy>
                        {null != address && address !== '' && <TextRegular style={[styles.lAddress,{color: apColors.addressText,}]}>{address}</TextRegular>}
                        <Reviews rating={rating} showNum={false} showCount={true} style={{marginTop:5}}/>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
        
}


const styles = StyleSheet.create({
    container: {
        minHeight: 150,
        // backgroundColor: '#ccc',
        
        paddingTop: 10,
        paddingLeft: 15,
        // paddingRight: 10,

        // marginBottom: 20,
        // paddingBottom: 10,
        marginTop: 20,
    },
    title: {
        fontSize: 30,
        color: '#1E2432',
        lineHeight: 41,
        marginBottom: 20,
    },
    scrollView: {
        flex: 1,
    },
    card: {
        width: 200,
        marginRight: 17,
        // marginBottom: 15,
        // alignItems: 'center',
        // padding: 20,
    },
    cardThumbnail: {
        width: 200,
        height: 250,
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 15,

        backgroundColor: '#FFF',
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
    lAddress: {
        fontSize: 13,
        
        lineHeight: 18,
        marginTop: 2,
    }
});
