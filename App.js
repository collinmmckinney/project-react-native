import Meteor from 'react-native-meteor';
import { StackNavigator, TabNavigator } from 'react-navigation';
import {
    HomeContainer,
    SignInOrSignUpContainer,
    SignInContainer,
    SignUpContainer,
    SettingsContainer
} from './src/screens';

const SERVER_URL = 'ws://localhost:3000/websocket';
Meteor.connect(SERVER_URL);

const SignInOrSignUpStack = StackNavigator({
    SignInOrSignUp: {
        screen: SignInOrSignUpContainer
    },
    SignIn: {
        screen: SignInContainer
    },
    SignUp: {
        screen: SignUpContainer
    }
}, { initialRouteName: 'SignInOrSignUp' });

const HomeStack = StackNavigator({
    Home: {
        screen: HomeContainer
    },
    SignInOrSignUp: {
        screen: SignInOrSignUpStack,
        navigationOptions: { tabBarVisible: false }
    }
}, { initialRouteName: 'Home', mode: 'modal', headerMode: 'none' });

const SettingsStack = StackNavigator({
    Settings: { screen: SettingsContainer }
});

export default TabNavigator({
    HomeTab: { screen: HomeStack },
    SettingsTab: { screen: SettingsStack },
}, { initialRouteName: 'HomeTab' });
