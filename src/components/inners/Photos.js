import React from 'react';
import {
	StyleSheet,
	View,
	Image,
	TouchableOpacity
} from 'react-native';


export default class Photos extends React.Component{
  	constructor(props){
	    super(props)
	    this._onPressButton = this._onPressButton.bind(this)
  	}
  	_onPressButton(){

  	}
  	render(){
  		const {photos} = this.props
  		let photoJsx = []
  		if(Array.isArray(photos) && photos.length ){
  			photos.forEach((pobj,idx)=>{
  				photoJsx.push(<PhotoChild key={idx} photo={pobj} />)
  			});
  		}
      let showTitle = null != this.props.showTitle ? this.props.showTitle : false;
  		return(
  			<View style={[styles.container, this.props.style]}>{photoJsx}</View>
  		)
  	}
}

function PhotoChild(props){
	const _onPressButton = () => {

	}
	return (
		<View style={styles.photo}>
			<TouchableOpacity onPress={_onPressButton}>
                <View style={styles.photoInner}>
                    <Image
                        style={styles.photoImage}
                        
                        source={{uri: props.photo.src}}
                        resizeMode="cover" // 'cover', 'contain', 'stretch', 'repeat', 'center'
                    />
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
		marginLeft: -10,
		marginRight: -10,
    },
    photo: {
		padding: 10,
    },
    photoInner: {
		borderRadius: 4,
		overflow: 'hidden',
    },
    // navButton: {
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     // backgroundColor: '#DDDDDD',
    //     // padding: 10,
    //     width: 28,
    //     height: 28,
    //     // color: '#fff',
    // },
    photoImage: {
		minWidth: 96,
		minHeight: 96,
		flex: 1,
    },
});



			