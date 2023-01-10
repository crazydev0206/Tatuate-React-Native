// import React from 'react';
import ForgetPwdScreen from '../ForgetPwdScreen';
export default class ForgetPwd extends ForgetPwdScreen {
	static navigationOptions = ({ navigation }) => {
        return {
            headerShown: false
        };
    }
}