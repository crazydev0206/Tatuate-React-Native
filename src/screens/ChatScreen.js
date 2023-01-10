import React from 'react';
import {
    Image,
    Platform,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    // AsyncStorage,
} from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';


// import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import BackButton from '../components/inners/BackButton';
import {translate} from "../helpers/i18n";



import {regularFontFamily} from '../constants/Colors';
// import ProfileSignInScreen from './profile/SignIn';
import NavTitle from '../components/ui/NavTitle';

import BtnLarge from '../components/ui/BtnLarge';
import TextBold from '../components/ui/TextBold';
import TextHeavy from '../components/ui/TextHeavy';
import TextMedium from '../components/ui/TextMedium';
import TextRegular from '../components/ui/TextRegular';

// import {
//     GoDetailsSvg,
//     ArrowDetailsSvg,
//     NotificationsSvg,
//     CardsSvg,
//     LanguageSvg,
//     CurrencySvg,

//     TermsSvg,
//     PrivacySvg,
//     HelpCenterSvg,
//     AboutUsSvg,
// } from '../components/icons/ButtonSvgIcons';

// import {logOut} from '../helpers/user';

// for redux
import { getContacts } from '../actions/chat';
import { connect } from 'react-redux';
import ForHTML from '../components/ui/ForHTML';

class ChatScreen extends React.Component{
    constructor(props){
        super(props)
        this.state = {data: []}
        
    }
    componentDidMount() {
        const {loaded} = this.props.chat
        if( !loaded ){
            this.props.getContacts(this.props.user.ID)
        }
    }
    _onGoBack(){
        const backRoute = this.props.route.params?.backRoute ?? 'Profile';
        // const backRoute = this.props.navigation.getParam('backRoute', 'Home');
        this.props.navigation.navigate(backRoute)
    }
    _renderHeader(cstyle = {}){
        const {apColors} = this.props;
        return (
            <View style={[styles.navBar,{backgroundColor: apColors.appBg,},apColors.headerNavStyle,cstyle]}>
                <BackButton color={apColors.backBtn} style={{width: 50}} onPress={ () => this._onGoBack() }/>
                {/*<NavTitle title={translate('chat','hTitle')} />*/}
                <Text style={apColors.headerTitleStyle}>{translate('chat','hTitle')}</Text>
                <View style={{width: 50,}}/>
            </View>
        )
    }
    onSelect(reply){
        const {cid,crid,display_name,
            // for submit reply
            touid,
            user_one
        } = reply
        this.props.navigation.navigate( 'Reply', { cid, crid, display_name, touid, fuid: user_one } )
    }
    onRefresh(){
        this.props.getContacts(this.props.user.ID)
    }
    render(){
        const {apColors} = this.props;
    	const {contacts, loading} = this.props.chat
    	return (
    		<SafeAreaInsetsContext.Consumer style={{flex: 1}}>
                {insets => <View style={[styles.container,{backgroundColor: apColors.appBg,paddingTop: insets.top, paddingBottom: insets.bottom ,paddingLeft: insets.left,paddingRight: insets.right}]}>
    	            {this._renderHeader()}
                    <FlatList
                        data={contacts}
                        renderItem={({ item }) => (
                            <Contact
                                id={item.cid}
                                contact={item}
                                // selected={!!selected.get(item.id)}
                                onSelect={()=>this.onSelect(item)}
                                apColors={apColors}
                            />
                        )}
                        keyExtractor={item => item.cid}
                        // extraData={selected}
                        onRefresh={()=>this.onRefresh()}
                        refreshing={loading}
                        // onEndReached={(info)=>this.onEndReached(info)}
                        // onEndReachedThreshold={0.1}

                        style={styles.flatList}

                        // ListEmptyComponent={()=><View style={styles.listEmpty}><TextRegular style={{color: apColors.lMoreText,fontSize:15,textAlign:'center'}}>{translate('notifications','no_result')}</TextRegular></View>}
                        // ListFooterComponent={()=><View style={styles.listFooter}>{notislmore && <ActivityIndicator animating={true}/>}{ notifications.length > 0 && notipages === 0 && <TextRegular style={{color: apColors.lMoreText,fontSize:15,textAlign:'center'}}>{translate('notifications','no_more')}</TextRegular>}</View>}


                    />
                </View>}
            </SafeAreaInsetsContext.Consumer>
    	)
    }
}

//Map the redux state to your props.
const mapStateToProps = state => ({
    user: state.user,
    chat: state.chat,
})

//Map your action creators to your props.
const mapDispatchToProps = {
    getContacts
}

//export your list as a default export 
export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);


function Contact({ id, contact, onSelect, apColors }) {
    let replyText = null != contact.reply ? contact.reply : '';
    if( replyText.indexOf('LCARD') === 0 ){
        replyText = '';
    }
    return (
        <TouchableOpacity
            onPress={ onSelect }
            style={[styles.contactItem,{ borderBottomColor: apColors.separator, }]}
        >  
            <View style={styles.contactInner}>

                { null != contact.avatar_url && contact.avatar_url != '' && <Image
                    style={styles.avatar}
                    source={{uri: contact.avatar_url}}
                    resizeMode="cover"
                /> }

                <View style={styles.contactDetails}>

                    <TextHeavy style={styles.contactName}>{contact.display_name}</TextHeavy>
                    

                    { replyText !== '' && <ForHTML  source={{ html: replyText }}
                    // html={replyText}
                        // containerStyle={{marginTop:20}} 
                        baseFontStyle={{fontFamily: regularFontFamily,fontSize: 15, color: apColors.pText}}
                    />}
                    
                    <TextRegular style={[styles.lastReplyDate,{color: apColors.addressText,}]}>{moment.unix(contact.crtime).fromNow()}</TextRegular>
                </View>
                    
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
        // backgroundColor: 'red',
    },
    flatList: {
        paddingHorizontal: 15,
        // backgroundColor: '#F7F8FA',
    },
    navBar: {
        // position: 'absolute',
        // top: 52,
        // // marginTop: 52,
        // left: 0,
        // right: 0,
        // zIndex: 200,
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row',
        alignItems: 'center',
        
        justifyContent: 'space-between',

        height: 50,

        paddingTop: 8,
        paddingBottom: 7,
        borderBottomColor: 'rgba(0,0,0,0.2)',
        borderBottomWidth: 0.5,
    },
    contactItem: {
        paddingVertical: 15,
        // paddingHorizontal: 20,
        
        borderBottomWidth: 1,
    },
    contactInner: {
        flexDirection: 'row',

    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        overflow: 'hidden',
        marginRight: 15,
    },
    contactDetails: {
        flex: 1,
    },
    contactName: {
        fontSize: 17,
        lineHeight: 22,
        marginBottom: 7,
    },
    lastReplyDate: {
        fontSize: 13,
        lineHeight: 18,
        

        position: 'absolute',
        right: 0,
        top: 3,
    },
});
