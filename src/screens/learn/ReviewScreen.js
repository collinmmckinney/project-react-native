import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { ReviewCard } from '../../components';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    card: {
        flex: 1,
        width: Dimensions.get('window').width
    }
});

export default class LearnScreen extends Component {
    static propTypes = {
        cards: PropTypes.arrayOf(PropTypes.shape({
            _id: PropTypes.string,
            userId: PropTypes.string,
            term: PropTypes.string,
            termLanguage: PropTypes.string,
            definition: PropTypes.string,
            definitionLanguage: PropTypes.string,
            createdAt: PropTypes.number,
            lastReviewedAt: PropTypes.number
        })),
        index: PropTypes.number,
        onReviewCardSubmitCorrectAnswer: PropTypes.func,
        onReviewCardSubmitIncorrectAnswer: PropTypes.func,
        onReviewCardPressNext: PropTypes.func,
        onFinish: PropTypes.func,
        onComponentWillUnmount: PropTypes.func
    }

    static defaultProps = {
        cards: [],
        index: 0,
        onReviewCardSubmitCorrectAnswer: () => {},
        onReviewCardSubmitIncorrectAnswer: () => {},
        onReviewCardPressNext: () => {},
        onFinish: () => {},
        onComponentWillUnmount: () => {}
    }

    constructor(props) {
        super(props);

        this.renderCard = this.renderCard.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.index !== this.props.index) {
            if (nextProps.index < nextProps.cards.length) {
                this.list.scrollToIndex({ index: nextProps.index });
            } else {
                nextProps.onFinish();
            }
        }
    }

    componentWillUnmount() {
        this.props.onComponentWillUnmount();
    }

    renderCard({ item: { _id, term, definition, } }) {
        return (
            <ReviewCard
                question={term}
                answer={definition}
                onSubmitCorrectAnswer={() => { this.props.onReviewCardSubmitCorrectAnswer(_id); }}
                onSubmitIncorrectAnswer={() => { this.props.onReviewCardSubmitIncorrectAnswer(_id); }}
                onPressNext={this.props.onReviewCardPressNext}
                style={styles.card}
            />
        );
    }

    render() {
        const { cards } = this.props;

        return (
            <FlatList
                data={cards}
                renderItem={this.renderCard}
                keyExtractor={(item, i) => i.toString()}
                horizontal
                scrollEnabled={false}
                pagingEnabled
                style={styles.container}
                ref={component => this.list = component}
            />
        );
    }
}
