import Meteor, { createContainer } from 'react-native-meteor';
import SignInScreen from './SignInScreen';

export default createContainer(ownProps => ({
    user: Meteor.user(),
    onPressSignIn: (email, username, password) => {
        Meteor.loginWithPassword(username, password, error => console.log(error));
        ownProps.navigation.goBack();
    }
}), SignInScreen);
