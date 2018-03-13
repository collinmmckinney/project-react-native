import Meteor, { createContainer, Accounts } from 'react-native-meteor';
import SignInOrSignUp from './SignInOrSignUp';

export default createContainer(() => ({
    user: Meteor.user(),
    signIn: (email, username, password) => {
        Meteor.loginWithPassword(username, password, error => console.log(error));
    },
    signUp: (email, username, password) => {
        Accounts.createUser({ email, username, password }, error => console.log(error));
        Meteor.loginWithPassword(username, password, error => console.log(error));
    }
}), SignInOrSignUp);
