import React, { Component } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import { Button } from '../../components';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: '#F5FCFF'
    }
});

export default class SignInOrSignUpScreen extends Component {
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
                <Button label="Sign In" onPress={this.handlePressSignIn} />
                <Button label="Sign Up" onPress={this.handlePressSignUp} />
            </View>
        );
    }
}
