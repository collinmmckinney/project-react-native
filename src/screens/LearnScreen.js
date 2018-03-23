import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { Card } from '../components';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    scrollContent: {
        alignItems: 'stretch',
        paddingTop: 10,
        backgroundColor: '#F5FCFF'
    },
    separator: {
        height: 10
    }
});

export default class LearnScreen extends Component {
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
        onCardPress: PropTypes.func
    }

    static defaultProps = {
        cards: [],
        onCardPress: () => {}
    }

    constructor(props) {
        super(props);


        this.renderCard = this.renderCard.bind(this);
    }

    renderCard({ item }) {
        const { onCardPress } = this.props;
        return <Card {...item} onPress={() => { onCardPress(item._id); }} />;
    }

    render() {
        const { cards } = this.props;

        return (
            <FlatList
                data={cards}
                renderItem={this.renderCard}
                keyExtractor={item => item._id}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                contentContainerStyle={styles.scrollContent}
                style={styles.container}
            />
        );
    }
}
