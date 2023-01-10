import React from 'react';
import { 
    View,
    Image,
    FlatList,
    TouchableOpacity,
    ScrollView, 
    StyleSheet 
} from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';


import {filterByLoc} from '../helpers/store';
import {translate} from "../helpers/i18n";


import TaxOverCard from '../components/inners/TaxOverCard';


import { connect } from 'react-redux';

class LocsScreen extends React.Component{
    constructor(props){
        super(props)
        // this.state = {data: []}
    }
    goToArchive(term){
        const {id} = term;
        if( null != id ){
            filterByLoc( id )
            this.props.navigation.navigate('Archive')
        }
    }
    render(){
        const _self = this
        const {apColors} = _self.props;
        const {locs} = _self.props.site
        const filteredItems = locs.filter(itm => itm.count > 0 );
        return(
            <SafeAreaInsetsContext.Consumer style={{flex: 1}}>
                {insets => <View style={[styles.container,{backgroundColor: apColors.appBg,paddingBottom: insets.bottom,paddingLeft: insets.left,paddingRight: insets.right}]}>
                
                    <FlatList

                        data={filteredItems}
                        renderItem={({ item, index }) => (
                            <TaxOverCard id={item.id} post={item} onPress={()=>_self.goToArchive(item)} overlay={true}/>
                        )}
                        keyExtractor={item => String(item.id)}
                        numColumns="2"
                        // extraData={selected}
                        style={styles.flatList}
                        // columnWrapperStyle={{width: '50%',backgroundColor: 'red'}}
                        // horizontal={true}
                        // showsHorizontalScrollIndicator={false}
                        // viewabilityConfig={_self.viewabilityConfig}
                        // onViewableItemsChanged={_self.onViewableItemsChanged}
                    />
                </View>}
            </SafeAreaInsetsContext.Consumer>
        )
    }
}

//Map the redux state to your props.
const mapStateToProps = state => ({
    site: state.site,
})

//Map your action creators to your props.
const mapDispatchToProps = {}

//export your list as a default export 
export default connect(mapStateToProps, mapDispatchToProps)(LocsScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: 15,
        
    },
    flatList: {
        flex: 1,
        paddingHorizontal: 7.5,
        paddingTop: 15,
    },
});
