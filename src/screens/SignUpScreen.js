import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF'
    },
    input: {
        height: 48,
        fontSize: 24,
        borderWidth: 1
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 48,
        backgroundColor: 'black'
    },
    buttonText: {
        color: 'white',
        fontSize: 24
    }
});

export default class SignUpScreen extends Component {
    static propTypes = {
        user: PropTypes.shape({
            email: PropTypes.string,
            username: PropTypes.string,
            password: PropTypes.string
        }),
        onPressSignUp: PropTypes.func.isRequired
    }

    static defaultProps = {
        user: {}
    }

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            username: '',
            password: ''
        };

        this.handlePressSignUp = this.handlePressSignUp.bind(this);
    }

    handlePressSignUp() {
        const { onPressSignUp } = this.props;
        const { email, username, password } = this.state;
        onPressSignUp(email, username, password);
    }

    render() {
        const { user } = this.props;
        const { email, username, password } = this.state;

        return (
            <View style={styles.container}>
                <Text>{user && user.username}</Text>
                <TextInput
                    value={email}
                    onChangeText={value => this.setState({ email: value })}
                    keyboardType="email-address"
                    autoCorrect={false}
                    autoCapitalize="none"
                    style={styles.input}
                />
                <TextInput
                    value={username}
                    onChangeText={value => this.setState({ username: value })}
                    autoCorrect={false}
                    autoCapitalize="none"
                    style={styles.input}
                />
                <TextInput
                    value={password}
                    onChangeText={value => this.setState({ password: value })}
                    autoCorrect={false}
                    autoCapitalize="none"
                    secureTextEntry
                    style={styles.input}
                />
                <TouchableHighlight onPress={this.handlePressSignUp}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}
