import React, { Component } from 'react';
import { View, ViewPropTypes, StyleSheet, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { BasicCard } from '.';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    card: {
        width: 100
    },
    separator: {
        width: 10
    },
    contentContainer: {
        alignItems: 'center'
    }
});

export default class HorizontalCardList extends Component {
    static propTypes = {
        cards: PropTypes.arrayOf(PropTypes.shape({
            userId: PropTypes.string,
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
        this.renderCard = this.renderCard.bind(this);
    }

    handleCardPress() {
        const { onCardPress } = this.props;
        onCardPress();
    }

    renderCard({ item }) {
        const { onCardPress } = this.props;
        const { term, definition } = item;
        return (
            <BasicCard term={term} definition={definition} style={styles.card} onPress={onCardPress} />
        );
    }

    render() {
        const { cards, style } = this.props;
        return (
            <FlatList
                data={cards}
                renderItem={this.renderCard}
                keyExtractor={({ _id }) => _id}
                horizontal
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                contentContainerStyle={styles.contentContainer}
                style={[styles.container, style]}
            />
        );
    }
}
