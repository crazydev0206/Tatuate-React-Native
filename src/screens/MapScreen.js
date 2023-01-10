import React from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Platform,
    Dimensions,
} from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import MapView, {Marker, Circle} from 'react-native-maps';


import NavigationService from '../helpers/NavigationService';
import {extractPostParams}  from "../helpers/store";
import {fomartCurrOut,valid_coords} from '../helpers/currency';
import {translate} from "../helpers/i18n";

import CloseButton from '../components/inners/CloseButton';
import MapCard from '../components/inners/MapCard';

import TextMedium from '../components/ui/TextMedium';
import TextHeavy from '../components/ui/TextHeavy';

import { connect } from 'react-redux';

const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class MapScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {mIndex: 0}
        this.viewabilityConfig = {
            waitForInteraction: true,
            // viewAreaCoveragePercentThreshold: 95,
            itemVisiblePercentThreshold: 97,
        }
        this.onViewableItemsChanged = this.onViewableItemsChanged.bind(this)
        this.listingList = null
    }
    onViewableItemsChanged(info){
        // console.log('onViewableItemsChanged');
        let {mIndex} = this.state;
        const {viewableItems, changed} = info;
        // console.log(viewableItems);
        // console.log('oldIdx ' + mIndex);
        // let viewableIndexs = [], changedIndexs = [];
        if( null != viewableItems && Array.isArray(viewableItems) && viewableItems.length > 0 ){
            // let mIndex = 0;
            for (let i = 0; i < viewableItems.length; i++) {
                // console.log( viewableItems[i].index );
                if(mIndex != viewableItems[i].index){
                    mIndex = viewableItems[i].index
                    break;
                }
            }
            // console.log('mIndex ' + mIndex);
            this.setState( {mIndex} )

            // console.log('viewableIndexs ' + viewableIndexs);
        }
        // if( null != changed && Array.isArray(changed) && changed.length > 0 ){
        //     changedIndexs = changed.map(it=>it.index)

        //     console.log('changedIndexs ' + changedIndexs);
        // }
    }
    goToListing(p){
        NavigationService.navigate('Listing', extractPostParams(p) );
    }
    onMarkerPress(info,idx){
        // console.log(info);
        // console.log(idx);
        // console.log(this.listingList);
        if( null != this.listingList ){
            this.listingList.scrollToIndex({
                index: idx
            })
            // this.setState( {mIndex: idx} )
        }
    }
    _renderListings(items, bot){
        const lWidth = Dimensions.get('window').width/2.2;
        return (
            <View style={[styles.listingsWrap,{bottom: bot}]}>
                <FlatList
                    data={items}
                    renderItem={({ item, index }) => (
                        <MapCard id={item.ID} post={item} onPress={()=>this.goToListing(item)} bookmarks={[]} style={{width:lWidth}}/>
                    )}
                    keyExtractor={item => String(item.ID)}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    viewabilityConfig={this.viewabilityConfig}
                    onViewableItemsChanged={this.onViewableItemsChanged}
                    style={styles.flatList}
                    ref={flist=>this.listingList = flist}
                />
            </View>
        )
    }
    render() {
        const _self = this
        const {apColors} = _self.props;
        const {mIndex} = _self.state;
        const {items} = _self.props.listings
        // for circle nearby
        let {nearby, address_lat, address_lng, distance} = _self.props.filter
        let markers = [], idx = 0, region = {
            latitude: 41.0572159,
            longitude: -74.12218899999999,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        };
        if( nearby == 'on' && address_lng != '' && address_lat != '' ){
            address_lng = parseFloat(address_lng)
            address_lat = parseFloat(address_lat)

            region.latitude= address_lat;
            region.longitude= address_lng;
        }
        if( null != items && Array.isArray(items) && items.length > 0 ){
            items.forEach(lpost => {
                if( null != lpost.latitude && null != lpost.longitude && valid_coords(lpost.latitude, lpost.longitude) ){
                    markers.push({...lpost,
                        latitude: parseFloat(lpost.latitude),
                        longitude: parseFloat(lpost.longitude),
                    })
                    if( mIndex == idx ){
                        region.latitude= parseFloat(lpost.latitude);
                        region.longitude= parseFloat(lpost.longitude);
                    }
                    idx++
                }
            })
        }
        // console.log(nearby);
        // console.log(address_lng);
        // console.log(address_lat);
        // console.log(distance);
        return (
            <SafeAreaInsetsContext.Consumer style={{flex: 1}}>
                {insets => <View style={[styles.container,{paddingLeft: insets.left,paddingRight: insets.right}]}>
                    <View style={[styles.closeButton,{top: insets.top}]}><CloseButton color={apColors.backBtn} style={{width: 50}} onPress={()=>_self.props.navigation.goBack()}/></View>
                    <MapView
                        style={[styles.map,{backgroundColor: apColors.appBg,}]}
                        region={region}
                        // onPress = {this.onPress}
                        // mapType={Constants.Maps.type}
                        // ref={map => this.map = map}
                    >
                    { nearby == 'on' && address_lng != '' && address_lat != '' && markers.length > 0 && <Circle 

                        center={{
                            latitude: address_lat,
                            longitude: address_lng,
                        }} 
                        radius={parseFloat(distance)*1000}
                        fillColor="rgba(0,122,255,0.2)"
                        strokeColor="rgba(0,0,0,0.2)"
                    />}
                    { markers.map((marker,idx) => {
                        let mVStyle = [styles.markerView,{backgroundColor: apColors.appBg,}],
                            mTStyle = styles.markerText;
                        if( idx == mIndex ){
                            mVStyle = [mVStyle, {backgroundColor: apColors.appColor}]
                            mTStyle = [mTStyle, {color:'#FFF'}]
                        } 
                        return (
                            <Marker key={marker.ID}
                                coordinate={{
                                    latitude: parseFloat(marker.latitude),
                                    longitude: parseFloat(marker.longitude),
                                }}
                                title={marker.title}
                                description={marker.address}
                                onPress={info=>_self.onMarkerPress(info, idx)}
                            >
                                {marker.price != 0 && <View style={mVStyle}><TextHeavy style={mTStyle}>{fomartCurrOut(marker.price)}</TextHeavy></View>}
                            </Marker>
                        );
                    })}
                    </MapView>
                    {_self._renderListings(markers, insets.bottom)}
                </View>}
            </SafeAreaInsetsContext.Consumer>
        );
    }
}

//Map the redux state to your props.
const mapStateToProps = state => ({
    listings: state.listings,
    filter: state.filter,
})

//Map your action creators to your props.
const mapDispatchToProps = {
}

//export your list as a default export 
export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);



const styles = StyleSheet.create({
    container:{
        flex:1
    },
    closeButton: {
        marginTop: 6,
        height: 35,
        position: 'absolute',
        left: 10,
        zIndex: 3,
        // backgroundColor: 'red',
        // alignItems: 'center',
    },
    map: {
        flex:1,
    },
    listingsWrap: {
        minHeight: 200,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        paddingBottom: 15,
    },
    flatList: {
        flex: 1,
    },
    markerView: {
        
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 3,
    },
    markerText: {
        fontSize: 15,
        lineHeight: 18,
    },
});

