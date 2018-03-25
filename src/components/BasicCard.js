import React, { Component } from 'react';
import {
    View,
    ViewPropTypes,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 24
    },
    text: {
        color: 'white',
        fontSize: 12
    }
});

export default class BasicCard extends Component {
    static propTypes = {
        term: PropTypes.string,
        definition: PropTypes.string,
        style: ViewPropTypes.style,
        onPress: PropTypes.func
    }

    static defaultProps = {
        term: '',
        definition: '',
        style: null,
        onPress: () => {}
    }

    constructor(props) {
        super(props);

        this.handlePress = this.handlePress.bind(this);
    }

    handlePress() {
        this.props.onPress();
    }

    render() {
        const { term, definition, style } = this.props;

        return (
            <TouchableOpacity onPress={this.handlePress}>
                <View style={[styles.container, style]}>
                    <View style={styles.row}>
                        <Text style={styles.text}>{term}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.text}>{definition}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}
