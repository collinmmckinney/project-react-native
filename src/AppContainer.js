import { createContainer, Accounts } from 'react-native-meteor';
import App from './App';

export default createContainer(() => ({
    createUser: () => {
        Accounts.createUser({
            username: 'test',
            email: 'test@test.com',
            password: 'test'
        });
    },
    user: Accounts.findUserByUsername('test')
}), App);
