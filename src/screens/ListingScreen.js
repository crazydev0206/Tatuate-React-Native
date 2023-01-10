import React from 'react';
import {
  ImageBackground,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  // TouchableHighlight,
  TouchableWithoutFeedback,
  View,
  Alert,
  // Modal,
  // Dimensions,
  RefreshControl,
  Linking,
  Share,
//   SafeAreaView,
} from 'react-native';
import Clipboard from "@react-native-community/clipboard";
// import { useSafeArea } from 'react-native-safe-area-context';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import MapView, {Marker} from 'react-native-maps';


import {regularFontFamily} from '../constants/Colors';

import {fomartCurrOut,valid_coords} from '../helpers/currency';
import {translate} from "../helpers/i18n";
// import {getLoggedInID} from "../helpers/user";

import TextHeavy from '../components/ui/TextHeavy';
import TextBold from '../components/ui/TextBold';
import TextMedium from '../components/ui/TextMedium';
import TextRegular from '../components/ui/TextRegular';
import Button from '../components/ui/Btn';
import {ShareSvg,MoreSvg,ChatSvg} from '../components/icons/ButtonSvgIcons';

import BtnLink from '../components/ui/BtnLink';

import BackButton from '../components/inners/BackButton';

// import Photos from '../components/inners/Photos';
import Tickets from '../components/inners/Tickets';
import LFaqs from '../components/inners/LFaqs';
import Members from '../components/inners/Members';
import LMenus from '../components/inners/LMenus';

import Address from '../components/inners/Address';
import PhotosGrid from '../components/inners/PhotosGrid';
import Cats from '../components/inners/Cats';
import Features from '../components/inners/Features';
import Facts from '../components/inners/Facts';
import Tags from '../components/inners/Tags';
import Comments from '../components/inners/Comments';
import LHostedBy from '../components/inners/LHostedBy';
// import AvailabilityModal from '../components/inners/AvailabilityModal';



// import { WebView } from 'react-native-webview';

import Reviews from '../components/Reviews';

import Loader from '../components/Loader';

// for redux
import { getListingAction, bookmarkListing } from '../actions/listing';
import { checkInOutSelect } from '../actions/booking';
import { connect } from 'react-redux';
import ForHTML from '../components/ui/ForHTML';

class ListingScreen extends React.Component{
    constructor(props){
        super(props)
        this.state = { isFixed: false, showDates: false, showMore: false, showShare: false, addingBookmark: false, showContentMore: false }
        this._onScroll = this._onScroll.bind(this)
        this._onShowDates = this._onShowDates.bind(this)
        this._onCloseDates = this._onCloseDates.bind(this)
        
        
    }
    // custom header button/title
    static navigationOptions = ({ navigation, route }) => {
        let transparent = true;
        const isFixed = route.params?.isFixed ?? false
        if( isFixed ) transparent = false;
        return {
            header: null,
            
        };
    };
    componentDidMount(){
        const id = this.props.route.params?.id ?? '';
        if( this.props.listing.ID != id ) this.props.getListingAction( id )
    }
    _renderHeader(cstyle = {}){
        const {navigation,route,apColors} = this.props;
        let adStyle = {width:30,height:30,borderRadius:15,justifyContent:'center',alignItems:'center'};
        let rAdStyle = {width:30,height:30,borderRadius:15,marginLeft:0,justifyContent:'center',alignItems:'center',marginRight:15};
        
        let isBlack = false,
            fillColor = apColors.backBtn;
        const isFixed = route.params?.isFixed ?? false
        const titleParam = route.params?.title ?? '';
        if( isFixed ){
            // adStyle = [adStyle,{backgroundColor:'#000'}];
            // rAdStyle = [rAdStyle,{backgroundColor:'#000'}];
            cstyle = [ cstyle, {backgroundColor: apColors.appBg }, apColors.headerNavStyle ];

            isBlack = true;
            fillColor = apColors.backBtn;
        }
        adStyle = styles.navLeftBtn
        rAdStyle = {}   
        return (
            <View style={[styles.navBar,cstyle]}>
                <BackButton color={fillColor} onPress={ () =>this._onClickGoBack() } style={adStyle}/>

                <View style={[styles.filterTitle,{alignSelf:'center',overflow: 'hidden'}]}>
                    <TextHeavy style={{textAlign: 'center', fontSize: 17, color: fillColor }}>{this._stripTitle(titleParam)}</TextHeavy>
                </View>
                
                <View style={styles.navRightWrap}>
                    <TouchableOpacity onPress={ () => this._goToChat() } style={[rAdStyle,{marginRight:5}]}>
                        <View style={styles.navButton}>
                            <ChatSvg fill={fillColor}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this._onPressShare()} style={[rAdStyle,{marginRight:5}]}>
                        <View style={styles.navButton}>
                            <ShareSvg fill={fillColor}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this._onPressMore()} style={rAdStyle}>
                        <View style={styles.navButton}>
                            <MoreSvg fill={fillColor}/>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
    _onClickGoBack(){
        // const backRoute = this.props.navigation.getParam('backRoute', false);
        // if( backRoute ){
        //     this.props.navigation.navigate(backRoute)
        // }else{
        //     this.props.navigation.goBack()
        // }
        this.props.navigation.goBack()
    }
    

    _goToChat = () => {
        const {navigation} = this.props;
        const {ID, isLoggedIn} = this.props.user;
        if( isLoggedIn ){
            // const {routeName} = navigation.state;
            // const   auid = navigation.getParam('auid', 0),
            //         auname = navigation.getParam('auname', 'Author name'),
            //         lid = navigation.getParam('id', 0),
            //         ltitle = navigation.getParam('title', 'Listing title');

            // add listing details
            const {id, title, author_name, author_id, thumbnail, price, url} = this.props.listing;
            const lobject = {
                id,
                title,
                thumbnail, 
                price,
                url
            }
            navigation.navigate( 'ReplyNew', {backRoute: 'Listing', cid: 'New', display_name: author_name, touid: author_id, fuid: ID, lobject } )
        }else{
            this.requireLogin()
        }
    }
    _openClaim(){
        const {isLoggedIn} = this.props.user;
        if( isLoggedIn ){
            this.props.navigation.navigate( 'Claim' )
        }else{
            this.requireLogin()
        }
    }
    _openReport(){
        const {isLoggedIn} = this.props.user;
        if( isLoggedIn ){
            this.props.navigation.navigate( 'Report' )
        }else{
            this.requireLogin()
        }
    }
    _bookmarkListing(){
        const {ID, isLoggedIn, bookmarks} = this.props.user;
        if( isLoggedIn ){
            // const fIndex = bookmarks.findIndex(bm => bm == this.props.listing.ID)
            // if( fIndex !== -1 ){
            //     Alert.alert(
            //         translate('slisting', 'oops'),
            //         translate('slisting', 'already_bookmarked'),
            //         [
            //             {text: translate('slisting', '_ok'), onPress: () => {} },
            //         ],
            //         {cancelable: false},
            //     );
            // }else{

            // }

            this.props.bookmarkListing(ID, this.props.listing.ID);
            this.setState({addingBookmark: true})
        }else{
            this.requireLogin()
        }
    }
    requireLogin(){
        this.props.navigation.navigate( 'SignIn', {backRoute: 'Listing', loggedInRoute: 'Listing'} )
    }
    _onPressMore(){
        this.setState({showMore: true})
    }
    _onPressShare(){
        this.setState({showShare: true})
    }
    _copyLink(){
        Clipboard.setString(this.props.listing.url)

        Alert.alert(
            translate('slisting', 'link_copied'),
            '',
            [
                {text: translate('slisting', '_ok'), onPress: () => {} },
            ],
            {cancelable: false},
        );
    }
    _sendEmail = async (newEmail = null) => {
        const {email,title,url} = this.props.listing;
        let emailUrl = `mailto:${email}`;
        if(null != newEmail) emailUrl = `mailto:${newEmail}`;
        // console.log(emailUrl);
        let data = {
            subject: translate('slisting', 'email_subject', {listing: title}),
            body: translate('slisting', 'email_message', {listing: title, url}) ,
        }
        const query = Object.keys(data).map( k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) ).join('&');
        if( query.length > 0 ) emailUrl += `?${query}`;
        // check if we can use this link
        const canOpen = await Linking.canOpenURL(emailUrl);

        if (!canOpen) {
            Alert.alert(
                translate('slisting', 'oops'),
                translate('slisting', 'send_email_error'),
                [
                    {text: translate('slisting', '_ok'), onPress: () => {} },
                ],
                {cancelable: false},
            );

            return;
        }

        return Linking.openURL(emailUrl);
    }
    _sendSMS = async (newPhone = null) => {
        const {phone,title,url} = this.props.listing;
        let linkUrl = `sms:${phone}`;
        if( null != newPhone ) linkUrl = `sms:${newPhone}`;
        let data = {
            body: translate('slisting', 'sms_message', {listing: title, url}) ,
        }
        const query = Object.keys(data).map( k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) ).join('&');
        if( query.length > 0 ) linkUrl += ( Platform.OS === "ios" ? "&" : "?" )+`${query}`;
        // check if we can use this link
        const canOpen = await Linking.canOpenURL(linkUrl);

        if (!canOpen) {
            Alert.alert(
                translate('slisting', 'oops'),
                translate('slisting', 'send_sms_error'),
                [
                    {text: translate('slisting', '_ok'), onPress: () => {} },
                ],
                {cancelable: false},
            );

            return;
        }

        return Linking.openURL(linkUrl);
    }
    _callPhone = async (newPhone = null) => {
        const {phone,title,url} = this.props.listing;
        let linkUrl = `tel:${phone}`;
        if( null != newPhone ) linkUrl = `tel:${newPhone}`;

        // check if we can use this link
        const canOpen = await Linking.canOpenURL(linkUrl);

        if (!canOpen) {
            Alert.alert(
                translate('slisting', 'oops'),
                translate('slisting', 'call_phone_error'),
                [
                    {text: translate('slisting', '_ok'), onPress: () => {} },
                ],
                {cancelable: false},
            );

            return;
        }

        return Linking.openURL(linkUrl);
    }
    _openShare(){
        const {phone,title,url} = this.props.listing;
        Share.share({
                message: translate('slisting', 'share_message', {listing: title}),
                url: url,
                title: translate('slisting', 'share_title', {listing: title})
            }, {
                // Android only:
                dialogTitle: translate('slisting', 'share_dialog_title'),
                // iOS only:
                excludedActivityTypes: [
                    'com.apple.UIKit.activity.PostToTwitter'
                ]
            }
        )
    }
    _visitWebsite = async () => {
        const {website} = this.props.listing;
        // check if we can use this link
        const canOpen = await Linking.canOpenURL(website);

        if (!canOpen) {
            Alert.alert(
                translate('slisting', 'oops'),
                translate('slisting', 'open_web_error'),
                [
                    {text: translate('slisting', '_ok'), onPress: () => {} },
                ],
                {cancelable: false},
            );

            return;
        }

        return Linking.openURL(website);
    }
    _stripTitle(title){
        title = "" + title
        return title.length > 25 ? title.substring(0,21)+'...' : title
    }
    _onScroll(e){
        let isFixed = this.props.route.params?.isFixed ?? false;
        
        if( null != e.nativeEvent.contentOffset.y && e.nativeEvent.contentOffset.y > 150){
            if( !isFixed ) this.props.navigation.setParams({ isFixed: true })
        }else{
            if( isFixed ) this.props.navigation.setParams({ isFixed: false })
        }
    }
    _onShowDates(){
        // check for event single -> do not need to show dates
        const {event_single, eventdate, price, children_price, infant_price } = this.props.listing;
        if( null != event_single && event_single === true ){
            const evdateparts = eventdate.split('|')
            if( evdateparts.length == 4 && evdateparts[0] != '' ){
                let dateOne = {
                    dateString: evdateparts[0],
                }
                dateOne.price = parseFloat( price )
                dateOne.children_price = parseFloat( children_price )
                dateOne.infant_price = parseFloat( infant_price )

                dateOne.metas = {
                    start_time: evdateparts[1],
                    end_date: evdateparts[2] + ' ' + evdateparts[3],
                }


                const dateTwo = {}
                this.props.checkInOutSelect( {dateOne, dateTwo } )
                this.props.navigation.navigate('Booking')
            }


        }else{
            this.props.navigation.navigate('Availability')
        }
        
    }
    _onCloseDates(){
        this.setState({showDates: false})
    }
    onRefresh(){
        const id = this.props.route.params?.id ?? '';
        this.props.getListingAction( id )
    }
    render(){
        const _self = this
        const {loading,apColors} = _self.props
        const { showDates, showMore, showShare, addingBookmark, showContentMore } = _self.state
        const {
            ID,
            thumbnail,
            title,
            excerpt,
            content,
            rating,
            ratingFields, 
            comments,
            photos,
            cats, 
            features,
            tags,
            facts,
            address,
            
            // for booking
            price,
            price_based,

            // event single date
            eventdate,
            event_single,

            // event type
            evt_tickets,
            lfaqs,
            lmembers,

            // restaurant type
            lmenus,
            // share 
            email,
            website,
            phone,

            comment_reglogin,

            submitted, 
            submitError,
            submittedMsg
        } = _self.props.listing

        let {
            latitude,
            longitude,
        } = _self.props.listing

        let hasMap = false;
        if( latitude != '' && longitude != '' && valid_coords(latitude,longitude) ){
            hasMap = true;
            latitude = parseFloat(latitude)
            longitude = parseFloat(longitude)
        }

        if( addingBookmark && submitted ){
            let popTitle = translate('slisting', 'title_ok'); 
            if( submitError ) {
                popTitle = translate('slisting', 'title_wrong');
            }
            
            Alert.alert(
                popTitle,
                submittedMsg,
                [
                    {text: translate('slisting', '_ok'), onPress: () => _self.setState({addingBookmark: false}) },
                ],
                {cancelable: false},
            );
        }

        const { bookmarks } = _self.props.user
        const alreadyBookmarked = bookmarks.findIndex(bm => bm == ID)

        let calContent = null != content ? content : '';
        if( showContentMore == false && calContent.length > 120 ) calContent = calContent.substr(0, 120) +'...'
        let scrollVStyle = {flex: 1}
        if( loading ){
            scrollVStyle = [scrollVStyle, {marginTop: 100,paddingBottom: 50}]
        }
        // console.log(_self.props.listing.disable_booking);
        return (
            ( /* loading === true ? <Loader loading={loading}/> : */
            <SafeAreaInsetsContext.Consumer style={{flex: 1}}>
                {insets => <View style={[styles.container,{backgroundColor: apColors.appBg,paddingBottom: insets.bottom,paddingLeft: insets.left,paddingRight: insets.right}]}>
                    
                    {this._renderHeader({paddingTop: insets.top, height: 50 + insets.top})}



                    <ScrollView
                        onScroll={this._onScroll}
                        scrollEventThrottle={10}
                        style={scrollVStyle}
                        contentContainerStyle={styles.contentContainer}
                        refreshControl={
                            <RefreshControl refreshing={loading} onRefresh={()=>_self.onRefresh()} />
                        }
                    >
                        { loading && <View style={[styles.loadingInner,{backgroundColor: apColors.appBg}]}></View>}
                        { null != thumbnail && thumbnail != '' && <View style={styles.singleMedia}><Image source={{uri:thumbnail}} style={styles.imageMedia}/></View> }   
                        <View style={[styles.singleContent,{backgroundColor: apColors.appBg,}]}>
                            { null != address && address !== '' && <Address style={{marginBottom:12}} address={address} />}
                            { null != title && title !== '' && <TextBold style={[styles.title,{color: apColors.tText,}]}>{title}</TextBold>}
                            <Reviews rating={rating} showCount={true} fSize={15} style={{marginBottom: 15}}/>

                            {/*<ShareSvg fill="#000" width={80} height={80}/>*/}
                            
                            { null != cats && <Cats data={cats} apColors={apColors}/>}

                            { null != tags && <Tags data={tags} style={{marginTop: 10}} apColors={apColors}/>}

                            { facts.length > 0 && <Facts data={facts} apColors={apColors}/>}

                            { Array.isArray(evt_tickets) && evt_tickets.length > 0 && <Tickets data={evt_tickets} style={{marginTop: 15}}/>}
                            { Array.isArray(lmenus) && lmenus.length > 0 && <LMenus data={lmenus} style={{marginTop: 15}} apColors={apColors}/>}

                            { 1 == 2 && null != excerpt && excerpt !== '' && <TextRegular style={{fontSize: 15}}>{excerpt}</TextRegular>}
                            { calContent !== '' && <ForHTML source={{ html: calContent }}
                            // html={calContent} 
                            tagsStyles={htmlTagsStyles} 
                                // containerStyle={{marginTop:20}} 
                                onLinkPress={(event,url) => Linking.openURL(url) }
                                baseFontStyle={{marginTop:20,fontFamily: regularFontFamily,fontSize: 15,color: apColors.pText}}
                            />}

                            { !showContentMore && calContent !== '' && <BtnLink size={15} style={{paddingVertical: 0}} center onPress={ ()=> this.setState({showContentMore: true}) }>{translate('slisting','all_content')}</BtnLink> }
                            { showContentMore && calContent !== '' && <BtnLink size={15} style={{paddingVertical: 0}} center onPress={ ()=> this.setState({showContentMore: false}) }>{translate('slisting','close_content')}</BtnLink> }


                            { photos.length > 0 && <PhotosGrid photos={photos} apColors={apColors}/>}

                            { features.length > 0 && <Features data={features} apColors={apColors}/>}

                            { Array.isArray(lfaqs) && lfaqs.length > 0 && <LFaqs data={lfaqs} style={{marginTop: 15}}/>}

                            { Array.isArray(lmembers) && lmembers.length > 0 && <Members data={lmembers} style={{marginTop: 15}} apColors={apColors}/>}

                            { hasMap && <>
                                <TextBold style={{color: apColors.tText, fontSize: 15,marginBottom: 10,}}>{translate('slisting','map')}</TextBold>
                                <MapView
                                    style={{width: '100%',height: 200}}
                                    initialRegion={{
                                        latitude: latitude,
                                        longitude: longitude,
                                        latitudeDelta: 0.0922,
                                        longitudeDelta: 0.0421,
                                    }}
                                >
                                    <Marker
                                        coordinate={{
                                            latitude: latitude,
                                            longitude: longitude,
                                        }}
                                        title={title}
                                        description={address}
                                    />
                                </MapView>
                            </> }

                            <View style={{marginTop: 10,}}>
                                    {address != '' && <View style={styles.contactItem}>
                                        <TextRegular style={styles.contactItemLabel}>{translate('slisting','contact_address')}</TextRegular>
                                        <TextRegular >{address}</TextRegular>
                                    </View>}

                                    {phone != '' && <View style={styles.contactItem}>
                                        <TextRegular style={styles.contactItemLabel}>{translate('slisting','contact_phone')}</TextRegular>
                                        <TouchableOpacity onPress={()=>_self._callPhone()}><TextRegular >{phone}</TextRegular></TouchableOpacity>
                                    </View>}

                                    {email != '' && <View style={styles.contactItem}>
                                        <TextRegular style={styles.contactItemLabel}>{translate('slisting','contact_email')}</TextRegular>
                                        <TouchableOpacity onPress={()=>_self._sendEmail()}><TextRegular >{email}</TextRegular></TouchableOpacity>
                                    </View>}

                                    {website != '' && <View style={styles.contactItem}>
                                        <TextRegular style={styles.contactItemLabel}>{translate('slisting','contact_web')}</TextRegular>
                                        <TouchableOpacity onPress={()=>_self._visitWebsite()}><TextRegular >{website}</TextRegular></TouchableOpacity>
                                    </View>}
                                    
                            </View>

                            <LHostedBy post={_self.props.listing} apColors={apColors} sendMail={_self._sendEmail} sendSMS={_self._sendSMS} callPhome={()=>_self._callPhone()}/>
                            
                            { comments.length > 0 && <Comments rating={rating} ratingFields={ratingFields} comments={comments} comment_reglogin={comment_reglogin} apColors={apColors}/>}
                        </View>
                    </ScrollView>

                    {/*<AvailabilityModal showDates={showDates} _onCloseDates={_self._onCloseDates}/>*/}

                    

                    { loading == false && <View style={[styles.screenFooter,{borderTopColor: apColors.separator,}]}>
                        
                        <View style={styles.screenFooterLeft}>
                            <TextBold style={styles.price}>{translate( price_based,'single',{count: parseFloat(price), price: fomartCurrOut(price)} )}</TextBold>
                        </View>
                        { (null == _self.props.listing.disable_booking || _self.props.listing.disable_booking == false) && <View style={styles.screenFooterRight}><Button onPress={_self._onShowDates}>{translate(price_based,'btn_book_now')}</Button></View>}
                    </View> }

                    { ( showMore || showShare ) && <TouchableWithoutFeedback onPress={() => _self.setState({showMore: false, showShare: false}) }><View style={styles.overlay}></View></TouchableWithoutFeedback> }
                    { showMore && <View style={[styles.moreView,{backgroundColor: apColors.secondBg,paddingBottom: insets.bottom}]}>

                        <TouchableOpacity onPress={()=>_self._openClaim()} style={[styles.moreLink,{borderBottomColor: apColors.separator,}]}>
                            <TextMedium style={[styles.moreText,{color: apColors.pText,}]}>{translate('slisting','claim_listing')}</TextMedium>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>_self._openReport()} style={[styles.moreLink,{borderBottomColor: apColors.separator,}]}>
                            <TextMedium style={[styles.moreText,{color: apColors.pText,}]}>{translate('slisting','report_listing')}</TextMedium>
                        </TouchableOpacity>
                        
                        { -1 === alreadyBookmarked ? <TouchableOpacity onPress={()=>_self._bookmarkListing()} style={[styles.moreLink,{borderBottomColor: apColors.separator,}]}>
                            <TextMedium style={[styles.moreText,{color: apColors.pText,}]}>{translate('slisting','bookmark_listing')}</TextMedium>
                        </TouchableOpacity> : <TextMedium style={[styles.moreText,{color: apColors.pText,},{marginBottom: 10}]}>{translate('slisting','already_bookmarked')}</TextMedium> }

                    </View> }

                    { showShare && <View style={[styles.moreView,{backgroundColor: apColors.secondBg,paddingBottom: insets.bottom}]}>
                        
                        <TextHeavy style={[styles.shareTitle,{color: apColors.pText,}]}>{translate('slisting','share')}</TextHeavy>
                        

                        { email != '' && <TouchableOpacity onPress={()=>_self._sendEmail()} style={[styles.moreLink,styles.shareLink,{borderBottomColor: apColors.separator,}]}>
                            <TextMedium style={[styles.moreText,{color: apColors.pText,}]}>{translate('slisting','share_email')}</TextMedium>
                        </TouchableOpacity>}

                        <TouchableOpacity onPress={()=>_self._copyLink()} style={[styles.moreLink,styles.shareLink,{borderBottomColor: apColors.separator,}]}>
                            <TextMedium style={[styles.moreText,{color: apColors.pText,}]}>{translate('slisting','share_copylink')}</TextMedium>
                        </TouchableOpacity>


                        { phone != '' && <TouchableOpacity onPress={()=>_self._sendSMS()} style={[styles.moreLink,styles.shareLink,{borderBottomColor: apColors.separator,}]}>
                            <TextMedium style={[styles.moreText,{color: apColors.pText,}]}>{translate('slisting','share_sms')}</TextMedium>
                        </TouchableOpacity> }

                        { website != '' && <TouchableOpacity onPress={()=>_self._visitWebsite()} style={[styles.moreLink,styles.shareLink,{borderBottomColor: apColors.separator,}]}>
                            <TextMedium style={[styles.moreText,{color: apColors.pText,}]}>{translate('slisting','share_web')}</TextMedium>
                        </TouchableOpacity> }

                        <TouchableOpacity onPress={()=>_self._openShare()} style={[styles.moreLink,styles.shareLink,{borderBottomColor: apColors.separator,}]}>
                            <TextMedium style={[styles.moreText,{color: apColors.pText,}]}>{translate('slisting','share_more')}</TextMedium>
                        </TouchableOpacity>

                        {/*<TouchableOpacity onPress={()=>_self._openClaim()} style={[styles.moreLink,styles.shareLink,{borderBottomColor: apColors.separator,}]}>
                            <TextMedium style={[styles.moreText,{color: apColors.pText,}]}>{translate('slisting','share_twitter')}</TextMedium>
                        </TouchableOpacity>*/}

                    </View> }

                </View>}

            </SafeAreaInsetsContext.Consumer> )
        )
    }

}

//Map the redux state to your props.
const mapStateToProps = state => ({
    listing: state.listing,
    loading: state.loading,
    user: state.user,
})

//Map your action creators to your props.
const mapDispatchToProps = {
    getListingAction,
    bookmarkListing,
    // select event single date
    checkInOutSelect,
}

//export your list as a default export 
export default connect(mapStateToProps, mapDispatchToProps)(ListingScreen);

const htmlTagsStyles = {
    // h1: {
    //     fontFamily: 'Avenir-Bold',
    // },
    // h2: {
    //     fontFamily: 'Avenir-Bold',
    // },
    // h3: {
    //     fontFamily: 'Avenir-Bold',
    // },
    // h4: {
    //     fontFamily: 'Avenir-Bold',
    // },
    // h5: {
    //     fontFamily: 'Avenir-Bold',
    // },
    // h6: {
    //     fontFamily: 'Avenir-Bold',
    // },
    // p: {
    //     fontFamily: 'Avenir-Regular',
    //     fontSize: 17,
    //     marginBottom: 10,
    // },
    // a: {
    //     fontFamily: 'Avenir-Regular',
    //     fontSize: 17,
    //     marginBottom: 10,
    // },
    // a: {
    //     flex: 0,
    //     opacity: 1,
    //     height: 1,
    //     backgroundColor: 'red',
    //     width: 1,
    // }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },

    navBar: {
        position: 'absolute',
        top: 0,
        // // // marginTop: 52,
        left: 0,
        right: 0,
        zIndex: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 8,
        paddingBottom: 7,
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: '#fff',
        justifyContent: 'space-between',

        // borderBottomColor: 'rgba(0,0,0,0.2)',
        // borderBottomWidth: 1,

        // height: 50,
    },
    filterTitle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    navLeftBtn: {
        // width: 100,
    },
    navRightWrap: {
        
        flexDirection: 'row',
        width: 100,
        marginLeft: 10,
    },
    navButton: {
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#DDDDDD',
        // padding: 10,
        width: 28,
        height: 28,
        // color: '#fff',
    },

    
    contentContainer: {
        // paddingTop: 30,
    },
    singleMedia: {
        height: 250,
        // borderTopLeftRadius: 10,
        // borderTopRightRadius: 10,
    },
    imageMedia: {
        flex: 1
    },
    singleContent: {
        paddingVertical: 20,
        // paddingBottom: 20,
        // paddingLeft: 25,
        // paddingRight: 25,
        paddingHorizontal: 15,
        
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        overflow: 'hidden',
        top: -20
    },
    title: {
        fontSize: 30,
        // fontWeight: '700',
        marginBottom: 10,
    },
    
    screenFooter: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        // paddingBottom: 34,

        borderTopWidth: 1,
        
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        paddingVertical: 15,
    },
    screenFooterLeft: {
        // flexDirection: 'row',
        // alignItems: 'flex-end',
    },
    perPerson: {
        // marginLeft: 3,
    },
    screenFooterRight: {

    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 5,
        backgroundColor: 'rgba(0,0,0,0.4)',
        // flex: 1,
        // width: '100%',
        // height: '100%',
    },
    moreView: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        
        minHeight: 150,

        paddingHorizontal: 15,
        paddingVertical: 20,
    },
    moreLink: {
        marginBottom: 10,

        paddingBottom: 10,
        
        borderBottomWidth: 0.5,
    },
    moreText: {
        fontSize: 15,
        lineHeight: 20,
        
    },
    shareTitle: {
        fontSize: 20,
        lineHeight: 25,
        marginBottom: 20,
        

    },
    shareLink: {
        paddingBottom: 10,
        
        borderBottomWidth: 0.5,
    },
    loadingInner: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        
    },
    contactItem: {
        width: '100%',
        flexDirection: 'row',
        paddingVertical: 15,
        // borderBottomWidth: 1,
    },
    contactItemLabel: {
        width: '30%',
    },
});
