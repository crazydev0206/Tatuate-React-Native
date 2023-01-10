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

import SignInScreen from './bookings/SignIn';


import {translate} from "../helpers/i18n";
import {fomartCurrOut,formatFloat,formatInt} from '../helpers/currency';
import {extractPostParams,isUserLoggedIn}  from "../helpers/store";

import LList from '../components/inners/LList';


import TextRegular from '../components/ui/TextRegular';
import TextMedium from '../components/ui/TextMedium';
import TextHeavy from '../components/ui/TextHeavy';

import Loader from '../components/Loader';

import { getBookings } from '../actions/user';
import { connect } from 'react-redux';

class BookingsScreen extends React.Component{
    constructor(props){
        super(props)
        this.state = { paged: 1 }

        
    }
    componentDidMount(){
        const {isLoggedIn, ID} = this.props.user
        if( isLoggedIn ){
            this.props.getBookings( ID )
        }
    }
    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        const {isLoggedIn, ID} = this.props.user
        if( isLoggedIn && ID !== prevProps.user.ID ){
            this.setState({paged: 1})
            this.props.getBookings( ID )
        }
    }
    onEndReached(info){
        const {ID,bkspages,lmore} = this.props.user
        if( lmore === false && bkspages > 0 ){
            let {paged} = this.state
            this.props.getBookings( ID, ++paged, true )
            this.setState({paged})
        }
    }
    onRefresh(){
        this.props.getBookings(this.props.user.ID)
        this.setState({paged: 1})
    }
    goToSingle(p){
        let params = {id: p.ID}
        params.backRoute = 'Bookings';
        this.props.navigation.navigate('SBooking', params );
    }
    render(){
        const _self = this
        const {apColors} = _self.props;
        const {isLoggedIn, bookings, loading, lmore, bkspages} = _self.props.user
        // let bookmarksPosts = []
        // if( Array.isArray(bookings) && bookings.length > 0 ){
        //     const {listings} = _self.props.site;
        //     bookings.forEach(bm => {
        //         // const bmPost = listings.find( lpost => lpost.ID == bm )
        //         // if( null != bmPost ) 

        //         bookmarksPosts.push( bm )
        //     });
        // }
        
        return(
            <View style={[styles.container,{backgroundColor: apColors.secondBg,}]}>
                
                { 1 == 2 && loading === true && <Loader loading={true}/> }
                <FlatList

                    data={bookings}
                    renderItem={({ item, index }) => (
                        <Card id={item.ID} post={item} onPress={()=>_self.goToSingle(item)} apColors={apColors}/>
                    )}
                    keyExtractor={item => String(item.ID)}
                    // extraData={selected}
                    style={styles.flatList}
                    // horizontal={true}
                    // showsHorizontalScrollIndicator={false}
                    // viewabilityConfig={_self.viewabilityConfig}
                    // onViewableItemsChanged={_self.onViewableItemsChanged}
                    onRefresh={()=>_self.onRefresh()}
                    refreshing={loading}

                    onEndReached={(info)=>this.onEndReached(info)}
                    onEndReachedThreshold={0.1}

                    ListEmptyComponent={()=><View style={styles.listEmpty}><TextRegular style={{color: apColors.lMoreText,fontSize:15,textAlign:'center'}}>{ loading ? translate('bookings','loading') : translate('bookings','no_results') }</TextRegular></View>}
                    ListFooterComponent={()=><View style={styles.listFooter}>{lmore && <ActivityIndicator animating={true}/>}{ bookings.length > 0 && bkspages == 0 && <TextRegular style={{color: apColors.lMoreText,fontSize:15,textAlign:'center'}}>{translate('bookings','no_more')}</TextRegular>}</View>}
                />
            </View>
        )
    }
}

//Map the redux state to your props.
const mapStateToProps = state => ({
    user: state.user,
    site: state.site,
})

//Map your action creators to your props.
const mapDispatchToProps = {
    getBookings
}

//export your list as a default export 
export default connect(mapStateToProps, mapDispatchToProps)(BookingsScreen);


function Card(props){
    const {apColors} = props;
    const {ltitle,thumbnail,address,total, status} = props.post;
    return (
        <View style={[styles.cardWrap,{backgroundColor: apColors.appBg,borderColor: apColors.separator,}]}>
            <TouchableOpacity onPress={ props.onPress } style={styles.cardInner}>
                <View style={styles.bkListingWrap}>
                    { null != thumbnail && '' != thumbnail && <Image source={{uri:thumbnail}} style={[styles.cardImage,{borderColor: apColors.separator,}]}/> }
                    <View style={styles.bkListingRight}>
                        <TextMedium style={styles.lTitle}>{ltitle}</TextMedium>
                        {null != address && address !== '' && <TextRegular style={[styles.lAddress,{color: apColors.addressText,}]}>{address}</TextRegular>}
                    </View>
                </View>
                
                <View style={[styles.bkTotal,{borderTopColor: apColors.separator,}]}>
                    
                    <TextRegular style={styles.totalText}>{translate('bookings','total')}</TextRegular>

                    <TextHeavy style={[styles.totalAmount,{color: apColors.appColor,}]}>{fomartCurrOut(total)}</TextHeavy>
                    
                    
                    
                </View>
                <View style={[styles.bkTotal,{borderTopColor: apColors.separator,}]}>
                    <TextRegular style={styles.totalText}>{translate('bookings','status')}</TextRegular>
                    <TextHeavy style={styles.totalText}>{translate('bookings',status)}</TextHeavy>
                </View>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: 15,
        
    },
    flatList: {
        paddingTop: 15,
    },
    cardWrap: {
        
        paddingHorizontal: 15,
        paddingVertical: 20,
        marginBottom: 10,

        borderTopWidth: 1,
        borderBottomWidth: 1,
        
    },
    cardInner: {
        // flexDirection: 'row',
    },
    // listing
    bkListingWrap: {
        flexDirection: 'row',
    },
    bkListingRight: {
        flex: 1,
    },
    lTitle: {
        fontSize: 15,
        lineHeight: 20,
    },
    cardImage: {
        // minHeight: 100,
        // borderRadius: 5, 
        // overflow: 'hidden',
        
        marginRight: 10,
        width: 60,
        height: 60,
        borderWidth: 1,
        
    },
    bkTotal: {
        borderTopWidth: 0.5,
        
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        paddingTop: 10,

        // backgroundColor: 'red',
    },
    totalText: {
        fontSize: 17,
        lineHeight: 22,
    },
    totalAmount: {
        fontSize: 17,
        lineHeight: 22,
        
    },
    cardTitle: {
        fontSize: 20,
        lineHeight: 24,
        marginRight: 25,
        // marginBottom: 10
    },
    bookmarkIcon: {
        position: 'absolute',
        top: -2,
        right: 0,
    },
    lAddress: {
        fontSize: 11,
        
        lineHeight: 15,
        marginTop: 2,
    },
    listEmpty: {
        paddingVertical: 20,
    },
    listFooter: {
        paddingVertical: 20,
    },
});
