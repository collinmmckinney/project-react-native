import Meteor, { createContainer, Accounts } from 'react-native-meteor';
import SignUpScreen from './SignUpScreen';

export default createContainer(ownProps => ({
    user: Meteor.user(),
    onPressSignUp: (email, username, password) => {
        Accounts.createUser({ email, username, password }, error => console.log(error));
        Meteor.loginWithPassword(username, password, error => console.log(error));
        ownProps.navigation.goBack();
    }
}), SignUpScreen);
