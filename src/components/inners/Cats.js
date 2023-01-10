import React from 'react';
import {
	StyleSheet,
	View,
	Image,
	TouchableOpacity
} from 'react-native';
import NavigationService from '../../helpers/NavigationService';

import {filterByCat} from '../../helpers/store';
import {translate} from "../../helpers/i18n";

import TextBold from '../../components/ui/TextBold';
import TextHeavy from '../../components/ui/TextHeavy';
import TextMedium from '../../components/ui/TextMedium';
import TextRegular from '../../components/ui/TextRegular';

export default class Cats extends React.Component{
  	// constructor(props){
	  //   super(props)
	    
  	// }
  	goToArchive(id){
        filterByCat( id )
        NavigationService.navigate('Archive')
  	}
  	render(){
  		const {data,apColors} = this.props
        let showTitle = null != this.props.showTitle ? this.props.showTitle : false;
  		let jsx = []
  		if(Array.isArray(data) && data.length ){
  			data.forEach((dtbj,idx)=>{
  				jsx.push(<Cat key={idx} data={dtbj} onPress={()=>this.goToArchive(dtbj.id)} apColors={apColors}/>)
  			});
  		}
  		return(
        <View style={[styles.container, this.props.style]}>
            { showTitle && <TextBold style={{color: apColors.tText, fontSize: 15,marginBottom: 10}}>{translate('slisting','cats')}</TextBold> }
            <View style={styles.inner}>{jsx}</View>
        </View>
  		)
  	}
}

function Cat(props){
	return (
		<View style={styles.childWrap}>
			<TouchableOpacity onPress={props.onPress}>
                <View style={[styles.childInner,{backgroundColor: props.apColors.appColor,}]}>
                    <TextMedium style={{color: '#FFF',fontSize: 15}}>{props.data.name}</TextMedium>
                </View>
            </TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
    container: {

    },
	inner: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		// marginLeft: -10,
		// marginRight: -10,
        // marginTop: 10,
    },
    childWrap: {
		// padding: 10,
        marginRight: 10
    },
    childInner: {
		// borderRadius: 4,
		// overflow: 'hidden',
        // flexDirection: 'row',
        // alignItems: 'center',
        paddingHorizontal: 7,
        paddingVertical: 3,
        borderRadius: 15,
        
        // marginRight: 10,
    },
});



			