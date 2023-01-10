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
import {MarkerSvg,BookmarkSvg} from '../icons/ButtonSvgIcons';

import {translate} from "../../helpers/i18n";
import {extractPostParams}  from "../../helpers/store";

import {fomartCurrOut} from '../../helpers/currency';

export default class Discover extends React.Component{
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
  		const {data, viewableItems} = _self.state
        let posts = []
        if( null != data && Array.isArray(data) && data.length > 0 ){
            data.forEach((p,idx)=>{
                posts.push(<Card key={idx} post={p} onPress={()=>_self.goToListing(p)}/>)
            })
        }
  		return(
  			<View style={styles.container}>
                <TextHeavy style={styles.title}>{translate('home','discoverNew')}</TextHeavy>
                <ScrollView 
                    horizontal={true} 
                    showsHorizontalScrollIndicator={false} 
                    style={styles.scrollView}

                    // pagingEnabled={true}
                    // snapToAlignment="center"
                    // snapToInterval="1"
                >{posts}</ScrollView>
                
            </View>
  		)
  	}
}

class Card extends React.Component{
    constructor(props){
        super(props)
        this.state = {loaded: true}
    }
    // static getDerivedStateFromProps(nextProps, prevState){
    //     if( false === prevState.loaded ){
    //         const {cIndex,viewableItems} = nextProps
    //         if( -1 !== viewableItems.findIndex( vid => cIndex === vid ) ) return { loaded: true };
    //     }

    //     return null;
    // }
    render(){
        const {loaded} = this.state
        const {thumbnail,title,address,rating,price} = this.props.post
        return (
            <View style={styles.card}>
                <TouchableOpacity onPress={ this.props.onPress } style={{flex:1}}>
                    <View style={styles.cardThumbnail}>
                        { loaded === true && null != thumbnail && thumbnail !== '' && <Image source={{uri:thumbnail}} style={styles.cardImage}/> }
                    </View>

                    <View style={styles.cardTop}>
                        {null != address && address !== '' && <View style={styles.addressWrap}><MarkerSvg style={{marginRight: 7}}/><TextMedium style={styles.lAddress}>{address}</TextMedium></View>}
                        <BookmarkSvg style={styles.bookmarkIcon}/>
                    </View>
                    
                    <View style={styles.cardDetails}>
                        <TextHeavy style={styles.cardTitle}>{title}</TextHeavy>
                        
                        <Reviews rating={rating} showNum={false} showCount={false} style={{marginTop:12}} fSize={17}/>
                        <TextHeavy style={styles.priceAmount}>{fomartCurrOut(price)}</TextHeavy>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
        
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        width: 330,
        height: 515,
        marginRight: 17,
        // marginBottom: 15,
        // alignItems: 'center',
        // padding: 20,
        borderRadius: 16,
        overflow: 'hidden',

        shadowColor: '#BEC2CE',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.8,
        shadowRadius: 20,  
        elevation: 1,

        // marginBottom: 30,
    },
    cardThumbnail: {
        // width: 200,
        // height: 250,
        flex: 1,
        // borderRadius: 8,
        // overflow: 'hidden',
        // marginBottom: 15,

        // backgroundColor: '#FFF',
    },
    cardImage: {
        flex: 1
    },
    cardDetails: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        paddingHorizontal: 17,
        paddingBottom: 18,
    },
    cardTitle: {
        fontSize: 30,
        color: '#FFF',
        // textAlign: 'left',
        lineHeight: 41,
    },
    cardCount: {
        fontSize: 13,
        color: '#FFF',
        lineHeight: 18,
        marginTop: 2,
    },
    cardTop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 17,
        paddingTop: 18,
    },
    addressWrap: {
        flexDirection: 'row',
        marginRight: 40,
    },
    lAddress: {
        fontSize: 15,
        color: '#FFF',
        lineHeight: 20,
        // marginTop: 2,
        
    },
    bookmarkIcon: {
        position: 'absolute',
        top: 18,
        right: 17,
    },
    priceAmount: {
        fontSize: 17,
        color: '#FFF',
        lineHeight: 20,
        marginTop: 28,
    },
});
