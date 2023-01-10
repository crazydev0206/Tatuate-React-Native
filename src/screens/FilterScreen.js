import React, { useState } from 'react';
import { 
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity,
    ScrollView, 
    // Slider,
    StyleSheet,
    Platform,
    PermissionsAndroid
} from 'react-native';
import Slider from '@react-native-community/slider';

import { SafeAreaInsetsContext } from 'react-native-safe-area-context';

// import * as expoLocation from 'expo-location';
// import * as expoPermissions from 'expo-permissions';
import Geolocation from '@react-native-community/geolocation';


import {boldFontFamily} from '../constants/Colors';
import {translate} from "../helpers/i18n";
import {fomartCurrOut,formatNumber} from '../helpers/currency';


// import { FontAwesome } from '@expo/vector-icons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { aweIcon, categoryColor } from '../helpers/helpers';


import TextRegular from '../components/ui/TextRegular';
import TextMedium from '../components/ui/TextMedium';
import TextHeavy from '../components/ui/TextHeavy';
import {FilterSvg,MarkerSvg} from '../components/icons/ButtonSvgIcons';


import Reviews from '../components/Reviews';
// import BackButton from '../components/inners/BackButton';
import CloseButton from '../components/inners/CloseButton';
import BtnFull from '../components/ui/BtnFull';
import {RadioBtn,CheckboxBtn} from '../components/ui/UIs';

import {CustomSlider} from '../components/ui/Slider';

import Loader from '../components/Loader';
import { connect } from 'react-redux';

import {applyFilters} from '../actions/filter';

import {filterState} from '../reducers/initialState';

// import { RadioButton } from 'react-native-paper';

class FilterScreen extends React.Component{
    constructor(props){
        super(props)
        // this.state = { data: [], filter: {}, value: 'first', orderby: 'highest_rated' }
        this.state = {...props.filter}
        
    }
    // static navigationOptions = ({ navigation }) => {
    //     return {
    //         title: translate('filter','hTitle'),
    //         headerLeft: () => {
    //             return <CloseButton isBlack={true} onPress={navigation.goBack} style={{marginLeft: 10}}/>
    //         },
            
    //     };
    // }
    _renderHeader(cstyle = {}){
        // {top: 30 + insets.top}
        const {apColors} = this.props;
        return (
            <View style={[styles.navBar,apColors.headerNavStyle,cstyle]}>
                <CloseButton color={apColors.backBtn} style={{width: 50}} onPress={()=>this.props.navigation.goBack()}/>
                <View style={styles.filterTitle}>
                    {/*<TextHeavy style={{textAlign: 'center', fontSize: 17, color: '#000'}}>{translate('filter','hTitle')}</TextHeavy>*/}
                    <Text style={apColors.headerTitleStyle}>{translate('filter','hTitle')}</Text>
                </View>
                <TouchableOpacity onPress={ ()=>this.resetFilter() } style={styles.filterBtn}><TextMedium style={[styles.filterText,{color: apColors.appColor,}]}>{translate('filter','reset')}</TextMedium></TouchableOpacity>
            </View>
        )
    }
    resetFilter(){
        this.setState({...filterState})
    }
    onChange(value,name){
        this.setState( {[name]: value} )
    }
    onSelectTax(id, tax){
        if( null != this.state[tax] ){
            const taxState = this.state[tax]
            if( Array.isArray(taxState) ){
                let newState = [...taxState]
                const tidx = taxState.findIndex(tx => tx === id)
                if( -1 !== tidx ){
                    newState = [
                        ...newState.slice( 0, tidx ),
                        ...newState.slice( tidx + 1 ),
                    ]
                }else{
                    newState.push(id)
                }
                this.setState( {[tax]: newState} )
            }else{
                // taxState = [id]
                this.setState( {[tax]: [id]} )
            }
            // this.setState( {[tax]: [...taxState]} )
        }else{
            this.setState( {[tax]: [id]} )
        }
    }
    multiSliderValueCallback = (values) => {
        
        this.setState({prices : values})
    }
    getGeoLocation = async () => {
        let location = await Geolocation.getCurrentPosition(location => {
            if( null != location.coords ){
                const {latitude,longitude} = location.coords
                this.setState({
                    nearby: 'on',
                    address_lat: latitude,
                    address_lng: longitude,
                    locs: [],

                    // address_lat: 41.0572159,
                    // address_lng: -74.12218899999999,
                })
            }
        });
    }
    onNearBy = async () => {
        if( this.state.nearby === 'on' ){
            this.setState({
                nearby: 'off',
                address_lat: '',
                address_lng: ''
            })

            return;
        }
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
        //         this.setState({
        //             nearby: 'on',
        //             address_lat: latitude,
        //             address_lng: longitude,
        //             locs: []
        //         })
        //     }else{
        //         this.setState({
        //             nearby: 'off',
        //             address_lat: '',
        //             address_lng: ''
        //         })
        //     }
        // });

            
    }
    applyFilters(){
        
        this.props.applyFilters(this.state)
        this.props.navigation.goBack()
        // this.props.applyFilters(this.state)
    }
    render(){
        const _self = this
        const {apColors} = _self.props;
        const {orderby,distance,status,prices,nearby} = _self.state
        const {cats,locs,feas,tags,layout} = _self.props.site;
        
        return(
            <SafeAreaInsetsContext.Consumer style={{flex: 1}}>
                {insets => <View style={[styles.container,{backgroundColor: apColors.appBg,paddingTop: insets.top,paddingBottom: insets.bottom,paddingLeft: insets.left,paddingRight: insets.right}]}>
                    <View style={{flex: 1}}>
                        {this._renderHeader()}
                        <View style={{flex:1}}>
                            <ScrollView style={{flex:1}} contentContainerStyle={styles.contentContainer}>
                                
                                <View style={styles.filterGroup}>
                                    <TextHeavy style={styles.filterLabel}>{translate('filter','categories')}</TextHeavy>
                                    
                                    <CatsGroup data={cats} value={_self.state.cats} showing={100} onChange={(id)=>_self.onSelectTax(id, 'cats')} apColors={apColors}/>

                                    <CheckboxBtn 
                                        status={ status === 'open' ? 'checked' : 'unchecked' } 
                                        style={[styles.radioBorder,{borderBottomColor: apColors.separator,}]}
                                        onPress={ ()=>this.setState({ status: status === 'open' ? '' : 'open' }) }
                                    >{translate('filter','open_now')}</CheckboxBtn>

                                </View>

                                <View style={styles.filterGroup}>
                                    <TextHeavy style={styles.filterLabel}>{translate('filter','facilities')}</TextHeavy>

                                    <FeasGroup data={feas} value={_self.state.feas} onChange={(id)=>_self.onSelectTax(id, 'feas')} apColors={apColors}/>

                                </View>

                                <View style={styles.filterGroup}>
                                    <TextHeavy style={styles.filterLabel}>{translate('filter','cities')}</TextHeavy>
                                    
                                    <LocsGroup data={locs} value={_self.state.locs} showing={100} onChange={(id)=>_self.onSelectTax(id, 'locs')} onNearBy={()=>_self.onNearBy()} nearBy={nearby} apColors={apColors}/>
                                </View>

                                { null != nearby && nearby === 'on' && <View style={styles.filterGroup}>
                                    <TextHeavy style={styles.filterLabel}>{translate('filter','distance')}</TextHeavy>
                                    
                                    <Slider
                                        value={distance}
                                        onValueChange={val=>_self.setState({distance: val})}
                                        style={{height: 40,width:'100%',flex:1}}
                                        // step={1}
                                        minimumValue={2}
                                        maximumValue={100}
                                        minimumTrackTintColor={apColors.appColor}
                                        maximumTrackTintColor="#EAECEF"
                                    />

                                    <TextRegular style={styles.fSliderText}>{translate('filter','nearby', {count: formatNumber(distance)})}</TextRegular>
                                </View> }

                                

                                <View style={styles.filterGroup}>
                                    <TextHeavy style={styles.filterLabel}>{translate('filter','price')}</TextHeavy>
                                    { Array.isArray(prices) && prices.length === 2 && <View style={styles.fPriceVals}>
                                        <TextRegular style={styles.fSliderText}>{translate('filter','prices', { min: fomartCurrOut(prices[0]), max: fomartCurrOut(prices[1]) })}</TextRegular>
                                    </View> }
                                    <CustomSlider
                                        values={prices}
                                        min={0}
                                        max={1000}
                                        LRpadding={15}
                                        callback={this.multiSliderValueCallback}
                                        single={false}
                                        apColors={apColors}
                                    />
                                </View>

                                    

                                <View style={styles.filterGroup}>
                                    <TextHeavy style={styles.filterLabel}>{translate('filter','layout')}</TextHeavy>

                                    <RadioGroup data={layout} value={_self.state.layout} onChange={(val)=>_self.onChange(val, 'layout')} apColors={apColors}/>

                                </View>

                                <View style={styles.filterGroup}>
                                    <TextHeavy style={styles.filterLabel}>{translate('filter','tags')}</TextHeavy>
                                    
                                    <TaxsGroup data={tags} value={_self.state.tags} showing={5} onChange={(id)=>_self.onSelectTax(id, 'tags')} apColors={apColors}/>
                                </View>

                                <View style={styles.filterGroup}>
                                    <TextHeavy style={styles.filterLabel}>{translate('filter','sortby')}</TextHeavy>
                                    <RadioBtn 
                                        status={ orderby === 'date' ? 'checked' : 'unchecked' } 
                                        style={[styles.radioBorder,{borderBottomColor: apColors.separator,}]}
                                        onPress={ ()=>this.setState({ orderby: 'date' }) }
                                    >{translate('filter','newest')}</RadioBtn>
                                    <RadioBtn 
                                        status={ orderby === 'highest_rated' ? 'checked' : 'unchecked' } 
                                        style={[styles.radioBorder,{borderBottomColor: apColors.separator,}]}
                                        onPress={ ()=>this.setState({ orderby: 'highest_rated' }) }
                                    >{translate('filter','top_rated')}</RadioBtn>
                                    <RadioBtn 
                                        status={ orderby === 'most_reviewed' ? 'checked' : 'unchecked' } 
                                        style={[styles.radioBorder,{borderBottomColor: apColors.separator,}]}
                                        onPress={ ()=>this.setState({ orderby: 'most_reviewed' }) }
                                    >{translate('filter','most_reviewed')}</RadioBtn>
                                    <RadioBtn 
                                        status={ orderby === 'most_viewed' ? 'checked' : 'unchecked' } 
                                        style={[styles.radioBorder,{borderBottomColor: apColors.separator,}]}
                                        onPress={ ()=>this.setState({ orderby: 'most_viewed' }) }
                                    >{translate('filter','most_viewed')}</RadioBtn>
                                    <RadioBtn 
                                        status={ orderby === 'most_liked' ? 'checked' : 'unchecked' } 
                                        style={[styles.radioBorder,{borderBottomColor: apColors.separator,}]}
                                        onPress={ ()=>this.setState({ orderby: 'most_liked' }) }
                                    >{translate('filter','most_liked')}</RadioBtn>
                                    <RadioBtn 
                                        status={ orderby === 'price_high' ? 'checked' : 'unchecked' } 
                                        style={[styles.radioBorder,{borderBottomColor: apColors.separator,}]}
                                        onPress={ ()=>this.setState({ orderby: 'price_high' }) }
                                    >{translate('filter','price_high')}</RadioBtn>
                                    <RadioBtn 
                                        status={ orderby === 'price_low' ? 'checked' : 'unchecked' } 
                                        style={[styles.radioBorder,{borderBottomColor: apColors.separator,}]}
                                        onPress={ ()=>this.setState({ orderby: 'price_low' }) }
                                    >{translate('filter','price_low')}</RadioBtn>

                                </View>

                            </ScrollView>
                        </View>
                        <BtnFull style={{marginLeft:30,marginRight:30, marginBottom: 20,}} onPress={ ()=>_self.applyFilters() }>{translate('filter','apply')}</BtnFull>
                    </View>
                </View>}
            </SafeAreaInsetsContext.Consumer>
        )
    }
}

//Map the redux state to your props.
const mapStateToProps = state => ({
    site: state.site,
    filter: state.filter,
})

//Map your action creators to your props.
const mapDispatchToProps = {
    applyFilters
}

//export your list as a default export 
export default connect(mapStateToProps, mapDispatchToProps)(FilterScreen);

function CatsGroup(props){
    const [showAll, toggleShowAll] = useState(false);
    let childJsx = [],
        hasMore = false,
        dfShow = null != props.showing ? props.showing : 3;
    if( null != props.data && Array.isArray(props.data) && props.data.length > 0 ){
        const filteredItems = props.data.filter(itm => itm.count > 0 );
        const showingDatas = !showAll && filteredItems.length > dfShow ? filteredItems.slice(0, dfShow) : filteredItems;
        if( filteredItems.length > dfShow ){
            hasMore = true;
        }
        showingDatas.forEach(tax => {
            const {id,title,icon,color} = tax
            let cStyle = styles.catIconWrap,
                cIStyle = styles.catIcon;

            

            if( -1 !== props.value.findIndex( slid => slid === id) ){
                cStyle = [cStyle, {
                    borderColor: props.apColors.appColor,
                    backgroundColor: props.apColors.appColor,
                }]
                cIStyle = [cIStyle, styles.catIconSelected]
            } 
            childJsx.push(<TouchableOpacity key={id} style={styles.catWrap} onPress={()=>props.onChange(id)}>
                    <View style={cStyle}>{null != icon && icon !== '' && <FontAwesome5 name={aweIcon(icon)} style={cIStyle}/>}</View>
                    <TextMedium style={styles.catText}>{title}</TextMedium>
                </TouchableOpacity>)
        });
    }
    return (
        <View style={[styles.catsGroup,props.style]}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{}}>{childJsx}</ScrollView>
            { hasMore && <TouchableOpacity style={styles.moreLess} onPress={()=>toggleShowAll(!showAll)}>
                <TextMedium style={[styles.moreLessText,{color: props.apColors.appColor,}]}>{ 
                    showAll ? 
                    ( null != props.viewLess ? props.viewLess : translate('viewLess') ) : 
                    ( null != props.viewMore ? props.viewMore : translate('viewMore') ) 
                }</TextMedium>
            </TouchableOpacity> }
        </View>
    )
}
function LocsGroup(props){
    const [showAll, toggleShowAll] = useState(false);
    let childJsx = [],
        hasMore = false,
        dfShow = null != props.showing ? props.showing : 3;
    if( null != props.data && Array.isArray(props.data) && props.data.length > 0 ){
        const filteredItems = props.data.filter(itm => itm.count > 0 );
        const showingDatas = !showAll && filteredItems.length > dfShow ? filteredItems.slice(0, dfShow) : filteredItems;
        if( filteredItems.length > dfShow ){
            hasMore = true;
        }
        showingDatas.forEach(tax => {
            let cStyle = styles.locWrap,
                cTStyle = styles.locText;
            if( -1 !== props.value.findIndex( slid => slid === tax.id) ){
                cStyle = [cStyle, styles.taxSelected,{borderColor: props.apColors.appColor,shadowColor: props.apColors.shadowCl,}]
                cTStyle = [cTStyle, {color: props.apColors.appColor}]
            } 
            childJsx.push(<TouchableOpacity key={tax.id} style={cStyle} onPress={()=>props.onChange(tax.id)}>
                    <TextMedium style={cTStyle}>{tax.title}</TextMedium>
                </TouchableOpacity>)
        });
    }
    let nbStyle = styles.nearbyWrap,
        nbTStyle = styles.locText;
    if( null != props.nearBy && props.nearBy == 'on' ){
        nbStyle = [nbStyle, styles.taxSelected,{borderColor: props.apColors.appColor,shadowColor: props.apColors.shadowCl,}]
        nbTStyle = [nbTStyle, {color: props.apColors.appColor}]
    }
    childJsx.unshift(<TouchableOpacity key="nearby" style={nbStyle} onPress={()=>props.onNearBy()}>
                    <MarkerSvg style={{marginRight: 7}} color={ null != props.nearBy && props.nearBy == 'on' ? props.apColors.appColor : '#CCC' }/><TextMedium style={nbTStyle}>{translate('filter','nearme')}</TextMedium>
                </TouchableOpacity>)
    return (
        <View style={[styles.taxsGroup,props.style]}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{}}>{childJsx}</ScrollView>
            { hasMore && <TouchableOpacity style={styles.moreLess} onPress={()=>toggleShowAll(!showAll)}>
                <TextMedium style={[styles.moreLessText,{color: props.apColors.appColor,}]}>{ 
                    showAll ? 
                    ( null != props.viewLess ? props.viewLess : translate('viewLess') ) : 
                    ( null != props.viewMore ? props.viewMore : translate('viewMore') ) 
                }</TextMedium>
            </TouchableOpacity> }
        </View>
    )
}
function TaxsGroup(props){
    const [showAll, toggleShowAll] = useState(false);
    let childJsx = [],
        hasMore = false,
        dfShow = null != props.showing ? props.showing : 3;
    if( null != props.data && Array.isArray(props.data) && props.data.length > 0 ){
        const filteredItems = props.data.filter(itm => itm.count > 0 );
        const showingDatas = !showAll && filteredItems.length > dfShow ? filteredItems.slice(0, dfShow) : filteredItems;
        if( filteredItems.length > dfShow ){
            hasMore = true;
        }
        showingDatas.forEach(tax => {
            let cStyle = styles.taxWrap,
                cTStyle = styles.taxText;
            if( -1 !== props.value.findIndex( slid => slid === tax.id) ){
                cStyle = [cStyle, styles.taxSelected,{borderColor: props.apColors.appColor,shadowColor: props.apColors.shadowCl,}]
                cTStyle = [cTStyle, {color: props.apColors.appColor}]
            } 
            childJsx.push(<TouchableOpacity key={tax.id} style={cStyle} onPress={()=>props.onChange(tax.id)}>
                    <TextMedium style={cTStyle}>{tax.title}</TextMedium>
                </TouchableOpacity>)
        });
    }
    return (
        <View style={[styles.taxsGroup,props.style]}>
            {childJsx}
            { hasMore && <TouchableOpacity style={styles.moreLess} onPress={()=>toggleShowAll(!showAll)}>
                <TextMedium style={[styles.moreLessText,{color: props.apColors.appColor,}]}>{ 
                    showAll ? 
                    ( null != props.viewLess ? props.viewLess : translate('viewLess') ) : 
                    ( null != props.viewMore ? props.viewMore : translate('viewMore') ) 
                }</TextMedium>
            </TouchableOpacity> }
        </View>
    )
}
function FeasGroup(props){
    const [showAll, toggleShowAll] = useState(false);
    let childJsx = [],
        hasMore = false,
        dfShow = null != props.showing ? props.showing : 3;
    if( null != props.data && Array.isArray(props.data) && props.data.length > 0 ){
        const filteredItems = props.data.filter(itm => itm.count > 0 );
        const showingDatas = !showAll && filteredItems.length > dfShow ? filteredItems.slice(0, dfShow) : filteredItems;
        if( filteredItems.length > dfShow ){
            hasMore = true;
        }
        showingDatas.forEach(tax => {
            const checked = null != props.value && props.value.findIndex( slid => slid === tax.id ) !== -1 ? 'checked' : 'unchecked';
            childJsx.push(  <CheckboxBtn key={tax.id}
                                status={ checked } 
                                style={[styles.radioBorder,{borderBottomColor: props.apColors.separator,}]}
                                onPress={ ()=> props.onChange(tax.id) }
                            >{tax.title}</CheckboxBtn> )
        });
    }
    return (
        <View style={[styles.checkboxGroup,props.style]}>
            {childJsx}
            { hasMore && <TouchableOpacity style={styles.moreLess} onPress={()=>toggleShowAll(!showAll)}>
                <TextMedium style={[styles.moreLessText,{color: props.apColors.appColor,}]}>{ 
                    showAll ? 
                    ( null != props.viewLess ? props.viewLess : translate('viewLess') ) : 
                    ( null != props.viewMore ? props.viewMore : translate('viewMore') ) 
                }</TextMedium>
            </TouchableOpacity> }
        </View>
    )
}
function RadioGroup(props){
    const [showAll, toggleShowAll] = useState(false);
    let childJsx = [],
        hasMore = false,
        dfShow = null != props.showing ? props.showing : 3;
    if( null != props.data && props.data instanceof Object &&  !Array.isArray(props.data) ){
        const objLength = Object.keys(props.data).length,
            showing = !showAll && objLength > dfShow ? dfShow : objLength;
        if( objLength > dfShow ){
            hasMore = true;
        }
        let sCount = 1;
        for(let k in props.data){
            if( sCount > showing ) break;
            const checked = null != props.value && props.value === k ? 'checked' : 'unchecked';
            childJsx.push(  <RadioBtn key={k}
                                status={ checked } 
                                style={[styles.radioBorder,{borderBottomColor: props.apColors.separator,}]}
                                onPress={ ()=> props.onChange(k) }
                            >{props.data[k]}</RadioBtn> )
            sCount++;
        }
    }
    return (
        <View style={[styles.checkboxGroup,props.style]}>
            {childJsx}
            { hasMore && <TouchableOpacity style={styles.moreLess} onPress={()=>toggleShowAll(!showAll)}>
                <TextMedium style={[styles.moreLessText,{color: props.apColors.appColor,}]}>{ 
                    showAll ? 
                    ( null != props.viewLess ? props.viewLess : translate('viewLess') ) : 
                    ( null != props.viewMore ? props.viewMore : translate('viewMore') ) 
                }</TextMedium>
            </TouchableOpacity> }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: 15,
        
    },
    navBar: {
        // position: 'absolute',
        // top: 52,
        // // marginTop: 52,
        // left: 0,
        // right: 0,
        // zIndex: 200,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 8,
        paddingBottom: 7,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'space-between',

        borderBottomColor: 'rgba(0,0,0,0.2)',
        borderBottomWidth: 1,
    },
    filterTitle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    filterBtn: {
        // marginRight:10, 
        height: 28, 
        width: 50,
        justifyContent:'center'
    },
    filterText: {
        fontSize: 17,
        textAlign: 'right',
        
    },
    contentContainer: {
        paddingTop: 20,
        paddingHorizontal: 15,
        // borderTopWidth: 1,
        // borderTopColor: 'red',
    },
    filterGroup: {
        marginBottom: 20,
    },
    filterLabel: {
        fontSize: 17,
        marginBottom: 10,
    },
    // cats
    catWrap: {
        paddingRight: 15,
    },
    catIconWrap: {
        height: 64,
        width: 64,
        borderRadius: 32, 
        overflow: 'hidden',
        marginBottom: 5,
        borderWidth: 1,
        borderColor: '#CCC',
        alignItems: 'center',
        justifyContent: 'center',
    },
    catIcon: {
        fontSize: 35,
        color: '#CCC'
    },
    catIconSelected: {
        color: '#FFF'
    },
    catText: {
        fontSize: 15,
        textAlign: 'center',
    },
    // locs
    locWrap: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#EAECEF',
        borderRadius: 25,
        marginRight: 7,
        marginBottom: 7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    locText: {
        fontSize: 15,
        // backgroundColor: 'red',
        lineHeight: 20,
        textAlignVertical: 'center',
    },
    nearbyWrap: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#EAECEF',
        borderRadius: 25,
        marginRight: 7,
        marginBottom: 7,

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    // tax
    taxsGroup: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    taxWrap: {
        paddingVertical: 7,
        paddingHorizontal: 13,
        borderWidth: 1,
        borderColor: '#EAECEF',
        borderRadius: 25,
        marginRight: 7,
        marginBottom: 7,
    },
    taxSelected: {
        
        
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 10,  
        elevation: 1,
    },
    taxText: {
        fontSize: 15,
    },
    checkboxGroup: {
        flex: 1,
    },
    // radio
    labelStyle: {
        fontFamily: boldFontFamily,
        fontSize: 17, 
    },
    radioBorder: {
        borderBottomWidth: 1,
        
    },

    // more less button
    moreLess: {
        paddingTop: 15,
    },
    moreLessText : {
        fontSize: 15,
        
        textDecorationLine: 'underline',
    },
    fPriceVals: {

    },
    fSliderText: {

    },
});
