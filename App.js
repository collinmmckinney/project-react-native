import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Meteor from 'react-native-meteor';
import SignInOrSignUpContainer from './src/SignInOrSignUpContainer';

const SERVER_URL = 'ws://localhost:3000/websocket';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    }
});

export default class App extends Component {
    componentWillMount() {
        Meteor.connect(SERVER_URL);
    }

    render() {
        return <View style={styles.container}><SignInOrSignUpContainer /></View>;
    }
}
