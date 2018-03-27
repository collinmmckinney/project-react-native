import Meteor, { createContainer, ReactiveDict } from 'react-native-meteor';
import ReviewScreen from './ReviewScreen';

const state = new ReactiveDict('ReviewState');
function resetState() {
    state.set('index', 0);
    state.set('missedCardIds', []);
}
resetState();


export default createContainer(({ navigation }) => ({
    cards: navigation.state.params.cardsToReview
        .concat(state.get('missedCardIds')
            .map(missedCardId => Meteor.collection('cards').findOne({ _id: missedCardId }))),
    index: state.get('index'),
    onReviewCardSubmitCorrectAnswer: (id) => {
        Meteor.call('reviewCard', { id }, (err, result) => {
            console.log(result);
        });
        // Only level up if user didn't miss it first:
        if (state.get('missedCardIds').indexOf(id) === -1) {
            Meteor.call('levelUpCard', { id }, (err, result) => {
                console.log(result);
            });
        }
        state.set('index', state.get('index') + 1);
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
}), ReviewScreen);
