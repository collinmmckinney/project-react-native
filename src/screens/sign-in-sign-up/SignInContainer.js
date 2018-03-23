import Meteor, { createContainer } from 'react-native-meteor';
import SignInScreen from './SignInScreen';

export default createContainer(ownProps => ({
    onPressSignIn: (email, username, password) => {
        Meteor.loginWithPassword(username, password, (message) => {
            console.log(message);
            ownProps.navigation.navigate('Cards');
        });
    }
}), SignInScreen);
