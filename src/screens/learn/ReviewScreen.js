import React, { Component } from 'react';
import { StyleSheet, FlatList, Dimensions } from 'react-native';
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
        reviews: PropTypes.arrayOf(PropTypes.shape({
            cardId: PropTypes.string,
            question: PropTypes.string,
            answer: PropTypes.string
        })),
        index: PropTypes.number,
        onReviewCardSubmitCorrectAnswer: PropTypes.func,
        onReviewCardSubmitIncorrectAnswer: PropTypes.func,
        onReviewCardPressNext: PropTypes.func,
        onFinish: PropTypes.func,
        onComponentWillUnmount: PropTypes.func
    }

    static defaultProps = {
        reviews: [],
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
            if (nextProps.index < nextProps.reviews.length) {
                this.list.scrollToIndex({ index: nextProps.index });
            } else {
                nextProps.onFinish();
            }
        }
    }

    componentWillUnmount() {
        this.props.onComponentWillUnmount();
    }

    renderCard({ item: { cardId, question, answer } }) {
        return (
            <ReviewCard
                question={question}
                answer={answer}
                onSubmitCorrectAnswer={() => { this.props.onReviewCardSubmitCorrectAnswer(cardId); }}
                onSubmitIncorrectAnswer={() => { this.props.onReviewCardSubmitIncorrectAnswer(cardId); }}
                onPressNext={this.props.onReviewCardPressNext}
                style={styles.card}
            />
        );
    }

    render() {
        const { reviews } = this.props;

        return (
            <FlatList
                data={reviews}
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
