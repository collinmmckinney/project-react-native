import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Platform,
    TouchableHighlight
} from 'react-native';
import PropTypes from 'prop-types';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    },
});

export default class SignInOrSignUp extends Component {
    static propTypes = {
        user: PropTypes.shape({
            username: PropTypes.string,
            email: PropTypes.string,
            password: PropTypes.string
        }),
        createUser: PropTypes.func.isRequired
    }

    static defaultProps = {
        user: {}
    }

    constructor(props) {
        super(props);

        this.handleSignUp = this.handleSignUp.bind(this);
    }

    handleSignUp() {
        const { createUser } = this.props;
        createUser();
    }

    render() {
        const { user } = this.props;

        return (
            <TouchableHighlight onPress={this.handleSignUp}>
                <View style={styles.container}>
                    <Text style={styles.welcome}>
                        {user && user.username}
                    </Text>
                    <Text style={styles.instructions}>
                        To get started, edit App.js
                    </Text>
                    <Text style={styles.instructions}>
                        {instructions}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }
}
