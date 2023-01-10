import React from 'react';
import { 
    View,
    Image,
    FlatList,
    TouchableOpacity,
    ScrollView, 
    StyleSheet 
} from 'react-native';

import SignInScreen from './bookmarks/SignIn';


import {translate} from "../helpers/i18n";
import {extractPostParams,isUserLoggedIn}  from "../helpers/store";

import LList from '../components/inners/LList';


import TextRegular from '../components/ui/TextRegular';
import TextMedium from '../components/ui/TextMedium';
import TextHeavy from '../components/ui/TextHeavy';
import {BookmarkSvg} from '../components/icons/ButtonSvgIcons';


import Reviews from '../components/Reviews';
import { connect } from 'react-redux';

class BookmarksScreen extends React.Component{
    constructor(props){
        super(props)
        this.state = { data: [] }
    }
    goToListing(p){
        let params = extractPostParams(p)
        params.backRoute = 'Bookmarks';
        this.props.navigation.navigate('Listing', params );
    }
    render(){
        const _self = this
        const {apColors} = _self.props;
        const {isLoggedIn, bookmarks} = _self.props.user
        let bookmarksPosts = []
        if( Array.isArray(bookmarks) && bookmarks.length > 0 ){
            const {listings} = _self.props.site;
            bookmarks.forEach(bm => {
                const bmPost = listings.find( lpost => lpost.ID == bm )
                if( null != bmPost ) bookmarksPosts.push( bmPost )
            });
        }
        return(
            <View style={[styles.container,{backgroundColor: apColors.secondBg,}]}>
                
                <FlatList

                    data={bookmarksPosts}
                    renderItem={({ item, index }) => (
                        <LList id={item.ID} post={item} onPress={()=>_self.goToListing(item)} bookmarks={bookmarks} style={[styles.bmLList,{backgroundColor: apColors.appBg,shadowColor: apColors.shadowCl,}]} apColors={apColors}/>
                        // <Card id={item.ID} post={item} onPress={()=>_self.goToListing(item)}/>
                    )}
                    keyExtractor={item => String(item.ID)}
                    // extraData={selected}
                    // style={styles.scrollView}
                    // horizontal={true}
                    // showsHorizontalScrollIndicator={false}
                    // viewabilityConfig={_self.viewabilityConfig}
                    // onViewableItemsChanged={_self.onViewableItemsChanged}
                    ListEmptyComponent={()=><View style={styles.listEmpty}><TextRegular style={{color: apColors.lMoreText,fontSize:15,textAlign:'center'}}>{translate('bookmarks','no_results')}</TextRegular></View>}
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

}

//export your list as a default export 
export default connect(mapStateToProps, mapDispatchToProps)(BookmarksScreen);


function Card(props){
    return (
        <View style={[styles.cardWrap,{backgroundColor: props.apColors.appBg,shadowColor: props.apColors.shadowCl,}]}>
            <TouchableOpacity onPress={ props.onPress } style={styles.cardInner}>
                { null != props.post.thumbnail && '' != props.post.thumbnail && <Image source={{uri:props.post.thumbnail}} style={styles.cardImage}/> }
                <View style={styles.cardDetails}>
                    <TextHeavy style={styles.cardTitle}>{props.post.title}</TextHeavy>
                    <BookmarkSvg style={styles.bookmarkIcon}/>
                    {null != props.post.address && props.post.address !== '' && <TextRegular style={[styles.lAddress,{color: props.apColors.addressText,}]}>{props.post.address}</TextRegular>}
                    <Reviews rating={props.post.rating} showNum={true} style={{marginTop: 5}}/>
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

    cardWrap: {
        
        borderRadius: 8, 
        // overflow: 'hidden',
        paddingHorizontal: 15,
        paddingVertical: 20,
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15,

        
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 10,  
        elevation: 1,
    },
    bmLList: {
        
        borderRadius: 8, 
        paddingHorizontal: 15,
        paddingVertical: 20,

        marginTop: 15,
        marginLeft: 15,
        marginRight: 15,

        
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 10,  
        elevation: 1,
    },
    cardInner: {
        flexDirection: 'row',
    },
    cardImage: {
        minHeight: 100,
        borderRadius: 5, 
        overflow: 'hidden',
        flex: 1,
        marginRight: 17,
    },
    cardDetails: {
        // paddingLeft: 20,
        flex: 2,
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
        fontSize: 13,
        
        lineHeight: 18,
        marginTop: 2,
    },
    listEmpty: {
        paddingVertical: 20,
    },
});
