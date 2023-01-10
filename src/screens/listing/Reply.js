import React from 'react';
import { 
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import {translate} from "../../helpers/i18n";

import ReplyCom from '../ReplyCom';
import TextMedium from '../../components/ui/TextMedium';
// for redux
import { getReplies, postReply, getMoreTopReplies, clearReplies } from '../../actions/chat';
import { connect } from 'react-redux';

class ReplyNew extends ReplyCom{
    static navigationOptions = ({ navigation, route }) => {
        
        return {
            title: route.params?.display_name ?? translate('reply','new_chat'),
            headerRight: () => {
                return <TouchableOpacity 
                    onPress={ ()=> {
                        navigation.navigate('ProfileStack', {screen: 'Chat', params: {fromListing: true} })
                    } } 
                    style={styles.contactsBtn}><TextMedium style={styles.contactsText}>{translate('reply','contacts')}</TextMedium></TouchableOpacity>
            },
        };
    }
}

//Map the redux state to your props.
const mapStateToProps = state => ({
    user: state.user,
    chat: state.chat,
})

//Map your action creators to your props.
const mapDispatchToProps = {
    getReplies,
    postReply,
    getMoreTopReplies,
    clearReplies
}

//export your list as a default export 
export default connect(mapStateToProps, mapDispatchToProps)(ReplyNew);


const styles = StyleSheet.create({
    contactsBtn: {
        marginRight: 15, 
        height: 28, 
        // width: 50,
        justifyContent:'center',
        // backgroundColor: 'red',
    },
    contactsText: {
        fontSize: 17,
        textAlign: 'right',
        
        // backgroundColor: 'yellow',
    },
});
