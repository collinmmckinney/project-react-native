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
        height: 48
    },
    text: {
        color: 'white',
        fontSize: 24
    }
});

export default class Card extends Component {
    static propTypes = {
        term: PropTypes.string,
        termLanguage: PropTypes.string,
        definition: PropTypes.string,
        definitionLanguage: PropTypes.string,
        createdAt: PropTypes.number,
        style: ViewPropTypes.style,
        onPress: PropTypes.func
    }

    static defaultProps = {
        term: '',
        termLanguage: '',
        definition: '',
        definitionLanguage: '',
        createdAt: null,
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
        const {
            term,
            termLanguage,
            definition,
            definitionLanguage,
            createdAt,
            style
        } = this.props;

        return (
            <TouchableOpacity onPress={this.handlePress}>
                <View style={[styles.container, style]}>
                    <View style={styles.row}>
                        <Text style={styles.text}>{`${term} (${termLanguage})`}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.text}>{`${definition} (${definitionLanguage})`}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.text}>{createdAt}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}
