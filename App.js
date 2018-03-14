import Meteor from 'react-native-meteor';
import { StackNavigator } from 'react-navigation';
import { HomeContainer, SignInContainer, SignUpContainer } from './src/screens';

const SERVER_URL = 'ws://localhost:3000/websocket';
Meteor.connect(SERVER_URL);

export default StackNavigator({
    HomeScreen: {
        screen: HomeContainer
    },
    SignInScreen: {
        screen: SignInContainer
    },
    SignUpScreen: {
        screen: SignUpContainer
    }
}, { initialRouteName: 'HomeScreen' });
