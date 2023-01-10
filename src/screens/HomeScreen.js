// import * as WebBrowser from 'expo-web-browser';
// import { WebView } from 'react-native-webview';
import React, {useEffect, useState} from 'react';
import {
    ImageBackground,
    Image,
    TextInput,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View,
    Button,
    Dimensions,
    RefreshControl,
    Platform,
    PermissionsAndroid
} from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';

// import * as expoLocation from 'expo-location';
// import * as expoPermissions from 'expo-permissions';
import Geolocation from '@react-native-community/geolocation';

import LList from '../components/inners/LList';


import {filterByLoc,filterByCat,filterNearBy,getSiteDatas} from '../helpers/store';
import {translate} from "../helpers/i18n";
import {extractPostParams}  from "../helpers/store";

import TextRegular from '../components/ui/TextRegular';
import TextMedium from '../components/ui/TextMedium';
import TextHeavy from '../components/ui/TextHeavy';

import {SearchSvg,CloseSvg,AvatarSvg,MarkerSvg,LightningSvg,PinterSvg} from '../components/icons/ButtonSvgIcons';


// import { MonoText } from '../components/StyledText';

// import TextHeavy from '../components/ui/TextHeavy';
// import TextBold from '../components/ui/TextBold';



import Search from '../components/explore/Search';
import CatsSquare from '../components/explore/CatsSquare';
import Categories from '../components/explore/Categories';
import CircleCats from '../components/explore/CircleCats';
import CatsCol from '../components/explore/CatsCol';

// import Discover from '../components/explore/Discover';
import DiscoverNew from '../components/explore/DiscoverNew';
import DiscoverCarousel from '../components/explore/DiscoverCarousel';
import Popular from '../components/explore/Popular';


import LocationsCol from '../components/explore/LocationsCol';
import Locations from '../components/explore/Locations';

import ImageBanner from '../components/explore/ImageBanner';

// import Reviews from '../components/Reviews';

// import Colors from '../constants/Colors';

// for redux
import { connect } from 'react-redux';

class HomeScreen extends React.Component{
    constructor(props){
        super(props)
        this.state = {data: [], showSearch: false, stext: '', results: [], showClear: false, scrollDir: '' }

        
        
        this.searchInput = null;

        // this.goToListing = this.goToListing.bind(this)

    }
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
        };
    };
    goToListing(p){
        this.props.navigation.push('Listing', extractPostParams(p) );
    }
    openSearch(){
        // hide tab
        const {showSearch} = this.state;
        this.props.navigation.setParams({ hideTabBar: !showSearch });
        this.setState({showSearch: !showSearch})
        
        setTimeout(()=>{
            if( null != this.searchInput ) this.searchInput.focus();
        }, 1000);
    }
    hideSearch(){
        this.setState({showSearch: false, showClear: false ,stext: ''})
        this.props.navigation.setParams({ hideTabBar: false });
    }
    onInputChange = (stext)=>{
        let {showClear} = this.state
        let results = [];
        if( stext.length > 0 ){
            showClear = true;
            let sLText = stext.toLowerCase()
            if( null != this.props.site ){
                // search for listings
                const {listings} = this.props.site;
                if( null != listings && Array.isArray(listings) && listings.length > 0 ){
                    const resultListings = listings.filter(lpost => null != lpost.title && lpost.title.toLowerCase().indexOf(sLText) !== -1 )
                    if( Array.isArray(resultListings) && resultListings.length > 0 ){
                        resultListings.forEach( rtax => {
                            results.push( {
                                type: 'listing',
                                title: rtax.title,
                                id: rtax.ID,
                                thumbnail: rtax.thumbnail,
                            } );
                        } );
                    }
                }
                // search for locs
                const {locs} = this.props.site;
                if( null != locs && Array.isArray(locs) && locs.length > 0 ){
                    const resultLocs = locs.filter(tax => null != tax.title && tax.title.toLowerCase().indexOf(sLText) !== -1 )
                    if( Array.isArray(resultLocs) && resultLocs.length > 0 ){
                        resultLocs.forEach( rtax => {
                            results.push( {
                                type: 'loc',
                                title: rtax.title,
                                id: rtax.id,
                            } );
                        } );
                    }
                }
                // search for cats
                const {cats} = this.props.site;
                if( null != cats && Array.isArray(cats) && cats.length > 0 ){
                    const resultCats = cats.filter(tax => null != tax.title && tax.title.toLowerCase().indexOf(sLText) !== -1 )
                    if( Array.isArray(resultCats) && resultCats.length > 0 ){
                        resultCats.forEach( rtax => {
                            results.push( {
                                type: 'cat',
                                title: rtax.title,
                                id: rtax.id,
                            } );
                        } );
                    }
                }
                // end search items
            }

        }else{ // end check text length
            showClear = false
        }
            
        this.setState({showClear, stext, results})
    }
    onClearText(){
        this.setState({stext: '', showClear: false })
    }
    onClickLoc(term){
        const {id} = term;
        if( null != id ){
            filterByLoc( id )
            this.props.navigation.navigate('Archive')
        }
    }
    onClickCat(term){
        const {id} = term;
        if( null != id ){
            filterByCat( id )
            this.props.navigation.navigate('Archive')
        }
    }
    getGeoLocation = async () => {
        let location = await Geolocation.getCurrentPosition(location => {
            if( null != location.coords ){
                const {latitude,longitude} = location.coords
                filterNearBy( latitude, longitude )
                this.props.navigation.navigate('Archive')
            }
        });
    }
    _onNearBy = async () => {
        if(Platform.OS === 'ios'){
            Geolocation.requestAuthorization();
            this.getGeoLocation();
        }else {
            try{
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        'title': translate('locrequest','title'),
                        'message': translate('locrequest','message')
                    }
                )
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    // console.log("You can use the location")
                    // alert("You can use the location");

                    this.getGeoLocation();

                } else {
                    // console.log("location permission denied")
                    alert(translate('locrequest','denied'));
                }
            }catch(e){
                console.log(e);
            }
                

        }

        // let { status } = await expoPermissions.askAsync(expoPermissions.LOCATION);
        // if (status !== 'granted') {
        //     // this.setState({
        //     //     errorMessage: 'Permission to access location was denied',
        //     // });
        //     console.log('not granted');
        // }
        // let location = await expoLocation.getCurrentPositionAsync({});

        // let location = await Geolocation.getCurrentPosition(location => {
        //     if( null != location.coords ){
        //         const {latitude,longitude} = location.coords
        //         filterNearBy( latitude, longitude )
        //         this.props.navigation.navigate('Archive')
        //     }
        // });
            
    }
    onClickListing(post){
        const {id,title} = post;
        if( null != id ){
            this.props.navigation.navigate('Listing', { id, title, auid: post.author_id, auname: post.author_name });
        }
        
    }
    _renderResults(){
        const {apColors} = this.props;
        const {results} = this.state;
        let jsx = []
        results.slice(0, 21).forEach( (result, index) => {
            switch(result.type) {
                case 'loc':
                    
                    jsx.push( <TouchableOpacity key={index} style={[styles.resultWrap,{borderBottomColor: apColors.separator,}]} onPress={()=>this.onClickLoc(result)}>
                        <View style={[styles.resultIcon,{backgroundColor: apColors.searchIconBg,borderColor: apColors.separator,}]}><PinterSvg width={13} color="#FFF"/></View>
                        <View style={styles.resultTitle}><TextMedium style={[styles.resultText,{color: apColors.taxTitle,}]}>{result.title}</TextMedium></View>
                    </TouchableOpacity> )

                    break;
                case 'cat':
                    
                    jsx.push( <TouchableOpacity key={index} style={[styles.resultWrap,{borderBottomColor: apColors.separator,}]} onPress={()=>this.onClickCat(result)}>
                        <View style={[styles.resultIcon,{backgroundColor: apColors.searchIconBg,borderColor: apColors.separator,}]}><LightningSvg width={12} color="#FFF"/></View>
                        <View style={styles.resultTitle}><TextMedium style={[styles.resultText,{color: apColors.taxTitle,}]}>{result.title}</TextMedium></View>
                    </TouchableOpacity> )

                    break;
                case 'listing':
                    
                    jsx.push( <TouchableOpacity key={index} style={[styles.resultWrap,{borderBottomColor: apColors.separator,}]} onPress={()=>this.onClickListing(result)}>
                        { null != result.thumbnail && '' != result.thumbnail && <Image source={{uri: result.thumbnail}} style={styles.resultThumbnail}/> }
                        <View style={styles.resultTitle}><TextMedium style={[styles.resultText,{color: apColors.taxTitle,}]}>{result.title}</TextMedium></View>
                    </TouchableOpacity> )
            }
                    
        } );
        return(
            <View style={styles.searchResults}>{jsx}</View>
        );
    }
    onViewScroll(evt){
        if( null != evt ){
            const {y} = evt.nativeEvent.contentOffset;
           
            let scrollDir = '';
            if( y > 20 ){
                scrollDir = 'up';
            }else{
                scrollDir = 'down';
            }
            this.setState({ scrollDir })
        }
    }
    onRefresh(){
        getSiteDatas()
    }
    render(){
        const _self = this
        const {loading, apColors} = _self.props;
        const {showClear,stext,results,showSearch, scrollDir} = _self.state;
        let headerSearchStyle = [styles.headerSearch,{backgroundColor: apColors.appBg,}];
        if( scrollDir == 'up' ) headerSearchStyle = [headerSearchStyle,styles.headerSearchUp,{shadowColor: apColors.shadowCl,}]
        // user avatar
        const {isLoggedIn, avatar} = this.props.user
        const {explore, listings} = _self.props.site
        const featuredListings = null != listings && Array.isArray(listings) && listings.length > 0 ? listings.filter( lpost => lpost.isFeatured == true ).slice(0, 5) : [];
        
        let disHeight = Dimensions.get('window').height - 50 - 50 - 20 - 30; // top - bot - margin top - bottom gap

        
        return (
            <SafeAreaInsetsContext.Consumer style={{flex: 1}}>
                {insets => <View style={[styles.container,{backgroundColor: apColors.appBg, paddingTop: insets.top,paddingLeft: insets.left,paddingRight: insets.right}]}>

                    
                    
                    <View style={headerSearchStyle}>
                        <TouchableOpacity onPress={()=>this.openSearch()} style={{flex:1 ,height: 40,}}>
                            <Search />
                        </TouchableOpacity>
                        
                        {( isLoggedIn === true ? 
                            <TouchableOpacity style={{paddingLeft: 20}} onPress={()=>{this.props.navigation.navigate('ProfileStack', {screen: 'Profile'});}}>
                                { avatar ? <Image
                                    source={{uri: avatar}}
                                    style={[styles.avatar,{borderColor: apColors.avatarIcon,}]}
                                    resizeMode="cover"
                                /> : <View style={[styles.avatar,{borderColor: apColors.avatarIcon,alignItems:'center',justifyContent:'center'}]}><AvatarSvg fill={apColors.avatarIcon}/></View> }
                            </TouchableOpacity>
                            :
                            <TouchableOpacity  style={{paddingLeft: 20}} onPress={()=>{this.props.navigation.navigate('SignIn');}}>
                                <View style={[styles.avatar,{borderColor: apColors.avatarIcon,alignItems:'center',justifyContent:'center'}]}><AvatarSvg fill={apColors.avatarIcon}/></View>
                            </TouchableOpacity>
                        )}
                            
                    </View>

                    { showSearch && <View style={[styles.realSearch,{backgroundColor: apColors.appBg,paddingTop: insets.top, paddingBottom: insets.bottom,paddingLeft: insets.left,paddingRight: insets.right}]}>
                        <View style={styles.realSearchWrap}>
                                
                                <View style={[styles.searchHead,{borderBottomColor: apColors.separator,}]}>
                                    
                                    <View style={[styles.searchForm,{backgroundColor: apColors.searchBg,}]}>
                                        <SearchSvg style={styles.searchIcon}/>
                                        <TextInput 
                                            placeholder={translate('home','search')}
                                            placeholderTextColor={apColors.searchText}
                                            style={[styles.searchInput,{color: apColors.searchText,}]}
                                            onChangeText={_self.onInputChange}
                                            // onFocus={e=>this.onFucusInput('log')}
                                            returnKeyType='search'
                                            onSubmitEditing = {()=>console.log('onSubmitEditing')}
                                            autoCorrect={false}
                                            underlineColorAndroid='transparent'
                                            autoCapitalize="none"
                                            autoCompleteType="off"
                                            // keyboardType="email-address"
                                            value={stext}
                                            ref={ input => _self.searchInput = input }
                                        />
                                        { showClear && <TouchableOpacity style={styles.clearBtn} onPress={()=>_self.onClearText()}><View style={[styles.clearBtnInner,{backgroundColor: apColors.searchText,}]}><CloseSvg fill={apColors.appBg} width={8} height={8}/></View></TouchableOpacity> }
                                    </View>

                                    <TouchableOpacity onPress={()=>_self.hideSearch()} style={styles.cancelButton}><TextMedium style={[styles.cancelText,{color: apColors.searchText,}]}>{translate('cancel')}</TextMedium></TouchableOpacity>
                                </View>
                                <ScrollView style={{flex:1}} contentContainerStyle={styles.searchContentContainer}>
                                    { results.length > 0 && _self._renderResults() }
                                    
                                    { 1 == 2 && <View style={styles.recentResults}>
                                        <View style={styles.resultsHead}>
                                            <TextHeavy style={[styles.searchSubTitle,{color: apColors.tText,}]}>Recent search</TextHeavy>
                                            <TextRegular style={[styles.clearRecent,{color: apColors.appColor,}]}>Clear all</TextRegular>
                                        </View>
                                    </View> }

                                    { results.length == 0 && <TouchableOpacity style={styles.nearbyWrap} onPress={()=>_self._onNearBy()}>
                                        <View style={[styles.nearbyIcon,{backgroundColor: apColors.searchIconBg,borderColor: apColors.separator,}]}><MarkerSvg color="#FFF"/></View><TextMedium style={[styles.resultText,{color: apColors.taxTitle,}]}>{translate('filter','nearme')}</TextMedium>
                                    </TouchableOpacity> }

                                    { results.length == 0 && <View style={styles.recentResults}>
                                        <View style={styles.resultsHead}>
                                            <TextHeavy style={[styles.searchSubTitle,{color: apColors.tText,}]}>{translate('home','recommend')}</TextHeavy>
                                            
                                        </View>
                                        { featuredListings.length> 0 && featuredListings.map( item => <LList key={item.ID} post={item} onPress={()=>_self.goToListing(item)} bookmarks={_self.props.user.bookmarks}/> ) }
                                    </View> }

                                </ScrollView>

                            </View>
                        </View>
                    }
                    <View style={styles.mainViewWrap}>
                        <ScrollView 
                        style={styles.scrollView} 
                        contentContainerStyle={styles.contentContainer} 
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl refreshing={loading} onRefresh={()=>_self.onRefresh()} />
                        }
                        >

                            


                            {
                                explore.map( (exp, idx ) => {
                                    if( null != exp.type ){
                                        switch(exp.type){
                                            case 'app_listings':
                                                if(exp.layout == 'slider') {
                                                    return <DiscoverCarousel key={idx} eleObj={exp} style={{height: disHeight - insets.top - insets.bottom}} overlay={true} apColors={apColors}/>
                                                }else if(exp.layout == 'carousel') {
                                                    return <DiscoverNew key={idx} eleObj={exp} apColors={apColors}/>
                                                // }else if(exp.layout == 'list') {
                                                }else { // list and grid
                                                    return <Popular key={idx} eleObj={exp}/>
                                                }
                                                
                                                break;
                                            case 'app_cats':
                                                if(exp.layout == 'square') {
                                                    return <CatsSquare key={idx} eleObj={exp}/>
                                                }else if(exp.layout == 'circle') {
                                                    return <CircleCats key={idx} eleObj={exp}/>
                                                }else if(exp.layout == 'grid') {
                                                    return <CatsCol key={idx} eleObj={exp}/>
                                                }else { // carousel
                                                    return <Categories key={idx} eleObj={exp}/>
                                                }

                                                
                                                break;
                                            case 'app_locs':
                                                if(exp.layout == 'grid') {
                                                    return <LocationsCol key={idx} eleObj={exp}/>
                                                }else { // carousel
                                                    return <Locations key={idx} eleObj={exp}/>
                                                }

                                                
                                                break;
                                            case 'app_banner':
                                                return <ImageBanner key={idx} eleObj={exp}/>
                                                break;
                                        }
                                    }
                                    
                                })
                            }


                        </ScrollView>

                    </View>
                </View>}
            </SafeAreaInsetsContext.Consumer>
        );
    }
}



//Map the redux state to your props.
const mapStateToProps = state => ({
    app: state.app,
    loading: state.loading,
    user: state.user,
    site: state.site,
})

//Map your action creators to your props.
const mapDispatchToProps = {
}

//export your list as a default export 
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        
        // marginLeft: 5,
        // marginRight: 5,
    },
    mainViewWrap: {
        flex: 1,
        // backgroundColor: '#ddd',
    },
    scrollView: {
        flex: 1,
    },
    contentContainer: {
        // flex: 1,
        paddingBottom: 15,
    },
    // home head search
    headerSearch: {
        marginTop: 17,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // backgroundColor: 'blue',
        paddingBottom: 10,

        
    },
    headerSearchUp: {
        
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 10,  
        elevation: 1,
    },
    avatar: {
        height: 30,
        width: 30,
        borderRadius: 15,
        borderWidth: 1,
        // borderStyle: 'solid',
        
    },
    // for real search view
    realSearch: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        
    },
    realSearchWrap: {
        flex: 1,
        marginTop: 17,
        // paddingHorizontal: 15,
        // backgroundColor: 'red',
    },
    // search view
    searchContentContainer: {
        // flex: 1,
        paddingTop: 20,
        paddingHorizontal: 15,
        // backgroundColor: 'yellow',
    },
    searchHead: {
        // flex: 1,
        paddingHorizontal: 15,
        // paddingTop: 32,
        paddingBottom: 10,

        borderBottomWidth: 1,
        

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        
        // backgroundColor: '#FFF',
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: .5 },
        // shadowOpacity: 0.2,
        // shadowRadius: 0,  
        // elevation: 1,
    },
    // searchTitle: {
    //     fontSize: 34,
    //     lineHeight: 41,
    //     color: '#1E2432',
    // },
    searchForm: {
        // width: 290,
        flex: 1,
        height: 40,
        
        borderRadius: 10,
        // borderStyle: 'solid',
        // borderWidth: 1,
        // borderColor: '#EAECEF',
        // borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',

        // marginTop: 20,
    },
    searchIcon: {
        width: 22,
        height: 22,
        marginLeft: 12,
        position: 'absolute',
        zIndex: 1,
    },
    searchInput: {
        flex: 1,
        height: 40,
        // backgroundColor: 'rgba(142,142,147,0.12)',
        // borderRadius: 10,

        paddingLeft: 37,
        paddingRight: 20,
        
        fontSize: 16,
        // backgroundColor: 'blue',
    },
    clearBtn: {
        padding: 10,

    },
    clearBtnInner: {
        width: 14,
        height: 14,
        borderRadius: 7,
        
        
        // marginRight: 5,
        // position: 'absolute',
        // zIndex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelButton: {
        padding: 5,
        // backgroundColor: 'purple',
        // backgroundColor: 'red',
        marginLeft: 15,
    },
    cancelText: {
        fontSize: 15,
        
    },
    searchResults: {
        marginBottom: 20,
    },
    // recent 
    resultsHead: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    searchSubTitle: {
        fontSize: 20,
        lineHeight: 25,
        
    },
    clearRecent: {
        
        fontSize: 15,
        lineHeight: 20,
    },
    // result item
    resultWrap: {
        // flex: 1,
        // backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',

        paddingVertical: 10,
        borderBottomWidth: 1,
        
        // marginBottom: 20,
    },
    resultIcon: {
        width: 30,
        height: 30,
        borderRadius: 4,
        
        borderWidth: 1,
        
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    resultThumbnail: {
        width: 30,
        height: 30,
        borderRadius: 4,
        marginRight: 15,
    },
    resultTitle: {

    },
    resultText: {
        fontSize: 17,
        lineHeight: 23,
        
    },
    nearbyWrap: {
        

        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    nearbyIcon: {
        // paddingVertical: 10,
        // paddingHorizontal: 20,
        // borderWidth: 1,
        // borderColor: '#EAECEF',
        // borderRadius: 4,
        // marginRight: 7,
        // // marginBottom: 7,

        width: 30,
        height: 30,
        borderRadius: 4,
        
        borderWidth: 1,
        
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
