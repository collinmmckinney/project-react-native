import Meteor, { createContainer, Accounts } from 'react-native-meteor';
import SignInOrSignUp from './SignInOrSignUp';

export default createContainer(() => ({
    user: Meteor.user(),
    createUser: () => {
        Accounts.createUser({
            username: 'test',
            email: 'test@test.com',
            password: 'test'
        }, error => console.log(error));
        Meteor.loginWithPassword('test', 'test', error => console.log(error));
    }
}), SignInOrSignUp);
