import { 
    GET_CONTACTS,
    GET_CONTACTS_SUCCESS,
    GET_CONTACTS_FAILURE,

    GET_TOP_REPLIES,
    GET_TOP_REPLIES_SUCCESS,

    GET_REPLIES,
    GET_REPLIES_SUCCESS,
    POST_REPLY_SUCCESS,

    CLEAR_REPLIES,
} from '../actions/actionTypes';

const initialState = {
    loading: false,
    loaded: false, // do not load when viewing again
    contacts: [],
    replies: [],
    active: 0,
    touid: 0,
    fuid: 0,

    firstRemain: true,
    lastRID: 0, 
    firstRID: 0,
    noReplyNum: 0,

    repLoading: false,
    topLoading: false,
};

const chat = (state = initialState, action) => {
    switch (action.type) {
        case GET_CONTACTS: 
            return { ...state, loading: true };
            break;
        case GET_CONTACTS_SUCCESS: 
            const { contacts, replies, active, touid, fuid } = action.payload;
            return { ...state, loading: false, loaded: true, contacts, replies, active, touid, fuid };
            break;
        case GET_CONTACTS_FAILURE: 
            return { ...state, loading: false };
            break;
        
        case GET_REPLIES: 
            return { ...state, active: action.payload,repLoading: true };
            break;
        case GET_REPLIES_SUCCESS: 
            if( false == action.payload || false == Array.isArray(action.payload) ) return { ...state, noReplyNum: state.noReplyNum + 1, repLoading: false }
            if( null == action.lastRID ){
                // update state for new contact
                let new_r_state = {replies: action.payload, noReplyNum: 0}
                if(action.payload.length){
                    new_r_state.firstRemain = true
                    new_r_state.firstRID = action.payload[0]['crid']
                    new_r_state.lastRID = action.payload[action.payload.length - 1]['crid']
                }else{
                    new_r_state.firstRemain = false
                    new_r_state.firstRID = 0
                    new_r_state.lastRID = 0
                }
                return { ...state, ...new_r_state, repLoading: false }
            } 
            if(action.payload.length == 0) return { ...state, noReplyNum: state.noReplyNum + 1, repLoading: false }

            let newReplies = [...state.replies,...action.payload]
            let newRepliesArr = newReplies.filter( ( ele, indx, oriArr ) => {
                if( null != ele.crid ){
                    return indx === oriArr.findIndex( nel => nel.crid === ele.crid ) ? true : false;
                }
                return false;
            } );

            let nFirstRID = newRepliesArr[0]['crid'],
                nLastRID = newRepliesArr[newRepliesArr.length - 1]['crid'];
            
            return { ...state, replies: newRepliesArr, noReplyNum: 0, firstRID: nFirstRID, lastRID: nLastRID, repLoading: false };
            break;
        case GET_TOP_REPLIES: 
            return { ...state, topLoading: true };
            break;
        case GET_TOP_REPLIES_SUCCESS: 
            let newRState = {...state, topLoading: false}
            if( Array.isArray( action.payload ) && action.payload.length > 0 ){
                let sReplies = [...action.payload,...state.replies]
                sReplies = sReplies.filter( ( ele, indx, oriArr ) => {
                    if( null != ele.crid ){
                        return indx === oriArr.findIndex( nel => nel.crid === ele.crid ) ? true : false;
                    }
                    return false;
                } );
                newRState.firstRID = sReplies[0]['crid']
                newRState.replies = sReplies
            }else{
                newRState.firstRemain = false;
            }
            
            return newRState;
            break;
        case POST_REPLY_SUCCESS: 
            let newState = { replies: [...state.replies, action.payload] }
            if( null != action.payload.crid ){
                newState.lastRID = action.payload.crid
                // for firt reply from listing
                if( state.firstRID == 0 ){
                    newState.firstRID = action.payload.crid
                    newState.firstRemain = true
                }
            }
            if( null != action.payload.cid && state.active != action.payload.cid  ){
                newState.active = action.payload.cid
            }

            return { ...state, ...newState };
            break;
        case CLEAR_REPLIES: 
            return { ...state, replies: [] };
            break;
        default:
            return state;
    }
};

export default chat;
