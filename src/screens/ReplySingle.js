import React from 'react';

import {translate} from "../helpers/i18n";
import ReplyCom from './ReplyCom';

// for redux
import { getReplies, postReply, getMoreTopReplies, clearReplies } from '../actions/chat';
import { connect } from 'react-redux';

class ReplySingle extends ReplyCom{
    // constructor(props){
    //     super(props)
    //     this.props.clearReplies()
    // }
    static navigationOptions = ({ route }) => {
        return {
            title: route.params?.display_name ?? translate('reply','new_chat'),
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
export default connect(mapStateToProps, mapDispatchToProps)(ReplySingle);

