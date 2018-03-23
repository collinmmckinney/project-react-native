import Meteor, { createContainer, Accounts } from 'react-native-meteor';
import SignUpScreen from './SignUpScreen';

export default createContainer(ownProps => ({
    onPressSignUp: (email, username, password) => {
        Accounts.createUser({ email, username, password }, error => console.log(error));
        Meteor.loginWithPassword(username, password, (message) => {
            console.log(message);
            ownProps.navigation.navigate('Cards');
        });
    }
}), SignUpScreen);
