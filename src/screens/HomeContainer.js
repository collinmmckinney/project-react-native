import { createContainer } from 'react-native-meteor';
import HomeScreen from './HomeScreen';

export default createContainer(ownProps => ({
    onPressSignIn: () => {
        ownProps.navigation.navigate('SignInScreen');
    },
    onPressSignUp: () => {
        ownProps.navigation.navigate('SignUpScreen');
    }
}), HomeScreen);
