import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

import {translate} from "../../helpers/i18n";

// import { FontAwesome } from '@expo/vector-icons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


import { aweIcon } from '../../helpers/helpers';
import TextBold from '../../components/ui/TextBold';
import TextRegular from '../../components/ui/TextRegular';

export default class Facts extends React.Component{
  	constructor(props){
	    super(props)
	    
  	}
  	_onPressButton(){

  	}
  	render(){
  		const {data,apColors} = this.props
  		let jsx = []
  		if(Array.isArray(data) && data.length ){
  			data.forEach((dtbj,idx)=>{
  				jsx.push(<Fact key={idx} data={dtbj} apColors={apColors}/>)
  			});
  		}
        let showTitle = null != this.props.showTitle ? this.props.showTitle : false;
  		return(
            <View style={[styles.container,this.props.style]}>
                {showTitle && <TextBold style={{color: apColors.tText, fontSize: 15,marginTop: 10,}}>{translate('slisting','facts')}</TextBold>}
                <View style={styles.factsWrap}>{jsx}</View>
            </View>
  		)
  	}
}

function Fact(props){
    const {apColors} = props;
	return (
		<View style={styles.factWrap}>
			
            <View style={styles.factInner}>
                {null != props.data.icon && props.data.icon !== '' && <FontAwesome5 name={aweIcon(props.data.icon)} style={[styles.factIcon,{color: apColors.tText,}]}/>}
                <TextRegular style={[styles.factTitle,{color: apColors.tText,}]}>{props.data.title}</TextRegular>
                <TextBold style={[styles.factNumber,{color: apColors.appColor,}]}>{props.data.number}</TextBold>
            </View>
            
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		// flex: 1,
    },
    factsWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    factWrap: {
        width: '47%',
        marginBottom: 10,
    },
    factInner: {
        flex: 1,
    },
    factIcon: {
        fontSize: 17,
        
    },
    factTitle: {
        fontSize: 17,
        marginTop: 5,
        
    },
    factNumber: {
        
        fontSize: 22,
        marginTop: 5,
    }
});



			