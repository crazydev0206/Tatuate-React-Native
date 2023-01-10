import React from 'react';
import { 
	View,
	StyleSheet 
} from 'react-native';

import SignInScreen from '../SignInScreen';
// import BackButton from '../../components/inners/BackButton';


export default class SignIn extends SignInScreen {
	// constructor(props){
 //        super(props);
 //    }
    toForgetPwd = ()=>{
        this.props.navigation.navigate('BookingsForgetPwd');
    }
    toRegister = () => {
       this.props.navigation.navigate('BookingsRegister');
    }
    // _renderHeader(){
    //     return (
    //         <View style={styles.navBar}>
    //             <BackButton isBlack={true} onPress={()=>{this.props.navigation.goBack()}}/>
    //         </View>
    //     )
    // }
    _onPressDone(){
        this.setState({isSuccess:false,isError:false})
        // this.props.navigation.goBack();
        this.props.navigation.navigate('Home');
    }
}

const styles = StyleSheet.create({
    navBar: {
        position: 'absolute',
        top: 52,
        // marginTop: 52,
        left: 0,
        right: 0,
        zIndex: 200,
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
});