import React from 'react';
import {
	StyleSheet,
	View,
	Image,
	TouchableOpacity
} from 'react-native';
import NavigationService from '../../helpers/NavigationService';



import {filterByFea} from '../../helpers/store';
import {translate} from "../../helpers/i18n";
// import { FontAwesome } from '@expo/vector-icons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { aweIcon } from '../../helpers/helpers';
import TextBold from '../../components/ui/TextBold';
import TextRegular from '../../components/ui/TextRegular';

export default class Features extends React.Component{
  	// constructor(props){
	  //   super(props)
	    
  	// }
  	goToArchive(id){
        filterByFea( id )
        NavigationService.navigate('Archive')
    }
  	render(){
  		const {data,apColors} = this.props
  		let jsx = []
  		if(Array.isArray(data) && data.length ){
  			data.forEach((dtbj,idx)=>{
  				jsx.push(<Feature key={idx} data={dtbj} onPress={()=>this.goToArchive(dtbj.id)} apColors={apColors}/>)
  			});
  		}
      let showTitle = null != this.props.showTitle ? this.props.showTitle : true;
  		return(
        <>
          {showTitle && <TextBold style={{color: apColors.tText, fontSize: 15,marginTop: 10,}}>{translate('slisting','feas')}</TextBold>}
          <View style={[styles.container, this.props.style]}>{jsx}</View>
        </>
  		)
  	}
}

function Feature(props){
	return (
		<View style={styles.feature}>
			<TouchableOpacity onPress={props.onPress}>
                <View style={styles.feaInner}>
                    {null != props.data.icon && props.data.icon !== '' && <FontAwesome5 name={aweIcon(props.data.icon)} style={[styles.icon,{color: props.apColors.appColor,}]}/>}
                    <TextRegular style={{fontSize: 15}}>{props.data.name}</TextRegular>
                </View>
            </TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		// marginLeft: -10,
		// marginRight: -10,
        marginTop: 10,
    },
    feature: {
        paddingVertical: 5,
		paddingRight: 10,
    },
    feaInner: {
		// borderRadius: 4,
		// overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        fontSize: 15,
        
        backgroundColor: '#F5F6FA',
        width: 30,
        height: 30,
        borderRadius: 15,
        overflow: 'hidden',
        // justifyContent: 'center',
        // alignItems: 'center',
        textAlign: 'center',
        lineHeight: 30,
        marginRight: 5,
    }
});



			