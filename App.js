import Meteor from 'react-native-meteor';
import { StackNavigator, TabNavigator, SwitchNavigator } from 'react-navigation';
import {
    LearnContainer,
    ReviewContainer,
    SignInOrSignUpContainer,
    SignInContainer,
    SignUpContainer,
    CardsContainer,
    TakeOrSelectPhotoContainer,
    AddCardsFromImageContainer,
    SettingsContainer
} from './src/screens';

// This is my Mac's local IP, needs to change:
const SERVER_URL = 'ws://10.0.0.174:3000/websocket';
Meteor.connect(SERVER_URL);

// Learn Tab

const LearnStack = StackNavigator({
    Learn: {
        screen: LearnContainer
    },
    Review: {
        screen: ReviewContainer,
        gesturesEnabled: false
    }
}, { initialRouteName: 'Learn' });

// Cards Tab

const CardsStack = StackNavigator({
    Cards: {
        screen: CardsContainer
    },
    TakeOrSelectPhoto: {
        screen: TakeOrSelectPhotoContainer
    },
    AddCardsFromImage: {
        screen: AddCardsFromImageContainer,
        gesturesEnabled: false
    }
}, { initialRouteName: 'Cards' });

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
    Cards: {
        screen: CardsStack
    },
    SignInOrSignUp: {
        screen: SignInOrSignUpStack,
        navigationOptions: { tabBarVisible: false }
    }
}, {
    initialRouteName: 'Cards',
    mode: 'modal',
    headerMode: 'none'
});

// Settings Tab

const SettingsStack = StackNavigator({
    Settings: { screen: SettingsContainer }
});

export default TabNavigator({
    LearnTab: { screen: LearnStack, title: 'Learn' },
    CardsTab: { screen: AuthStack, title: 'My Cards' },
    SettingsTab: { screen: SettingsStack, title: 'Profile' },
}, { initialRouteName: 'CardsTab' });
