import Meteor, { createContainer } from 'react-native-meteor';
import AddCardsFromImageScreen from './AddCardsFromImageScreen';

export default createContainer(ownProps => ({
    imageUri: ownProps.navigation.getParam('imageUri', undefined),
    cards: Meteor.collection('cards').find({ userId: Meteor.userId() }),
    onCropImage: (croppedImageData) => {
        Meteor.call('addCard', { imageData: croppedImageData }, (err, result) => {
            console.log(err, result);
        });
    }
}), AddCardsFromImageScreen);
