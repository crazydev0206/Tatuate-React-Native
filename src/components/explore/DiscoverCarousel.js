import React from 'react';
import {
    ScrollView,
  	View,
    Image,
    TouchableOpacity,
    FlatList,
  	StyleSheet,
    Dimensions,
    Platform
} from 'react-native';
// import { useSafeArea } from 'react-native-safe-area-context';
// import FastImage from 'react-native-fast-image'

// import Carousel from 'react-native-snap-carousel';
import Carousel from '../../react-native-snap-carousel-master/src';

import LinearGradient from 'react-native-linear-gradient';

import NavigationService from '../../helpers/NavigationService';



import SectionTitle from './SectionTitle'
import TextRegular from '../ui/TextRegular';
import TextMedium from '../ui/TextMedium';
import TextHeavy from '../ui/TextHeavy';

import {MarkerSvg,BookmarkSvg} from '../icons/ButtonSvgIcons';

import Reviews from '../Reviews';

import {translate} from "../../helpers/i18n";
import {extractPostParams}  from "../../helpers/store";

import {fomartCurrOut} from '../../helpers/currency';


const horizontalMargin = 15;
const sliderWidth = Dimensions.get('window').width;
const itemWidth = sliderWidth;
const slideWidth = sliderWidth - 3*horizontalMargin;
// const itemHeight = Dimensions.get('window').height - 290; // iphone x ok // 515; 

export default class DiscoverCarousel extends React.Component{
  	constructor(props){
	    super(props)
        this.state = {viewableItems: [0,1]}

        this._carousel = null;


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
    _renderItem = ({item, index}) => {
        let slideStyle = styles.slide
        if( Platform.OS === 'android' && index == 0 ){
            slideStyle = [slideStyle,{paddingLeft: horizontalMargin}]
        }
        return (
            <View style={slideStyle}>
                <Card id={item.ID} cIndex={index} post={item} onPress={()=>this.goToListing(item)} overlay={null != this.props.overlay && this.props.overlay == false ? false : true }/>
            </View>
        );
    }

    render () {
        const _self = this
        const {title,data} = this.props.eleObj
        // const {data} = _self.state
        const cardOffset = Platform.OS === 'ios' ? slideWidth - 20 : 20
        return (
            <View style={[styles.container,_self.props.style]}>
                { null != title && title != '' && <TextHeavy style={[styles.title,{color: _self.props.apColors.hText, }]}>{title}</TextHeavy> }
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={data}
                    renderItem={this._renderItem}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    style={{flex:1}}
                    layout={'stack'} 
                    layoutCardOffset={cardOffset}
                />
            </View>
        );
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

        let cardStyle = styles.card
        if( Platform.OS === 'android' && this.props.cIndex == 0 ){
            cardStyle = [cardStyle,{width: sliderWidth - 2*horizontalMargin}]
        }

        return (
            <View style={cardStyle}>
                <TouchableOpacity onPress={ this.props.onPress } style={{flex:1}}>
                    

                        <View style={styles.cardThumbnail}>
                            { loaded === true && null != thumbnail && thumbnail !== '' && <Image source={{uri:thumbnail}} style={styles.cardImage}/> }
                        </View>

                        {this.props.overlay && <LinearGradient colors={['rgba(0,0,0,0.0)','rgba(0,0,0,0.5)']} style={styles.linearGradient}></LinearGradient>}

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
        minHeight: 150,
        // backgroundColor: '#ccc',
        
        paddingTop: 10,
        // paddingLeft: 15,
        // paddingRight: 10,

        // marginBottom: 20,
        // paddingBottom: 10,
        marginTop: 20,
        flex: 1,
    },
    title: {
        fontSize: 30,
        
        lineHeight: 41,
        marginBottom: 20,
        paddingHorizontal: 15,
    },
    slide: {
        width: itemWidth,
        // height: itemHeight,
        height: '100%',
        // paddingHorizontal: horizontalMargin
        // paddingRight: 2*horizontalMargin,
        // paddingLeft: horizontalMargin,
        // other styles for the item container
        ...Platform.select({
            ios: {
                paddingRight: 2*horizontalMargin,
                paddingLeft: horizontalMargin,
            },
            android: {
                paddingLeft: 2*horizontalMargin,
                paddingRight: horizontalMargin,
            },
        }),
    },
    linearGradient: {
        position: 'absolute',
        // top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 3,
        height: '60%',
    },
    card: {
        flex: 1,
        width: slideWidth,
        // width: 330,
        // height: 515,
        // marginRight: 17,
        // marginBottom: 15,
        // alignItems: 'center',
        // padding: 20,
        borderRadius: 16,
        overflow: 'hidden',

        shadowColor: '#BEC2CE',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.8,
        shadowRadius: 20,  
        elevation: 0,

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

        zIndex: 15,
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

        zIndex: 5,
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
