import RegisterScreen from '../RegisterScreen';
export default class Register extends RegisterScreen {

	static navigationOptions = ({ navigation }) => {
        return {
            headerShown: false
        };
    }
}