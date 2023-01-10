import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    // AsyncStorage,
} from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';


import {translate} from "../helpers/i18n";

import SignInScreen from './profile/SignIn';
import BtnLarge from '../components/ui/BtnLarge';
import TextBold from '../components/ui/TextBold';
import TextMedium from '../components/ui/TextMedium';
import TextRegular from '../components/ui/TextRegular';

import {
    GoDetailsSvg,
    ArrowDetailsSvg,
    NotificationsSvg,
    CardsSvg,
    LanguageSvg,
    CurrencySvg,

    TermsSvg,
    PrivacySvg,
    HelpCenterSvg,
    AboutUsSvg,

    ChatProfileSvg,

} from '../components/icons/ButtonSvgIcons';

import {logOut} from '../helpers/user';

// for redux
// import { goEditProfile } from '../actions/user';
import { connect } from 'react-redux';

class ProfileScreen extends React.Component{
    constructor(props){
        super(props)
        this.state = {data: []}
    }
    logOut(){
        logOut();
        this.props.navigation.navigate('Home')
    }
    render(){
        const {apColors} = this.props;
    	const {isLoggedIn, avatar,display_name,role_name} = this.props.user
        if( !isLoggedIn ) return null;
        const {
            terms_page,
            policy_page,
            help_page,
            about_page,
        } = this.props.site;
    	return ( 
            <SafeAreaInsetsContext.Consumer style={{flex: 1}}>
                {insets => <View style={[styles.container,{backgroundColor: apColors.secondBg,paddingTop: insets.top,paddingLeft: insets.left,paddingRight: insets.right}]}>
    	            <ScrollView
    	                style={{flex: 1}}
    	                contentContainerStyle={{backgroundColor: apColors.appBg,}}>
                        <TouchableOpacity style={[styles.headerSection,{backgroundColor: apColors.secondBg,borderBottomColor: apColors.separator,}]} onPress={()=>{this.props.navigation.navigate('EditProfile')}}>
                        	
                            { avatar && <Image
                                source={{uri: avatar}}
                                style={styles.avatar}
                                resizeMode="cover"
                            /> }
                            <View style={styles.detailsWrap}>
                                <View style={styles.authorWrap}><TextBold style={[styles.authorName,{color: apColors.hText,}]}>{display_name}</TextBold><GoDetailsSvg style={{marginLeft: 10,marginBottom: 4}}/></View>
                                <View style={[styles.authorRole,{backgroundColor: apColors.appColor,}]}><TextMedium style={styles.authorRoleText}>{role_name}</TextMedium></View>
                            </View>
                        	
                        </TouchableOpacity>

                        <View style={styles.menusWrap}>
                            <TouchableOpacity style={styles.menuItem} onPress={()=>{this.props.navigation.navigate('Notifications')}}>
                                <View style={styles.menuItemWrap}>
                                    <View style={styles.menuItemInner}>
                                        <NotificationsSvg style={styles.menuItemIcon}/>
                                        <TextRegular style={styles.menuItemText}>{translate('profile','notis')}</TextRegular>
                                    </View>
                                    <ArrowDetailsSvg/>
                                </View>
                            </TouchableOpacity>

                            

                            <TouchableOpacity style={styles.menuItem} onPress={()=>{} }>
                                <View style={styles.menuItemWrap}>
                                    <View style={styles.menuItemInner}>
                                        <CardsSvg style={styles.menuItemIcon}/>
                                        <TextRegular style={styles.menuItemText}>{translate('profile','my_cards')}</TextRegular>
                                    </View>
                                    <ArrowDetailsSvg/>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.menuItem} onPress={ ()=>this.props.navigation.navigate('Chat') }>
                                <View style={styles.menuItemWrap}>
                                    <View style={styles.menuItemInner}>
                                        <ChatProfileSvg style={styles.menuItemIcon}/>
                                        <TextRegular style={styles.menuItemText}>{translate('profile','chat')}</TextRegular>
                                    </View>
                                    <ArrowDetailsSvg/>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.menuItem} onPress={ ()=>this.props.navigation.navigate('Language') }>
                                <View style={styles.menuItemWrap}>
                                    <View style={styles.menuItemInner}>
                                        <LanguageSvg style={styles.menuItemIcon}/>
                                        <TextRegular style={styles.menuItemText}>{translate('profile','language')}</TextRegular>
                                    </View>
                                    <ArrowDetailsSvg/>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.menuItem} onPress={ ()=>this.props.navigation.navigate('Currency') }>
                                <View style={styles.menuItemWrap}>
                                    <View style={styles.menuItemInner}>
                                        <CurrencySvg style={styles.menuItemIcon}/>
                                        <TextRegular style={styles.menuItemText}>{translate('profile','currency')}</TextRegular>
                                    </View>
                                    <ArrowDetailsSvg/>
                                </View>
                            </TouchableOpacity>


                            <View style={styles.spacer}></View>

                            { terms_page != '' && <TouchableOpacity style={styles.menuItem} onPress={()=>this.props.navigation.navigate('ProfileWeb',{ title:translate('profile','terms_conditions'), url: terms_page }) }>
                                <View style={styles.menuItemWrap}>
                                    <View style={styles.menuItemInner}>
                                        <TermsSvg style={styles.menuItemIcon} fill="#222831"/>
                                        <TextRegular style={styles.menuItemText}>{translate('profile','terms_conditions')}</TextRegular>
                                    </View>
                                    <ArrowDetailsSvg/>
                                </View>
                            </TouchableOpacity> }

                            { policy_page != '' && <TouchableOpacity style={styles.menuItem} onPress={()=>this.props.navigation.navigate('ProfileWeb',{ title:translate('profile','privacy_policy'), url: policy_page }) }>
                                <View style={styles.menuItemWrap}>
                                    <View style={styles.menuItemInner}>
                                        <PrivacySvg style={styles.menuItemIcon}/>
                                        <TextRegular style={styles.menuItemText}>{translate('profile','privacy_policy')}</TextRegular>
                                    </View>
                                    <ArrowDetailsSvg/>
                                </View>
                            </TouchableOpacity> }

                            { help_page != '' && <TouchableOpacity style={styles.menuItem} onPress={()=>this.props.navigation.navigate('ProfileWeb',{ title:translate('profile','help_center'), url: help_page }) }>
                                <View style={styles.menuItemWrap}>
                                    <View style={styles.menuItemInner}>
                                        <HelpCenterSvg style={styles.menuItemIcon}/>
                                        <TextRegular style={styles.menuItemText}>{translate('profile','help_center')}</TextRegular>
                                    </View>
                                    <ArrowDetailsSvg/>
                                </View>
                            </TouchableOpacity> }

                            { about_page != '' && <TouchableOpacity style={styles.menuItem} onPress={ ()=>this.props.navigation.navigate('ProfileWeb',{ title:translate('profile','about_us'), url: about_page }) }>
                                <View style={styles.menuItemWrap}>
                                    <View style={styles.menuItemInner}>
                                        <AboutUsSvg style={styles.menuItemIcon}/>
                                        <TextRegular style={styles.menuItemText}>{translate('profile','about_us')}</TextRegular>
                                    </View>
                                    <ArrowDetailsSvg/>
                                </View>
                            </TouchableOpacity> }

                            <View style={styles.spacer}></View>

                            <TouchableOpacity style={styles.logOutMenuItem} onPress={()=>this.logOut()}>
                                <TextRegular style={[styles.menuItemText,{color: apColors.appColor,textAlign:'center'}]}>{translate('profile','logout')}</TextRegular>
                            </TouchableOpacity>

                        </View>

                    </ScrollView>
                </View>}
            </SafeAreaInsetsContext.Consumer>
    	)
    }
}

//Map the redux state to your props.
const mapStateToProps = state => ({
    app: state.app,
    user: state.user,
    site: state.site,
})

//Map your action creators to your props.
const mapDispatchToProps = {
    // goEditProfile
}

//export your list as a default export 
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#FFF',
        
    },
    headerSection: {
        paddingTop: 70,
        paddingBottom: 40,
        paddingHorizontal: 20,
        
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        
        marginBottom: 40,
    },
    avatar: {
        height: 100,
        width: 100,
        borderRadius: 50,
        marginRight: 22,
    },
    detailsWrap: {

    },
    authorWrap: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    authorName: {
        
        fontSize: 20,
        lineHeight: 24,
    },
    authorRole: {
        
        
        borderRadius: 4,
        paddingHorizontal: 4
        // padding: 4
    },
    authorRoleText: {
        color: '#FFF',
        fontSize: 11,
        lineHeight: 20,
    },
    menusWrap: {
        paddingHorizontal: 20,
    },
    menuItem: {
        marginBottom: 15,
    },
    menuItemWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    menuItemInner: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuItemIcon: {
        marginRight: 15
    },
    menuItemText: {
        fontSize: 17,
        // color: apColors.tText,
        lineHeight: 22,
    },
    spacer: {
        height: 40
    },
    logOutMenuItem: {
        marginBottom: 30,
    }
});
