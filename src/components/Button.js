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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 48,
        backgroundColor: 'black'
    },
    text: {
        color: 'white',
        fontSize: 24
    }
});

export default class SignInScreen extends Component {
    static propTypes = {
        label: PropTypes.string,
        onPress: PropTypes.func
    }

    static defaultProps = {
        label: '',
        onPress: () => {}
    }

    constructor(props) {
        super(props);

        this.handlePress = this.handlePress.bind(this);
    }

    handlePress() {
        const { onPress } = this.props;
        onPress();
    }

    render() {
        const { label } = this.props;
        return (
            <TouchableHighlight onPress={this.handlePress}>
                <View style={styles.container}>
                    <Text style={styles.text}>{label}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}
