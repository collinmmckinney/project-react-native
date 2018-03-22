import React, { Component } from 'react';
import { View, ViewPropTypes, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    container: {
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    }
});

export default class HorizontalCardList extends Component {
    static propTypes = {
        cards: PropTypes.arrayOf(PropTypes.shape({
            term: PropTypes.string,
            termLanguage: PropTypes.string,
            definition: PropTypes.string,
            definitionLanguage: PropTypes.string,
            createdAt: PropTypes.number,
            lastReviewedAt: PropTypes.number
        })),
        style: ViewPropTypes.style,
        onCardPress: PropTypes.func
    }

    static defaultProps = {
        cards: [],
        style: null,
        onCardPress: () => {}
    }

    constructor(props) {
        super(props);

        this.handleCardPress = this.handleCardPress.bind(this);
    }

    handleCardPress() {
        const { onCardPress } = this.props;
        onCardPress();
    }

    render() {
        const { cards, style, onCardPress } = this.props;

        return (
            <View style={styles.container} />
        );
    }
}
