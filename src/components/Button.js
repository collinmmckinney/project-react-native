import React, { Component } from 'react';
import {
    View,
    ViewPropTypes,
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

export default class Button extends Component {
    static propTypes = {
        label: PropTypes.string,
        style: ViewPropTypes.style,
        onPress: PropTypes.func
    }

    static defaultProps = {
        label: '',
        style: null,
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
        const { label, style } = this.props;
        return (
            <TouchableHighlight onPress={this.handlePress}>
                <View style={[styles.container, style]}>
                    <Text style={styles.text}>{label}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}
