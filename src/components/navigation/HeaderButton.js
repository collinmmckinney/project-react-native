import React, { Component } from 'react';
import {
    View,
    ViewPropTypes,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    container: {
        width: 20,
        height: 20,
        backgroundColor: 'black'
    }
});

export default class HeaderButton extends Component {
    static propTypes = {
        style: ViewPropTypes.style,
        onPress: PropTypes.func
    }

    static defaultProps = {
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
        const { style } = this.props;
        return (
            <TouchableHighlight onPress={this.handlePress}>
                <View style={[styles.container, style]} />
            </TouchableHighlight>
        );
    }
}
