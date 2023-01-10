import React from 'react';
import {
    
    Image,
    
    FlatList,
    StyleSheet,
    Text,
    TextInput, 
    TouchableOpacity,
    View,
    // AsyncStorage,

    Keyboard,
    Platform,
    StatusBar,
    Dimensions,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';


// import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';


import {mediumFontFamily} from '../constants/Colors';
// import BackButton from '../components/inners/BackButton';

import {translate} from "../helpers/i18n";
import {fomartCurrOut} from '../helpers/currency';


import BtnLink from '../components/ui/BtnLink';

import TextHeavy from '../components/ui/TextHeavy';
import TextMedium from '../components/ui/TextMedium';
import TextRegular from '../components/ui/TextRegular';

import { ClockSvg, SendHozSvg } from '../components/icons/ButtonSvgIcons';
import ForHTML from '../components/ui/ForHTML';

// import {logOut} from '../helpers/user';



export default class ReplyCom extends React.Component{
    constructor(props){
        super(props)
        let reply = '',
            initCID = 0;
        const cidParam = this.props.route.params?.cid ?? 0;
        if( cidParam === 'New' ){
            // for making listing card
            // let lobject = this.props.navigation.getParam('lobject', {});
            // reply = 'LCARD||'+ encodeURIComponent(JSON.stringify(lobject))
            // reply = 'LCARD||'+this.props.navigation.getParam('lid', 0)+'||'+this.props.navigation.getParam('ltitle', 'Title')
            initCID = 'New'
        }
        this.state = { keyboardHeight: 0, reply, initCID, cardSent: false }
        this.timeout = null;

        this.keyboardDidHideListener = null;
        this._keyboardDidShow = this._keyboardDidShow.bind(this);
        this._keyboardDidHide = this._keyboardDidHide.bind(this);

        // this.props.clearReplies()
    }
    static getDerivedStateFromProps(props, state) {
        // checking for 
        if( null != props.chat.active && props.chat.active != state.initCID ){
            return {initCID: props.chat.active}
        }
        // No state update necessary
        return null;
    }
    componentDidMount() {
        const cid = this.props.route.params?.cid ?? 0;
        if( cid != 'New' ){
            this.props.getReplies( cid )
            this.getRepliesTimeoutFunction()
        }
        

        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            this._keyboardDidShow,
        );
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            this._keyboardDidHide,
        );

        

        
    }
    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();

        // for timeout when un mount
        if(this.timeout != null) clearTimeout(this.timeout)
    }
    _keyboardDidShow(e) {
        let keyboardHeight = e.endCoordinates.height
        // , innerHeight = Dimensions.get('window').height - keyboardHeight - 50;
        this.setState( {keyboardHeight} )
    }

    _keyboardDidHide() {
        this.setState( {keyboardHeight: 0} )
    }
    getRepliesTimeoutFunction(){
        let cid = this.props.route.params?.cid ?? 0;
        if( cid === 'New' && this.state.initCID != 0 ){
            cid = this.state.initCID
        }
        const {active, lastRID, noReplyNum} = this.props.chat
        this.props.getReplies(cid, lastRID)
        let nextRequest = 60000;
        // 2 seconds
        if(noReplyNum > 3){
            nextRequest *= 5;
        }
        if(noReplyNum > 10){
            nextRequest *= 10;
        }
        // 15 seconds
        if(noReplyNum > 20){
            nextRequest *= 20;
        }
        this.timeout = setTimeout(()=>{
            this.getRepliesTimeoutFunction()
        }, nextRequest)
    }
    onInputChange = (reply) => {
        this.setState({reply})
    }

    postReply(){ 
        const {reply,initCID} = this.state;
        if( reply.length > 0 ){
            let     cid = this.props.route.params?.cid ?? 0, 
                    touid = this.props.route.params?.touid ?? 0; 
                    // , fuid = this.props.navigation.getParam('fuid', 0);
            const user_id = this.props.user.ID;

            if( cid === 'New' && initCID != 0 ){
                cid = initCID;
            }
            this.props.postReply( { reply_text : reply, user_id, touid, cid } );
            this.setState( { reply: '' } )

            if( this.timeout == null ) this.getRepliesTimeoutFunction()
        }  
    }
    sendListingCard(){
        const {cardSent} = this.state;
        let     cid = this.props.route.params?.cid ?? 0;
        if( cid === 'New' && cardSent == false ){
            let lobject = this.props.route.params?.lobject ?? {};
            let reply = 'LCARD'+ encodeURIComponent(JSON.stringify(lobject))
                    // , fuid = this.props.route.params?.fuid ?? 0;
            let     touid = this.props.route.params?.touid ?? 0; 

            const user_id = this.props.user.ID;

            this.props.postReply( { reply_text : reply, user_id, touid, cid } );
            this.setState( { reply: '', cardSent: true } )

            if( this.timeout == null ) this.getRepliesTimeoutFunction()
        }
    }
    onEndReached(info){
        const {firstRemain, firstRID, topLoading} = this.props.chat
        if( false === topLoading && firstRemain ){
            let     cid = this.props.route.params?.cid ?? 0;
            if( cid === 'New' && this.state.initCID != 0 ){
                cid = this.state.initCID;
            }
            this.props.getMoreTopReplies(cid, firstRID)
        }
        
    }
    render(){
        
        const _self = this
        const {apColors} = _self.props;
        const {keyboardHeight,reply} = _self.state;
    	const {
            replies,
            topLoading,
            firstRemain,
            repLoading,
        } = this.props.chat
        const {ID} = this.props.user
        const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
        const innerHeight = Dimensions.get('window').height - keyboardHeight - 50 - STATUSBAR_HEIGHT;
        let listDatas = [...replies]
        listDatas.reverse()

        let hasCard = false,
        cardObj = {};
        const     cid = this.props.route.params?.cid ?? 0
        if( cid === 'New' && this.state.cardSent == false ){
            hasCard = true;
            cardObj = this.props.route.params?.lobject ?? {};
        }
    	return (
    		<SafeAreaInsetsContext.Consumer style={{flex: 1}}>
                {insets => <View style={[styles.container,{backgroundColor: apColors.appBg,paddingBottom: insets.bottom ,paddingLeft: insets.left,paddingRight: insets.right}]}>
    	            <View style={[styles.innerView,{height: innerHeight - insets.bottom }]}>
                        <FlatList
                            data={listDatas}
                            renderItem={({ item }) => (
                                <Reply
                                    id={item.crid}
                                    reply={item}
                                    cUID={ID}
                                    apColors={apColors}
                                />
                            )}
                            keyExtractor={item => item.crid}
                            // extraData={selected}
                            // onRefresh={()=>this.onRefresh()}
                            // refreshing={repLoading}
                            onEndReached={(info)=>this.onEndReached(info)}
                            onEndReachedThreshold={0.1}
                            numColumns={1}
                            style={[styles.flatList,{backgroundColor: apColors.secondBg,}]}

                            // ListEmptyComponent={()=><View style={styles.listEmpty}><TextRegular style={{color: apColors.lMoreText,fontSize:15,textAlign:'center'}}>{translate('notifications','no_result')}</TextRegular></View>}
                            ListFooterComponent={()=><View style={styles.listFooter}>{topLoading && <ActivityIndicator animating={true}/>}{ replies.length > 0 && firstRemain === false && <TextRegular style={{color: apColors.lMoreText,fontSize:15,textAlign:'center'}}>{translate('reply','no_more')}</TextRegular>}</View>}
                            inverted={true}
                            keyboardShouldPersistTaps='handled'
                        />
                        {( hasCard && null != cardObj.title &&

                            <View style={[styles.cardInner,{backgroundColor: apColors.appBg,borderRadius: 0}]}>
                                    { null != cardObj.thumbnail && '' != cardObj.thumbnail && <Image source={{uri: cardObj.thumbnail}} style={styles.cardImage}/> }
                                    <View style={styles.cardDetails}>
                                        <TextMedium style={styles.cardTitle}>{cardObj.title}</TextMedium>
                                        <TextRegular style={[styles.cardPrice,{color: apColors.appColor,}]}>{fomartCurrOut(cardObj.price)}</TextRegular>

                                        <BtnLink size={13} style={{ paddingVertical: 0,paddingHorizontal:0}} onPress={() => _self.sendListingCard()}>{translate('reply','send_listing')}</BtnLink>
                                    </View>
                            </View>
                        )}
                        <View style={[styles.inputWrap,{backgroundColor: apColors.appBg,borderTopColor: apColors.separator,}]}>
                            <TextInput 
                                // placeholder={translate('home','search')}
                                style={[styles.inputField,{backgroundColor: apColors.searchBg,borderColor: apColors.searchBg,color: apColors.pText,}]}
                                onChangeText={_self.onInputChange}
                                // onFocus={e=>this.onFucusInput('log')}
                                // returnKeyType='send'
                                // onSubmitEditing = {this.nextField}
                                autoCorrect={false}
                                underlineColorAndroid='transparent'
                                autoCapitalize="none"
                                autoCompleteType="off"
                                // keyboardType="email-address"
                                value={reply}
                                multiline={true}
                            />
                            <TouchableOpacity onPress={ () => _self.postReply() }
                                style={styles.sendButton}
                            ><SendHozSvg fill={apColors.appColor}/></TouchableOpacity>
                        </View>

                    </View>

                </View>}
            </SafeAreaInsetsContext.Consumer>
    	)
    }
}



function Reply({ id, reply, cUID, apColors }) {
    
    let replyWStyle = styles.replyItem,
        rInnerStyle = styles.replyInner,
        rDetailsStyle = [styles.replyDetails,{backgroundColor: apColors.replyBg,}],
        avatarStyle = styles.avatar,
        timeAddStyle = {},
        tColor    = '#000'; //      = '#1E2432';
    if( reply.uid != reply.user_one ){
        replyWStyle = [replyWStyle, styles.replyReply];
        rInnerStyle = [rInnerStyle, styles.replyReplyInner];
        rDetailsStyle = [rDetailsStyle, styles.replyReplyDetails];
        avatarStyle = [avatarStyle, styles.avatarReply];

        timeAddStyle = {justifyContent: 'flex-end',};
    } 
    if( reply.uid == cUID ){
        replyWStyle = [replyWStyle, styles.yourReply];
        rDetailsStyle = [rDetailsStyle, {backgroundColor: apColors.appColor,}];
        tColor          = '#FFF';
    }
    let replyText = null != reply.reply ? reply.reply : '';
    let hasCard = false,
        cardObj = {};
    if( replyText.indexOf('LCARD') === 0 ){
        hasCard = true;
        replyText = decodeURIComponent( replyText.substr(5) )
        try {
            cardObj = JSON.parse(replyText)
        }
        catch(err) {
            console.log(err);
        }
        // const {title, thumbnail, price} = cardObj
        // cardJSX = <View style={styles.cardInner}>
        //         { null != thumbnail && '' != thumbnail && <Image source={{uri: thumbnail}} style={styles.cardImage}/> }
        //         <View style={styles.cardDetails}>
        //             <TextHeavy style={styles.cardTitle}>{title}</TextHeavy>
        //             <TextHeavy style={styles.cardTitle}>{price}</TextHeavy>

        //         </View>
        // </View>
    }

    // 
    return ( hasCard && null != cardObj.title ? 

        <View style={[styles.cardInner,{backgroundColor: apColors.appBg,}]}>
                { null != cardObj.thumbnail && '' != cardObj.thumbnail && <Image source={{uri: cardObj.thumbnail}} style={styles.cardImage}/> }
                <View style={styles.cardDetails}>
                    <TextMedium style={styles.cardTitle}>{cardObj.title}</TextMedium>
                    <TextRegular style={[styles.cardPrice,{color: apColors.appColor,}]}>{fomartCurrOut(cardObj.price)}</TextRegular>

                </View>
        </View>

        :

        <View style={replyWStyle}>  
            
            <View style={rInnerStyle}>

                { null != reply.avatar_url && reply.avatar_url != '' && <Image
                    style={avatarStyle}
                    source={{uri: reply.avatar_url}}
                    resizeMode="cover"
                /> }
                <View style={styles.replyDetailsWrap}>
                    
                        <View style={[styles.timeWrap,timeAddStyle]}><TextRegular style={[styles.lastReplyDate,{color: apColors.addressText,}]}>{moment.unix(reply.crtime).fromNow()}</TextRegular></View>
                        <View style={rDetailsStyle}>

                            { hasCard === false && replyText !== '' && <ForHTML  source={{ html: replyText }}
                            // html={replyText}
                                baseFontStyle={{fontFamily: mediumFontFamily,fontSize: 15,lineHeight: 24, color: tColor}}
                            /> }

                            

                        </View>
                    
                </View>
                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
        // backgroundColor: 'red',
        // backgroundColor: '#F7F8FA',
    },
    innerView: {
        // backgroundColor: 'blue',
        // height: '50%',
        // paddingVertical: 30,
        width: '100%',


    },
    flatList: {
        
        paddingHorizontal: 15,
        paddingTop: 20,
        // paddingBottom: 20,
    },
    replyItem: {
        // width: '90%',
        // paddingVertical: 15,
        // paddingHorizontal: 20,
        // borderBottomColor: '#EAECEF',
        // borderBottomWidth: 1,
        marginBottom: 25,
        // overflow: 'hidden',
    },
    replyInner: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },

    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        overflow: 'hidden',
        marginRight: 15,
    },
    replyDetailsWrap: {
        flex: 1,
    },
    replyDetails: {
        // flex: 1,
        paddingVertical: 13,
        paddingHorizontal: 15,
        borderRadius: 10,
        borderTopLeftRadius: 0,

        alignSelf: 'flex-start',
    },
    replyName: {
        fontSize: 17,
        lineHeight: 22,
        marginBottom: 7,
    },
    lastReplyDate: {
        fontSize: 13,
        lineHeight: 18,
        
        // marginBottom: 5,

        // position: 'absolute',
        // right: 0,
        // top: 3,
    },
    // reply - reply
    replyReplyInner: {
        flexDirection: 'row-reverse',
    },
    avatarReply: {
        marginRight: 0,
        marginLeft: 15,
    },
    replyReplyDetails: {
        alignItems: 'flex-end',
        
        borderTopRightRadius: 0,
        borderTopLeftRadius: 10,
        alignSelf: 'flex-end',
    },

    timeWrap: {
        // backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 2,
    },


    // input
    inputWrap: {
        // height: 50,
        
        paddingHorizontal: 15,

        borderTopWidth: 0.5,
        
        paddingTop: 5,
        paddingBottom: 10,

        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    inputField: {
        flex: 1,
        minHeight: 40,
        
        borderWidth: 1,
        

        // paddingLeft: 37,
        // paddingRight: 20,
        
        fontSize: 16,
        // backgroundColor: 'blue',

        paddingHorizontal: 15,
        paddingVertical: 7,
        borderRadius: 8,
    },
    sendButton: {
        height: 40,
        paddingHorizontal: 10,
        // paddingVertical: 5,
        // backgroundColor: 'green',
        justifyContent: 'center',
        marginLeft: 15,
    },
    listFooter: {
        marginTop: 20,
        paddingVertical: 20,
        // backgroundColor: 'red',
    },


    cardInner: {
        flexDirection: 'row',
        
        paddingVertical: 15,
        paddingHorizontal: 15,

        borderRadius: 10,
        marginBottom: 10,
    },
    cardImage: {
        width: 100,
        // height: 100,
        borderRadius: 4, 
        overflow: 'hidden',
        // flex: 1,
        marginRight: 15,
    },
    cardDetails: {
        // paddingLeft: 20,
        // flex: 1,
        // padding: 9,
    },
    cardTitle: {
        fontSize: 17,
        lineHeight: 22,
        // marginTop: 9,
        // marginBottom: 10
    },
    cardPrice: {
        fontSize: 15,
        lineHeight: 20,
        marginTop: 7,
        
    },
});
