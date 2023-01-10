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


import {filterByCat} from '../helpers/store';
import {translate} from "../helpers/i18n";

import TaxCard from '../components/inners/TaxCard';


import { connect } from 'react-redux';

class CatsScreen extends React.Component{
    constructor(props){
        super(props)
        // this.state = {data: []}
    }
    goToArchive(term){
        const {id} = term;
        if( null != id ){
            filterByCat( id )
            this.props.navigation.navigate('Archive')
        }
    }
    render(){
        const _self = this
        const {apColors} = _self.props;
        const {cats} = _self.props.site
        const filteredItems = cats.filter(itm => itm.count > 0 );
        return(
            <SafeAreaInsetsContext.Consumer style={{flex: 1}}>
                {insets => <View style={[styles.container,{backgroundColor: apColors.appBg,paddingBottom: insets.bottom,paddingLeft: insets.left,paddingRight: insets.right}]}>
                
                    <FlatList

                        data={filteredItems}
                        renderItem={({ item, index }) => (
                            <TaxCard id={item.id} post={item} onPress={()=>_self.goToArchive(item)}/>
                        )}
                        keyExtractor={item => String(item.id)}
                        numColumns="2"
                        // extraData={selected}
                        style={styles.flatList}
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
export default connect(mapStateToProps, mapDispatchToProps)(CatsScreen);

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
