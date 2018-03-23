import React from 'react';
import Meteor from 'react-native-meteor';
import { StackNavigator, TabNavigator, SwitchNavigator } from 'react-navigation';
import {
    CardsContainer,
    LearnContainer,
    SignInOrSignUpContainer,
    SignInContainer,
    SignUpContainer,
    TakeOrSelectPhotoContainer,
    AddCardsFromImageContainer,
    SettingsContainer
} from './src/screens';
import { HeaderButton } from './src/components';

// This is my Mac's local IP, needs to change:
const SERVER_URL = 'ws://192.168.0.179:3000/websocket';
Meteor.connect(SERVER_URL);

const stackNavigationOptions = {
    gestureResponseDistance: 10
};

// Learn Tab

const LearnStack = StackNavigator({
    Learn: {
        screen: LearnContainer
    },
}, { initialRouteName: 'Learn', ...stackNavigationOptions });

// Cards Tab

const CardsStack = StackNavigator({
    Cards: {
        screen: CardsContainer,
        navigationOptions: ({ navigation }) => ({
            headerRight: <HeaderButton onPress={() => { navigation.navigate('TakeOrSelectPhoto'); }} />
        })
    },
    TakeOrSelectPhoto: {
        screen: TakeOrSelectPhotoContainer
    },
    AddCardsFromImage: {
        screen: AddCardsFromImageContainer
    }
}, { initialRouteName: 'Cards', ...stackNavigationOptions });

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
}, { initialRouteName: 'SignInOrSignUp', ...stackNavigationOptions });

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
    headerMode: 'none',
    ...stackNavigationOptions
});

// Settings Tab

const SettingsStack = StackNavigator({
    Settings: { screen: SettingsContainer }
}, stackNavigationOptions);

export default TabNavigator({
    LearnTab: { screen: LearnStack, title: 'Learn' },
    CardsTab: { screen: AuthStack, title: 'My Cards' },
    SettingsTab: { screen: SettingsStack, title: 'Profile' },
}, { initialRouteName: 'CardsTab' });
