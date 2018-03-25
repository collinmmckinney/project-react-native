import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { Button, Card } from '../../components';

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
        cardsToReview: PropTypes.arrayOf(PropTypes.shape({
            _id: PropTypes.string,
            term: PropTypes.string,
            createdAt: PropTypes.number,
            lastReviewedAt: PropTypes.number
        })),
        onCardPress: PropTypes.func,
        onStartReviewPress: PropTypes.func
    }

    static defaultProps = {
        cardsToReview: [],
        onCardPress: () => {},
        onStartReviewPress: () => {}
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
        const { cardsToReview, onStartReviewPress } = this.props;

        return (
            <View style={styles.container}>
                <Button label="Start Reviews" onPress={onStartReviewPress} />
                <FlatList
                    data={cardsToReview}
                    renderItem={this.renderCard}
                    keyExtractor={({ _id }) => _id}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    contentContainerStyle={styles.scrollContent}
                    style={styles.container}
                />
            </View>
        );
    }
}
