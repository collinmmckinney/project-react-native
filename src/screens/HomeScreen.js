import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableHighlight
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: '#F5FCFF'
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

export default class HomeScreen extends Component {
    static propTypes = {
        onPressSignIn: PropTypes.func.isRequired,
        onPressSignUp: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);

        this.handlePressSignIn = this.handlePressSignIn.bind(this);
        this.handlePressSignUp = this.handlePressSignUp.bind(this);
    }

    handlePressSignIn() {
        const { onPressSignIn } = this.props;
        onPressSignIn();
    }

    handlePressSignUp() {
        const { onPressSignUp } = this.props;
        onPressSignUp();
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={this.handlePressSignIn}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Sign In</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.handlePressSignUp}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}
