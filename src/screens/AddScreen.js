import React, { Component } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import { Button } from '../components';
import { imageData } from '../img';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: '#F5FCFF'
    }
});

export default class HomeScreen extends Component {
    static propTypes = {
        onAddCardPress: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);

        this.handleAddCardPress = this.handleAddCardPress.bind(this);
    }

    handleAddCardPress() {
        const { onAddCardPress } = this.props;
        onAddCardPress(imageData);
    }

    render() {
        return (
            <View style={styles.container}>
                <Button label="Add Card" onPress={this.handleAddCardPress} />
            </View>
        );
    }
}
