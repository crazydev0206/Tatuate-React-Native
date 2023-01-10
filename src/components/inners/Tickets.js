import React from 'react';
import {
	StyleSheet,
	View,
	Image,
	TouchableOpacity,
    useColorScheme,
} from 'react-native';

import getThemedColors from '../../helpers/Theme';

import {translate} from "../../helpers/i18n";
import {fomartCurrOut,formatNumber} from '../../helpers/currency';

import TextBold from '../../components/ui/TextBold';
import TextRegular from '../../components/ui/TextRegular';

export default class Tickets extends React.Component{
  	render(){
  		const {data} = this.props
  		let jsx = []
		data.forEach((dtbj,idx)=>{
			jsx.push(<Ticket key={idx} data={dtbj} />)
		});
  		return(
            <View style={[styles.container,this.props.style]}>
                <View style={styles.childsWrap}>{jsx}</View>
            </View>
  		)
  	}
}

function Ticket(props){
    const colors = getThemedColors(useColorScheme())
    const {name,price,available} = props.data
	return (
		<View style={[styles.itemWrap,{backgroundColor: colors.appColor,}]}>
			
            <View style={styles.itemInner}>
                <View style={styles.itemLeft}>
                    <TextBold style={styles.itemTitle}>{name}</TextBold>
                    <TextRegular style={styles.itemAvai}>{ translate('slisting','ticket_available',{count: available}) }</TextRegular>
                </View>
                <View style={[styles.itemRight,{borderLeftColor: colors.appBg,}]}>
                    <View style={[styles.itemDecorTop,{backgroundColor: colors.appBg,}]}></View>
                    <View style={[styles.itemDecorBot,{backgroundColor: colors.appBg,}]}></View>

                    <TextBold style={styles.priceText}>{fomartCurrOut(price)}</TextBold>
                    
                </View>
            </View>
            
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
    },
    childsWrap: {
        marginBottom: -15,
    },
    itemWrap: {
        
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 15,
    },
    itemInner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemLeft: {
        padding: 15,
    },
    itemRight: {
        padding: 15,
        borderLeftWidth: 1,
        
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemDecorTop: {
        width: 8,
        height: 8,
        borderRadius: 4,
        

        position: 'absolute',
        top: -4,
        left: -4,
    },
    itemDecorBot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        

        position: 'absolute',
        bottom: -4,
        left: -4,
    },
    itemTitle: {
        fontSize: 15,
        color: '#FFF', 
        marginBottom: 10,
    },
    priceText: {
        fontSize: 20,
        color: '#FFF',
    },
    itemAvai: {
        fontSize: 13,
        color: '#EAECEF',
    },
    
});



			