import React from 'react';
import {
    View,
    Image,
    FlatList,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    StyleSheet
} from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';


import {filterListings} from '../helpers/store';
import NavigationService from '../helpers/NavigationService';

import {translate} from "../helpers/i18n";
import {extractPostParams}  from "../helpers/store";

import {MapSvg} from '../components/icons/ButtonSvgIcons';

import LList from '../components/inners/LList';
import LCard from '../components/inners/LCard';

import TextRegular from '../components/ui/TextRegular';
import TextMedium from '../components/ui/TextMedium';


import Loader from '../components/Loader';
import { connect } from 'react-redux';

// https://stackoverflow.com/questions/1068834/object-comparison-in-javascript
// const compareState = (o1, o2) =>{
//     for(var p in o1){
//         if(o1.hasOwnProperty(p)){
//             if(o1[p] !== o2[p]){
//                 return false;
//             }
//         }
//     }
//     for(var p in o2){
//         if(o2.hasOwnProperty(p)){
//             if(o1[p] !== o2[p]){
//                 return false;
//             }
//         }
//     }
//     return true;
// }

const countProps = (obj) => {
    let count = 0;
    for (let k in obj) {
        if (obj.hasOwnProperty(k)) {
            count++;
        }
    }
    return count;
};

const compareState = (v1, v2) =>{
    if (typeof(v1) !== typeof(v2)) {
        return false;
    }

    if (typeof(v1) === "function") {
        return v1.toString() === v2.toString();
    }

    if (v1 instanceof Array && v2 instanceof Array) {
        // compare lengths - can save a lot of time
        if (v1.length != v2.length)
            return false;
        let rn = true;
        for (let i = 0; i < v1.length; i++) {
            // Check if we have nested arrays
            if (v1[i] instanceof Object && v2[i] instanceof Object) {
                // recurse into the nested arrays
                rn = compareState(v1[i], v2[i]);
                if (!rn) {
                    return false;
                }
            }
            else if (v1[i] != v2[i]) {
                // Warning - two different object instances will never be equal: {x:20} != {x:20}
                return false;
            }
        }
        return true;
    } else if (v1 instanceof Object && v2 instanceof Object) {
        if (countProps(v1) !== countProps(v2)) {
            return false;
        }
        let r = true;
        for (let k in v1) {
            r = compareState(v1[k], v2[k]);
            if (!r) {
                return false;
            }
        }
        return true;
    } else {
        return v1 === v2;
    }
}
class ArchiveScreen extends React.Component{
    constructor(props){
        super(props)
        this.state = { filter: {}, paged: 1 }
    }
    static navigationOptions = ({ navigation, route }) => {
        let tStyle = styles.filterText
        if( null != route.params && null != route.params.appColor ){
            tStyle = [tStyle,{color: route.params.appColor}]
        }
        return {
            title: translate('ac_screen'),
            headerRight: () => {
                return <TouchableOpacity onPress={()=>navigation.navigate('Filter')} style={styles.filterBtn}><TextMedium style={tStyle}>{translate('archive','filter')}</TextMedium></TouchableOpacity>
            },
        };
    }
    static getDerivedStateFromProps(props, state) {
        // Store prevId in state so we can compare when props change.
        // Clear out previously-loaded data (so we don't render stale stuff).
        if( compareState(props.filter, state.filter) == false ){
            let newState = {...props.filter}
            filterListings( {...newState, paged: 1} )
            return {filter: newState, paged: 1}
        }

        // No state update necessary
        return null;
    }

    goToListing(p){
        NavigationService.navigate('Listing', extractPostParams(p) );
    }
    onEndReached(info){
        const {pages,lmore} = this.props.listings
        if( lmore === false && pages > 0 ){
            let {paged, filter} = this.state
            const params = {...filter, paged: ++paged }
            filterListings(params, true )
            this.setState({paged})
        }
    }
    render(){
        const _self = this
        const {apColors} = _self.props
        const {loading, items, pages, lmore} = _self.props.listings
        let CardCom = LList,
            cardCols = 1,
            flatListStyle = styles.flatList;
        if( null != _self.props.filter && null != _self.props.filter.layout && _self.props.filter.layout === 'grid' ){
            CardCom = LCard;
            cardCols = 2;
            flatListStyle = [styles.flatListGrid,{backgroundColor: apColors.secondBg,}];
        }
        return(
            <SafeAreaInsetsContext.Consumer style={{flex: 1}}>
                {insets => <View style={[styles.container,{backgroundColor: apColors.appBg,paddingBottom: insets.bottom,paddingLeft: insets.left,paddingRight: insets.right}]}>
                    { loading === true && <Loader loading={true}/> }
                    <FlatList

                        data={items}
                        renderItem={({ item, index }) => (
                            <CardCom id={item.ID} post={item} onPress={()=>_self.goToListing(item)} bookmarks={_self.props.user.bookmarks}/>
                        )}
                        keyExtractor={item => String(item.ID)}
                        // extraData={selected}
                        style={flatListStyle}
                        numColumns={cardCols}
                        key={cardCols}
                        // horizontal={true}
                        // showsHorizontalScrollIndicator={false}
                        // viewabilityConfig={_self.viewabilityConfig}
                        // onViewableItemsChanged={_self.onViewableItemsChanged}

                        onEndReached={(info)=>this.onEndReached(info)}
                        onEndReachedThreshold={0.1}


                        ListEmptyComponent={()=><View style={styles.listEmpty}><TextRegular style={{color: apColors.lMoreText,fontSize:15,textAlign:'center'}}>{translate('archive','no_results')}</TextRegular></View>}
                        ListFooterComponent={()=><View style={styles.listFooter}>{lmore && <ActivityIndicator animating={true}/>}{ items.length > 0 && pages == 0 && <TextRegular style={{color: apColors.lMoreText,fontSize:15,textAlign:'center'}}>{translate('archive','no_more')}</TextRegular>}</View>}
                    />
                    <TouchableOpacity onPress={()=>_self.props.navigation.navigate('Map')} style={styles.viewMapWrap}>
                        <MapSvg color="#FFF"/>
                        {/*<TextRegular style={styles.mapText}>Map</TextRegular>*/}
                    </TouchableOpacity>
                </View>}
            </SafeAreaInsetsContext.Consumer>
        )
    }
}


//Map the redux state to your props.
const mapStateToProps = state => ({
    filter: state.filter,
    listings: state.listings,
    user: state.user,
})

//Map your action creators to your props.
const mapDispatchToProps = {
}

//export your list as a default export
export default connect(mapStateToProps, mapDispatchToProps)(ArchiveScreen);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: 15,

    },
    filterBtn: {
        marginRight:10,
        height: 28,
        width: 50,
        justifyContent:'center'
    },
    filterText: {
        fontSize: 17,
        textAlign: 'right',
        // color: colors.appColor,
    },
    flatList: {
        // flex: 1,
        paddingHorizontal: 15,
    },
    flatListGrid: {
        // flex: 1,
        paddingHorizontal: 7.5,
        paddingTop: 15,

    },
    listEmpty: {
        paddingVertical: 20,
    },
    listFooter: {
        paddingVertical: 20,
    },
    // view map button
    viewMapWrap: {
        position: 'absolute',
        bottom: 50,
        right: 20,
        zIndex: 200,
        backgroundColor: '#CCC',
        width: 40,
        height: 40,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapText: {
        marginTop: 5,
        color: '#FFF',
    },
});
