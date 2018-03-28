import Meteor, { createContainer, ReactiveDict } from 'react-native-meteor';
import ReviewScreen from './ReviewScreen';

const state = new ReactiveDict('ReviewState');
function resetState() {
    state.set('index', 0);
    state.set('missedCardIds', []);
    state.set('correctCardIds', []);
}
resetState();


export default createContainer(({ navigation }) => {
    const missedCards = state.get('missedCardIds').map(missedCardId => Meteor.collection('cards').findOne({ _id: missedCardId }));
    const missedReviews = missedCards.reduce((r, { _id, term, definition }) => {
        r.push({
            cardId: _id,
            question: term,
            answer: definition
        });
        r.push({
            cardId: _id,
            question: definition,
            answer: term
        });
        return r;
    }, []);
    const reviews = navigation.state.params.reviews.concat(missedReviews);
    return {
        reviews,
        index: state.get('index'),
        onReviewCardSubmitCorrectAnswer: (id) => {
            Meteor.call('reviewCard', { id }, (err, result) => {
                console.log(result);
            });
            // Only level up if user has already answered the first correctly:
            const correctCardIds = state.get('correctCardIds');
            if (state.get('missedCardIds').indexOf(id) === -1 && correctCardIds.indexOf(id) > -1) {
                Meteor.call('levelUpCard', { id }, (err, result) => {
                    console.log(result);
                });
            }
            const updatedCorrectCards = correctCardIds.concat(id);
            state.set('correctCardIds', updatedCorrectCards);
        },
        onReviewCardSubmitIncorrectAnswer: (id) => {
            Meteor.call('reviewCard', { id }, (err, result) => {
                console.log(result);
            });
            const missedCardIds = state.get('missedCardIds');
            // Only level down if user hasn't already missed it:
            if (missedCardIds.indexOf(id) === -1) {
                Meteor.call('levelDownCard', { id }, (err, result) => {
                    console.log(result);
                });
            }
            const updatedMissedCards = missedCardIds.concat(id);
            state.set('missedCardIds', updatedMissedCards);
        },
        onReviewCardPressNext: () => {
            state.set('index', state.get('index') + 1);
        },
        onFinish: () => {
            navigation.goBack();
        },
        onComponentWillUnmount: () => {
            resetState();
        }
    };
}, ReviewScreen);
