import React from 'react';
import {
	StyleSheet,
	View,
    Text,
	Image,
    FlatList,
	TouchableOpacity,
    Dimensions,
    Modal,
} from 'react-native';

import Gallery from '../../react-native-image-gallery-master';


import {translate} from "../../helpers/i18n";
import TextBold from '../../components/ui/TextBold';

import {CloseSvg} from '../icons/ButtonSvgIcons';

export default class PhotosGrid extends React.Component{
  	constructor(props){
	    super(props)
        this.state = {
            showGal: false,
            galIndex: 0
        }
	    this._onPressPhoto = this._onPressPhoto.bind(this)
  	}
    calculatedSize(){
        const windowWidth = Dimensions.get('window').width;
        let IMAGES_PER_ROW = 3;
        let size = (windowWidth - 30) / IMAGES_PER_ROW
        return {width: size, height: size}
    }
  	_onPressPhoto(index){
        

        this.setState({ showGal: true, galIndex: index })
  	}
    _hideGalModal(){
        this.setState({ showGal: false })
    }
  	render(){
  		const {photos,apColors} = this.props
        // const calSize = this.calculatedSize()
        // style={calSize}
        let photoJsx = []
        let gallerySource = []
        if(Array.isArray(photos) && photos.length ){
            photos.forEach((pobj,idx)=>{
                photoJsx.push(<PhotoChild key={idx} index={idx}  photo={pobj} onPress={this._onPressPhoto}/>)
                gallerySource.push( { source: { uri: pobj.src } } )
            });
        }
        let showTitle = null != this.props.showTitle ? this.props.showTitle : true;
  		return(
            <View style={[styles.container, this.props.style]}>
                {showTitle && <TextBold style={{color: apColors.tText, fontSize: 15,marginTop: 10,}}>{translate('slisting','photos')}</TextBold>}

                <View style={styles.inner}>{photoJsx}</View>
                
                <Modal
                  transparent={false}
                  animationType={'fade'}
                  visible={this.state.showGal}
                  onRequestClose={() => {
                    // this.ShowModalFunction(!this.state.ModalVisibleStatus, '');
                  }}>
                  <View style={styles.modelStyle}>
                        <Gallery
                            style={{ flex: 1, backgroundColor: '#000' }}
                            images={gallerySource}
                            initialPage={this.state.galIndex}
                        />
                        
                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.closeButtonStyle}
                            onPress={() => {
                                this._hideGalModal();
                            }}>
                            <CloseSvg fill="#FFF" style={{ width: 16, height: 16 }}/>
                            
                        </TouchableOpacity>

                  </View>
                </Modal>

                       

            </View>
  		)
  	}
}

function PhotoChild(props){
	return (
		<View style={[styles.photo, props.style]}>
			<TouchableOpacity onPress={()=>props.onPress(props.index)} style={{flex:1}}>
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

// https://stackoverflow.com/questions/41540279/react-native-how-to-build-an-image-grid-like-facebook

const styles = StyleSheet.create({
    container: {

    },
	inner: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',

		marginLeft: -10,
		marginRight: -10,
        // marginTop: 30,
        // backgroundColor: 'red',
        // justifyContent: 'space-between',
    },
    photo: {
		padding: 10,
        width: '33.33%',
        // backgroundColor: 'yellow',
    },
    photoInner: {
        flex: 1,
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

    // for Gallery
    image: {
        height: 120,
        width: '100%',
    },
    fullImageStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '98%',
        resizeMode: 'contain',
    },
    modelStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    closeButtonStyle: {
        width: 16,
        height: 16,
        top: 52,
        left: 15,
        position: 'absolute',
        // backgroundColor: '#fff'
    },
});



			