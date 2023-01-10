import React from 'react';
import { 
    View,
    Image,
    FlatList,
    TouchableOpacity, 
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
// import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';


import {translate} from "../../helpers/i18n";
import {regularFontFamily}  from "../../constants/Colors";

import BackButton from '../../components/inners/BackButton';

import TextRegular from '../../components/ui/TextRegular';

import Loader from '../../components/Loader';

// for redux
import { getNotifications, refreshNotifications, loadMoreNotifications } from '../../actions/user';
import { connect } from 'react-redux';
import ForHTML from '../../components/ui/ForHTML';

class Notifications extends React.Component {
    constructor(props){
        super(props);
        this.state = { selected: new Map(), paged: 1 }
        this.onSelect = this.onSelect.bind(this)
    }

    componentDidMount(){
        this.props.getNotifications(this.props.user.ID)
    }

    onSelect(id){
        let {selected} = this.state
        selected.set(id, !selected.get(id));

        this.setState({selected})
    }
    onRefresh(){
        this.props.refreshNotifications(this.props.user.ID)
        // reset paged to first page
        this.setState({paged: 1})
    }
    onEndReached(info){
        const {notipages, notislmore} = this.props.user
        if( notislmore === false && notipages > 0 ){
            let {paged} = this.state
            this.props.loadMoreNotifications(this.props.user.ID, ++paged);
            this.setState({paged})
        }
        
    }
    render(){
        const {loading,apColors} = this.props;
        
        const { selected } = this.state;

        const {notifications, notipages, notisloading, notislmore} = this.props.user
        return (
            ( loading === true ? <Loader loading={true}/> : <SafeAreaInsetsContext.Consumer style={{flex: 1}}>
                {insets => <View style={[styles.container,{backgroundColor: apColors.appBg,paddingLeft: insets.left,paddingRight: insets.right,paddingBottom: insets.bottom}]}>
                    
                    <FlatList
                        data={notifications}
                        renderItem={({ item }) => (
                            <Item
                                id={item.id}
                                notiobj={item}
                                selected={!!selected.get(item.id)}
                                onSelect={this.onSelect}
                                apColors={apColors}
                            />
                        )}
                        keyExtractor={item => item.id}
                        // extraData={selected}
                        onRefresh={()=>this.onRefresh()}
                        refreshing={notisloading}
                        onEndReached={(info)=>this.onEndReached(info)}
                        onEndReachedThreshold={0.1}

                        ListEmptyComponent={()=><View style={styles.listEmpty}><TextRegular style={{color: apColors.lMoreText,fontSize:15,textAlign:'center'}}>{translate('notifications','no_result')}</TextRegular></View>}
                        ListFooterComponent={()=><View style={styles.listFooter}>{notislmore && <ActivityIndicator animating={true}/>}{ notifications.length > 0 && notipages === 0 && <TextRegular style={{color: apColors.lMoreText,fontSize:15,textAlign:'center'}}>{translate('notifications','no_more')}</TextRegular>}</View>}


                    />


                </View>}
            </SafeAreaInsetsContext.Consumer> )
        )
    }
}

//Map the redux state to your props.
const mapStateToProps = state => ({
    user: state.user,
    loading: state.loading,
})

//Map your action creators to your props.
const mapDispatchToProps = {
    getNotifications,
    refreshNotifications,
    loadMoreNotifications
}

//export your list as a default export 
export default connect(mapStateToProps, mapDispatchToProps)(Notifications);

function Item({ id, notiobj, selected, onSelect, apColors }) {
    return (
        <TouchableOpacity
            onPress={() => onSelect(id)}
            style={[
                styles.notiItem,
                { borderBottomColor: apColors.separator, },
                // { backgroundColor: selected ? '#6e3b6e' : '#f9c2ff' },
            ]}
        >
            { null != notiobj.message && notiobj.message !== '' && <ForHTML  source={{ html: notiobj.message }}
            // html={notiobj.message}
                // containerStyle={{marginTop:20}} 
                baseFontStyle={{fontFamily: regularFontFamily,fontSize: 15, color: apColors.pText}}
            />}
            <TextRegular style={[styles.notiDate,{color: apColors.addressText,}]}>{moment.unix(notiobj.timestamp).fromNow()}</TextRegular>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    notiItem: {
        // backgroundColor: '#f9c2ff',
        paddingTop: 20,
        paddingBottom: 10,
        // marginVertical: 8,
        marginHorizontal: 15,

        borderBottomWidth: 1,
        
    },
    notiDate: {
        marginTop: 15,
        fontSize: 13,
        
    },
    listEmpty: {
        paddingVertical: 20,
    },
    listFooter: {
        paddingVertical: 20,
    }
});
