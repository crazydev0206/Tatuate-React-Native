import React from 'react';
import { 
    View, 
    Image,
    TextInput, 
    ScrollView,
    TouchableOpacity, 
    StyleSheet 
} from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';



import {filterByLoc,filterByCat} from '../helpers/store';
import {translate} from "../helpers/i18n";
import {extractPostParams}  from "../helpers/store";

import CloseButton from '../components/inners/CloseButton';

import TextRegular from '../components/ui/TextRegular';
import TextMedium from '../components/ui/TextMedium';
import TextHeavy from '../components/ui/TextHeavy';

import {SearchSvg,CloseSvg,MarkerSvg,LightningSvg,PinterSvg} from '../components/icons/ButtonSvgIcons';

import { connect } from 'react-redux';

class SearchScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {stext: '', results: [], showClear: false }
    }
    _renderHeader = (cstyle = {})=>{
        // {top: 30 + insets.top}
        return (
            <View style={[styles.navBar,cstyle]}>
                <CloseButton isBlack={true} style={{width: 50}} onPress={()=>this.props.navigation.goBack()}/>
                
            </View>
        )
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
    onClickListing(p){
        const {id} = p;
        if( null != id ){
            this.props.navigation.navigate('Listing', extractPostParams(p) );
        }
        
    }
    _renderResults(){
        const {results} = this.state;
        let jsx = []
        results.slice(0, 21).forEach( (result, index) => {
            switch(result.type) {
                case 'loc':
                    
                    jsx.push( <TouchableOpacity key={index} style={styles.resultWrap} onPress={()=>this.onClickLoc(result)}>
                        <View style={styles.resultIcon}><PinterSvg width={13} color="#FFF"/></View>
                        <View style={styles.resultTitle}><TextMedium style={styles.resultText}>{result.title}</TextMedium></View>
                    </TouchableOpacity> )

                    break;
                case 'cat':
                    
                    jsx.push( <TouchableOpacity key={index} style={styles.resultWrap} onPress={()=>this.onClickCat(result)}>
                        <View style={styles.resultIcon}><LightningSvg width={12} color="#FFF"/></View>
                        <View style={styles.resultTitle}><TextMedium style={styles.resultText}>{result.title}</TextMedium></View>
                    </TouchableOpacity> )

                    break;
                case 'listing':
                    
                    jsx.push( <TouchableOpacity key={index} style={styles.resultWrap} onPress={()=>this.onClickListing(result)}>
                        { null != result.thumbnail && '' != result.thumbnail && <Image source={{uri: result.thumbnail}} style={styles.resultThumbnail}/> }
                        <View style={styles.resultTitle}><TextMedium style={styles.resultText}>{result.title}</TextMedium></View>
                    </TouchableOpacity> )
            }
                    
        } );
        return(
            <View style={styles.searchResults}>{jsx}</View>
        );
    }
    render(){
        const _self = this
        const {showClear,stext,results} = _self.state;
        
        return (
            <SafeAreaInsetsContext.Consumer style={{flex: 1}}>
                    {insets => <View style={[styles.container,{paddingTop: insets.top,paddingBottom: insets.bottom,paddingLeft: insets.left,paddingRight: insets.right}]}>
                        <View style={{flex: 1}}>
                            {_self._renderHeader()}
                            <View style={{flex: 1}}>
                                <View style={styles.searchHead}>
                                    <TextHeavy style={styles.searchTitle}>Search</TextHeavy>
                                    <View style={styles.searchForm}>
                                        <SearchSvg style={styles.searchIcon}/>
                                        <TextInput 
                                            placeholder={translate('home','search')}
                                            style={styles.searchInput}
                                            onChangeText={_self.onInputChange}
                                            // onFocus={e=>this.onFucusInput('log')}
                                            returnKeyType='search'
                                            // onSubmitEditing = {this.nextField}
                                            autoCorrect={false}
                                            underlineColorAndroid='transparent'
                                            autoCapitalize="none"
                                            autoCompleteType="off"
                                            // keyboardType="email-address"
                                            value={stext}
                                        />
                                        { showClear && <TouchableOpacity style={styles.clearBtn} onPress={()=>_self.onClearText()}><View style={styles.clearBtnInner}><CloseSvg fill="#FFF" width={8} height={8}/></View></TouchableOpacity> }
                                    </View>
                                </View>
                                <ScrollView style={{flex:1}} contentContainerStyle={styles.contentContainer}>
                                    { results.length > 0 && _self._renderResults() }
                                    
                                    { 1 == 2 && <View style={styles.recentResults}>
                                        <View style={styles.resultsHead}>
                                            <TextHeavy style={styles.searchSubTitle}>Recent search</TextHeavy>
                                            <TextRegular style={styles.clearRecent}>Clear all</TextRegular>
                                        </View>
                                    </View> }

                                </ScrollView>
                            </View>
                        </View>
                    </View>}
            </SafeAreaInsetsContext.Consumer>
        );
    }
        
}

// SearchScreen.navigationOptions = {
//     title: 'Search',
// };

//Map the redux state to your props.
const mapStateToProps = state => ({
    site: state.site,
})

//Map your action creators to your props.
const mapDispatchToProps = {
    // applyFilters
}

//export your list as a default export 
export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    navBar: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 7,
        paddingBottom: 7,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'space-between',

        // borderBottomColor: '#D6D6D6',
        // borderBottomWidth: 1,
    },
    searchHead: {
        // flex: 1,
        paddingHorizontal: 15,
        paddingTop: 32,
        paddingBottom: 10,
        // borderBottomWidth: 1,
        // borderBottomColor: 'rgba(0,0,0,0.5)',
        
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: .5 },
        shadowOpacity: 0.2,
        shadowRadius: 0,  
        elevation: 1,
    },
    searchTitle: {
        fontSize: 34,
        lineHeight: 41,
        color: '#1E2432',
    },
    searchForm: {
        height: 40,
        backgroundColor: 'rgba(142,142,147,0.12)',
        borderRadius: 10,

        flexDirection: 'row',
        alignItems: 'center',

        marginTop: 20,
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
        color: apColors.searchText,
        fontSize: 16,
        // backgroundColor: 'blue',
    },
    clearBtn: {
        padding: 10,
        // backgroundColor: 'red',
    },
    clearBtnInner: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: apColors.searchText,
        
        // marginRight: 5,
        // position: 'absolute',
        // zIndex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    // results
    contentContainer: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 15,
        // backgroundColor: 'red',
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
        color: '#1E2432',
    },
    clearRecent: {
        color: apColors.appColor,
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
        borderBottomColor: apColors.separator,
        // marginBottom: 20,
    },
    resultIcon: {
        width: 30,
        height: 30,
        borderRadius: 4,
        backgroundColor: apColors.searchIconBg,
        borderWidth: 1,
        borderColor: apColors.separator,
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
        color: '#1E2432',
    }
});
