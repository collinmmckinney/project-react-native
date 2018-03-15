import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text
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
        user: PropTypes.shape({
            email: PropTypes.string,
            username: PropTypes.string,
            password: PropTypes.string
        }),
        cards: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string,
            translation: PropTypes.string
        })),
        onNullUser: PropTypes.func.isRequired,
        onAddCardPress: PropTypes.func.isRequired
    }

    static defaultProps = {
        user: undefined,
        cards: []
    }

    constructor(props) {
        super(props);

        if (props.user === null) {
            props.onNullUser();
        }

        this.handleAddCardPress = this.handleAddCardPress.bind(this);
    }

    handleAddCardPress() {
        const { onAddCardPress } = this.props;
        onAddCardPress(imageData);
    }

    render() {
        const { cards } = this.props;

        const cardElements = cards.map(({ text, translation }, i) => <Button key={i} label={`${text} ${translation}`} />);

        return (
            <View style={styles.container}>
                {cardElements}
                <Button label="Add Card" onPress={this.handleAddCardPress} />
            </View>
        );
    }
}
