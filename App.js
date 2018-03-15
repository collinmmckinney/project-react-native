import Meteor from 'react-native-meteor';
import { StackNavigator, TabNavigator, SwitchNavigator } from 'react-navigation';
import {
    HomeContainer,
    SignInOrSignUpContainer,
    SignInContainer,
    SignUpContainer,
    AddContainer,
    SettingsContainer
} from './src/screens';

const SERVER_URL = 'ws://localhost:3000/websocket';
Meteor.connect(SERVER_URL);

// Home Tab

const HomeStack = StackNavigator({
    Home: {
        screen: HomeContainer
    }
}, { initialRouteName: 'Home' });

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

const AuthStack = SwitchNavigator({
    Home: {
        screen: HomeStack
    },
    SignInOrSignUp: {
        screen: SignInOrSignUpStack,
        navigationOptions: { tabBarVisible: false }
    }
}, { initialRouteName: 'Home', mode: 'modal', headerMode: 'none' });


// Add Tab

const AddStack = StackNavigator({
    Add: {
        screen: AddContainer
    }
}, { initialRouteName: 'Add' });

// Settings Tab

const SettingsStack = StackNavigator({
    Settings: { screen: SettingsContainer }
});

export default TabNavigator({
    HomeTab: { screen: AuthStack },
    AddTab: { screen: AddStack },
    SettingsTab: { screen: SettingsStack },
}, { initialRouteName: 'HomeTab' });
