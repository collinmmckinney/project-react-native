import Meteor, { createContainer } from 'react-native-meteor';
import HomeScreen from './HomeScreen';

export default createContainer(ownProps => ({
    user: Meteor.user(),
    cards: Meteor.collection('cards').find(),
    onNullUser: () => {
        ownProps.navigation.navigate('SignInOrSignUp');
    },
    onAddCardPress: (imageData) => {
        Meteor.call('addCard', { imageData }, (err, result) => {
            console.log(err, result);
        });
    }
}), HomeScreen);
