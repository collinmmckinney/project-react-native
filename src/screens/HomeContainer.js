import Meteor, { createContainer } from 'react-native-meteor';
import HomeScreen from './HomeScreen';

export default createContainer(ownProps => ({
    cards: Meteor.collection('cards').find({ userId: Meteor.userId() }),
    isConnected: !(Meteor.status().status === 'failed' || Meteor.status().status === 'offline'),
    isUserNull: !Meteor.loggingIn() && Meteor.user() === null,
    onNullUser: () => {
        ownProps.navigation.navigate('SignInOrSignUp');
    },
    onCardPress: (id) => {
        Meteor.call('deleteCard', { id }, (err, result) => {
            console.log(err, result);
        });
    }
}), HomeScreen);
