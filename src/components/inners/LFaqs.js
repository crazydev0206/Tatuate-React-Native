import React, { useState } from 'react';
import {
	StyleSheet,
	View,
	Image,
	TouchableOpacity,
    useColorScheme,
} from 'react-native';


import getThemedColors from '../../helpers/Theme';

import {regularFontFamily} from '../../constants/Colors';
// import {translate} from "../../helpers/i18n";
// import {fomartCurrOut,formatNumber} from '../../helpers/currency';

// import TextBold from '../../components/ui/TextBold';
import TextMedium from '../../components/ui/TextMedium';
import ForHTML from '../ui/ForHTML';
// import TextRegular from '../../components/ui/TextRegular';

export default class LFaqs extends React.Component{
  	render(){
  		const {data} = this.props
  		let jsx = []
		data.forEach((dtbj,idx)=>{
			jsx.push(<LFaq key={idx} data={dtbj} index={idx}/>)
		});
  		return(
            <View style={[styles.container,this.props.style]}>
                <View style={styles.childsWrap}>{jsx}</View>
            </View>
  		)
  	}
}

function LFaq(props){
    const colors = getThemedColors(useColorScheme())
    const propShow = props.index === 0 ? true : false;
    const {title,content} = props.data
    const [show, toggleShow] = useState(propShow);
	return (
		<View style={styles.itemWrap}>
			
            <View style={styles.itemInner}>
                <TouchableOpacity onPress={ ()=>toggleShow(!show) } style={[styles.itemLeft,{borderBottomColor: colors.separator,}]}>
                    <TextMedium style={[styles.itemTitle,{color: colors.tText, }]}>{title}</TextMedium>
                    { show && <TextMedium style={[styles.itemTitle,{color: colors.tText, }]}>-</TextMedium> }
                    { !show && <TextMedium style={[styles.itemTitle,{color: colors.tText, }]}>+</TextMedium> }
                </TouchableOpacity>
                { show && <View style={styles.itemRight}>
                    { content !== '' && <ForHTML source={{ html: content }} 
                        // html={content}
                        // containerStyle={{marginTop:20}} 
                        baseFontStyle={{fontFamily: regularFontFamily,fontSize: 15,color:colors.pText}}
                    />}
                </View> }
            </View>
            
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
        flex: 1,
    },
    childsWrap: {
        marginBottom: 15,
    },
    itemWrap: {
        // marginBottom: 15,
    },
    itemInner: {
    },
    itemLeft: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // borderRadius: 4,
        borderBottomWidth: 1,
        
        paddingVertical: 10,
    },
    itemTitle: {
        fontSize: 15,
        
    },
    itemRight: {
        // paddingHorizontal: 15,
    },
    
    
    
    
});



			