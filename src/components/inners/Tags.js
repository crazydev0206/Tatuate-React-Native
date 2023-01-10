import React from 'react';
import {
	StyleSheet,
	View,
	Image,
	TouchableOpacity
} from 'react-native';
import NavigationService from '../../helpers/NavigationService';


import {filterByTag} from '../../helpers/store';
import {translate} from "../../helpers/i18n";

import TextBold from '../../components/ui/TextBold';
import TextRegular from '../../components/ui/TextRegular';

export default class Tags extends React.Component{
  	// constructor(props){
	  //   super(props)
	    
  	// }
  	goToArchive(id){
        filterByTag( id )
        NavigationService.navigate('Archive')
    }
  	render(){
  		const {data,apColors} = this.props
  		let jsx = []
  		if(Array.isArray(data) && data.length ){
  			data.forEach((dtbj,idx)=>{
  				jsx.push(<Tag key={idx} data={dtbj} onPress={()=>this.goToArchive(dtbj.id)} apColors={apColors}/>)
  			});
  		}
        let showTitle = null != this.props.showTitle ? this.props.showTitle : false;
  		return(
        <View style={[styles.container, this.props.style]}>
            {showTitle && <TextBold style={{color: this.props.apColors.tText, fontSize: 15,marginBottom: 10,}}>{translate('slisting','tags')}</TextBold>}
            <View style={styles.inner}>{jsx}</View>
        </View>
  		)
  	}
}

function Tag(props){
	return (
		<View style={styles.childWrap}>
			<TouchableOpacity onPress={props.onPress}>
                <View style={styles.childInner}>
                    <TextRegular style={{color: props.apColors.appColor,fontSize: 15}}>{props.data.name}</TextRegular>
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
        marginRight: 10,
        marginBottom: 5,
    },
    childInner: {
		// borderRadius: 4,
		// overflow: 'hidden',
        // flexDirection: 'row',
        // alignItems: 'center',
    },
});



			