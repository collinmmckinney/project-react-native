import Meteor, { createContainer, ReactiveDict } from 'react-native-meteor';
import ReviewScreen from './ReviewScreen';

const state = new ReactiveDict('ReviewState');
state.set('index', 0);

export default createContainer(ownProps => ({
    cards: Meteor.collection('cards').find({ userId: Meteor.userId(), lastReviewedAt: null }),
    index: state.get('index'),
    onReviewCardSubmitCorrectAnswer: (id) => {
        console.log(id, 'CORRECT');
        state.set('index', state.get('index') + 1);
    },
    onReviewCardSubmitIncorrectAnswer: (id) => {
        console.log(id, 'INCORRECT');
        state.set('index', state.get('index') + 1);
    }
}), ReviewScreen);
