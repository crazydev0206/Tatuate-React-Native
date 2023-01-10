import React from 'react';
import { 
    View,
    Image,
    FlatList,
    TouchableOpacity, 
    StyleSheet,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';

import NavigationService from '../../helpers/NavigationService';


import {translate} from "../../helpers/i18n";
import {getCurrencyAttrs, changeAppCurrency} from "../../helpers/store";
import {getCurrencyAsync, setCurrencyAsync} from "../../helpers/user";



import TextMedium from '../../components/ui/TextMedium';
import TextRegular from '../../components/ui/TextRegular';

import BtnFull from '../../components/ui/BtnFull';

import {CheckMarkSvg} from '../../components/icons/ButtonSvgIcons';

import Loader from '../../components/Loader';

// for redux
import { connect } from 'react-redux';

class Currency extends React.Component {
    constructor(props){
        super(props);
        this.state = { selected: 'USD' }
    }

    componentDidMount(){
        const _self = this
        getCurrencyAsync().then(curr => {
            _self.setState({ selected: curr, stored: curr })
        });
    }
    onSelect(val){
        let vS = 'USD';
        if( null != val.currency ){
            vS = val.currency;
        }

        getCurrencyAttrs(vS).then(tt => {

            setCurrencyAsync(vS).then(rt => {
                this.setState({selected: vS })
                NavigationService.setParams({ appCurrency: vS })
                changeAppCurrency(vS)
            } )

        })
            
    }
    render(){
        const _self = this;
        const {apColors} = _self.props;
        const {submitting} = _self.props.currency;
        const {selected} = _self.state;
        
        let currsArray = []
        const {base_currency, currencies} = this.props.site;
        if( base_currency instanceof Object && false == Array.isArray(base_currency) && Object.keys(base_currency).length > 0 ){
            currsArray.push( base_currency )
        }
        if( Array.isArray(currencies) && currencies.length > 0 ){
            currencies.forEach(curr=> {
                if( curr instanceof Object && null != curr.currency ){
                    currsArray.push( curr )
                }
            });
        }
        currsArray = currsArray.filter( ( ele, indx, oriArr ) => {
            if( null != ele.currency ){
                return indx === oriArr.findIndex( nel => nel.currency === ele.currency ) ? true : false;
            }
            return false;
        } );
        return (
            <SafeAreaInsetsContext.Consumer style={{flex: 1}}>
                {insets => <View style={[styles.container,{backgroundColor: apColors.appBg,paddingLeft: insets.left,paddingRight: insets.right,paddingBottom: insets.bottom}]}>
                    
                    { submitting === true && <Loader loading={true}/> }

                    <FlatList
                        data={currsArray}
                        renderItem={({ item }) => (
                            <Item
                                id={item.currency}
                                itemobj={item}
                                selected={selected}
                                onSelect={()=>this.onSelect(item)}
                                apColors={apColors}
                            />
                        )}
                        keyExtractor={item => item.currency}
                        style={styles.flatList}
                        ListEmptyComponent={()=><View style={styles.listEmpty}><TextRegular style={{color: apColors.lMoreText,fontSize:15,textAlign:'center'}}>{translate('currency','no_currency')}</TextRegular></View>}
                        

                    />


                </View>}
            </SafeAreaInsetsContext.Consumer>
        )
    }
}

//Map the redux state to your props.
const mapStateToProps = state => ({
    site: state.site,
    currency: state.currency,
})

//Map your action creators to your props.
const mapDispatchToProps = {
}

//export your list as a default export 
export default connect(mapStateToProps, mapDispatchToProps)(Currency);

function Item({ id, itemobj, selected, onSelect, apColors }) {
    return (
        <TouchableOpacity
            onPress={onSelect}
            style={[styles.itemWrap,{borderBottomColor: apColors.separator,}]}
        >
            <TextRegular style={[styles.itemTitle,{color: apColors.tText,}]}>{itemobj.currency}</TextRegular>
            { null != itemobj.currency && selected == itemobj.currency && <View style={[styles.itemSubTitle,{color: apColors.pText,}]}><CheckMarkSvg color={apColors.appColor}/></View> }
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    flatList: {
        // backgroundColor: '#FFF',
        paddingHorizontal: 15,
        flex: 1,
    },
    itemWrap: {
        // backgroundColor: '#f9c2ff',
        paddingVertical: 15,

        // paddingHorizontal: 15,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        borderBottomWidth: 1,
        
    },
    // itemSelected: {
    //     backgroundColor: apColors.appColor,
    // },
    itemTitle: {
        
        fontSize: 15,
        lineHeight: 22,
    },
    itemSubTitle: {
        
        fontSize: 15,
        lineHeight: 20,
    },
    listEmpty: {
        paddingVertical: 20,
    },
    
});
