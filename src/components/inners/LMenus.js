import React from 'react';
import {
	StyleSheet,
	View,
	Image,
	TouchableOpacity
} from 'react-native';



import {regularFontFamily} from '../../constants/Colors';
import {translate} from "../../helpers/i18n";
import {fomartCurrOut,formatNumber} from '../../helpers/currency';

import TextBold from '../../components/ui/TextBold';
import TextMedium from '../../components/ui/TextMedium';
import TextRegular from '../../components/ui/TextRegular';
import ForHTML from '../ui/ForHTML';

export default class LMenus extends React.Component{
    constructor(props){
        super(props)
        this.state = { mtype: '' }
    }
  	render(){
        const {mtype} = this.state
  		const {data,apColors} = this.props
  		let jsx = [],
            cats = [],
            catJsx = [];
		data.forEach((dtbj,idx)=>{
            if( null != dtbj.cats && Array.isArray(dtbj.cats) && dtbj.cats.length > 0 ) cats = [...cats,...dtbj.cats]
			// jsx.push(<LMenu key={idx} data={dtbj} />)
            if( mtype != '' ){
                if( null != dtbj.cats && Array.isArray(dtbj.cats) && -1 !== dtbj.cats.findIndex( cat => cat == mtype ) ){
                    jsx.push(<LMenu key={idx} data={dtbj} apColors={apColors}/>)
                }
            }else{
                jsx.push(<LMenu key={idx} data={dtbj} apColors={apColors}/>)
            }
		});
        cats = cats.filter((ct, idx, oriArr)=>{
            return idx === oriArr.findIndex(ori => ori === ct)
        })
        if( cats.length > 0 ){
            let allAdStyle = {},
                allTStyle = {};
            if( mtype == '' ) {
                allAdStyle = {backgroundColor: apColors.appColor,}
                allTStyle = styles.filterTextActive
            }
            catJsx.push(
                <TouchableOpacity key="filter_all" onPress={()=>this.setState({mtype: ''})} style={[styles.filterItem,allAdStyle]}>
                    <TextMedium style={[styles.filterText,{color: apColors.tText,},allTStyle]}>{translate('slisting','filter_all')}</TextMedium>
                </TouchableOpacity>
            )
            cats.forEach((catn,cix)=>{
                let itAdStyle = {},
                    itTStyle = {};
                if( mtype == catn ){
                    itAdStyle = {backgroundColor: apColors.appColor,}
                    itTStyle = styles.filterTextActive
                }
                catJsx.push(
                    <TouchableOpacity key={cix} onPress={()=>this.setState({mtype: catn})} style={[styles.filterItem,itAdStyle]}>
                        <TextMedium style={[styles.filterText,{color: apColors.tText,},itTStyle]}>{catn}</TextMedium>
                    </TouchableOpacity>
                )
            });
        }
  		return(
            <View style={[styles.container,this.props.style]}>
                <View style={styles.filterWrap}>{catJsx}</View>
                <View style={styles.childsWrap}>{jsx}</View>
            </View>
  		)
  	}
}

function LMenu(props){
    const {apColors} = props;
    const {name,price,thumbnail,desc} = props.data
	return (
		<View style={styles.itemWrap}>
			
            <View style={styles.itemInner}>
                <View style={styles.itemLeft}>
                    {thumbnail != '' && <Image source={{uri: thumbnail}} style={styles.thumbnail}/> }
                </View>
                <View style={styles.itemRight}>
                    <View style={styles.titleWrap}>
                        <TextMedium style={[styles.itemTitle,{color: apColors.tText,}]}>{name}</TextMedium>
                        <TextMedium style={[styles.priceText,{color: apColors.appColor,}]}>{fomartCurrOut(price)}</TextMedium>
                    </View>
                    { desc !== '' && <ForHTML source={{ html: desc }}
                        // html={desc} 
                        baseFontStyle={{fontFamily: regularFontFamily,fontSize: 13,color: apColors.pText}}
                    /> }
                    
                    
                </View>
            </View>
            
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
    },
    filterWrap: {
        flexDirection: 'row',
        marginBottom: 15,
        flexWrap: 'wrap',
    },
    filterItem: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 4,
    },
    filterText: {
        fontSize: 15,
        
    },
    filterTextActive: {
        color: '#FFF',
    },
    childsWrap: {
        marginBottom: -15,
    },
    itemWrap: {
        marginBottom: 15,
    },
    itemInner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemLeft: {
        // padding: 15,
        width: 70,
    },
    thumbnail: {
        width: 70,
        height: 70,
        borderRadius: 35,
        overflow: 'hidden',
    },
    itemTitle: {
        fontSize: 15,
        
        // marginBottom: 10,
    },
    itemRight: {
        flex: 1,
        paddingLeft: 15,
        // padding: 15,
        // borderLeftWidth: 1,
        // borderLeftColor: '#FFF',
        // flexDirection: 'row',
        // alignItems: 'center',
    },
    titleWrap: {

        paddingRight: 100,
    },
    
    priceText: {
        position: 'absolute',
        right: 0,
        top: 0,
        fontSize: 15,
        
    },
    
});



			