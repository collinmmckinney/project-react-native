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

export default class SettingsScreen extends Component {
    static propTypes = {
        onPressLogout: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);

        this.handlePressLogout = this.handlePressLogout.bind(this);
    }

    handlePressLogout() {
        const { onPressLogout } = this.props;
        onPressLogout();
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={this.handlePressLogout}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Log Out</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}
