import { createContainer } from 'react-native-meteor';
import SignInOrSignUpScreen from './SignInOrSignUpScreen';

export default createContainer(ownProps => ({
    onPressSignIn: () => {
        ownProps.navigation.navigate('SignIn');
    },
    onPressSignUp: () => {
        ownProps.navigation.navigate('SignUp');
    }
}), SignInOrSignUpScreen);
