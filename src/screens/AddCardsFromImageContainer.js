import Meteor, { createContainer, ReactiveDict } from 'react-native-meteor';
import AddCardsFromImageScreen from './AddCardsFromImageScreen';

const state = new ReactiveDict('AddCardsFromImageState');
state.set('addedCardIds', []);

export default createContainer(ownProps => ({
    imageUri: ownProps.navigation.getParam('imageUri', undefined),
    addedCards: state.get('addedCardIds').map((cardId, i) => {
        const card = Meteor.collection('cards').findOne({ _id: cardId });
        return card || {
            _id: i,
            term: 'Loading...',
            definition: 'Loading'
        };
    }),
    onCropImage: (croppedImageData) => {
        Meteor.call('addCardFromImage', { imageData: croppedImageData }, (err, result) => {
            const updatedAddedCardIds = state.get('addedCardIds').concat(result);
            state.set('addedCardIds', updatedAddedCardIds);
        });
    },
    onCardPress: (id) => {
        Meteor.call('deleteCard', { id }, (err, result) => {
            console.log(err, result);
        });
    }
}), AddCardsFromImageScreen);
