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
import {getCurrencyAttrs, changeAppLanguage, getStrings} from "../../helpers/store";
import {getLanguageAsync, setLanguageAsync} from "../../helpers/user";
import {setI18nConfig} from '../../helpers/i18n';


import TextMedium from '../../components/ui/TextMedium';
import TextRegular from '../../components/ui/TextRegular';

import {CheckMarkSvg} from '../../components/icons/ButtonSvgIcons';

import Loader from '../../components/Loader';

// for redux
import { connect } from 'react-redux';

class Language extends React.Component {
    constructor(props){
        super(props);
        this.state = { selected: 'en' }
    }
    componentDidMount(){
        const _self = this
        getLanguageAsync().then(lang => {
            if( null != lang.code ) _self.setState({ selected: lang.code })
        });
    }
    onSelect(val){
        let vS = {
            code: 'en',
            rtl: false
        };
        if( null != val.code ){
            vS.code = val.code;
        }
        if( null != val.rtl ){
            vS.rtl = val.rtl;
        }
        setLanguageAsync(vS).then(rt => {
            this.setState({selected: vS.code});
            setI18nConfig(vS.code, vS.rtl)
            NavigationService.setParams({ appLanguage: vS.code })
        })
    }
    render(){
        const _self = this;
        const {apColors} = _self.props;
        const {submitting} = _self.props.currency;
        const {selected} = this.state;
        const {languages} = this.props.site;
        return (
            <SafeAreaInsetsContext.Consumer style={{flex: 1}}>
                {insets => <View style={[styles.container,{backgroundColor: apColors.appBg,paddingLeft: insets.left,paddingRight: insets.right,paddingBottom: insets.bottom}]}>
                    
                    { submitting === true && <Loader loading={true}/> }

                    <FlatList
                        data={languages}
                        renderItem={({ item }) => (
                            <Item
                                id={item.code}
                                itemobj={item}
                                selected={selected}
                                onSelect={()=>this.onSelect(item)}
                                apColors={apColors}
                            />
                        )}
                        keyExtractor={item => item.code}
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
export default connect(mapStateToProps, mapDispatchToProps)(Language);

function Item({ id, itemobj, selected, onSelect, apColors }) {
    return (
        <TouchableOpacity
            onPress={onSelect}
            style={[styles.itemWrap,{borderBottomColor: apColors.separator,}]}
        >
            <TextRegular style={[styles.itemTitle,{color: apColors.tText,}]}>{itemobj.name}</TextRegular>
            { null != itemobj.code && selected == itemobj.code && <View style={[styles.itemSubTitle,{color: apColors.pText,}]}><CheckMarkSvg color={apColors.appColor}/></View> }
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
