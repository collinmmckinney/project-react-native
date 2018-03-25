import Meteor, { createContainer } from 'react-native-meteor';
import LearnScreen from './LearnScreen';

export default createContainer(({ navigation }) => ({
    onStartReviewPress: () => {
        navigation.navigate('Review');
    },
    cardsToReview: Meteor.collection('cards').find({ userId: Meteor.userId(), lastReviewedAt: null })
}), LearnScreen);
