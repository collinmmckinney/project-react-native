import Meteor, { createContainer } from 'react-native-meteor';
import LearnScreen from './LearnScreen';

export default createContainer(ownProps => ({
    cards: Meteor.collection('cards').find({ userId: Meteor.userId() })
}), LearnScreen);
