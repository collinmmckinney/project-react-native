import Meteor, { createContainer } from 'react-native-meteor';
import AddCardsFromImageScreen from './AddCardsFromImageScreen';

export default createContainer(ownProps => ({
    imageUri: ownProps.navigation.getParam('imageUri', undefined),
    onCropImage: (image) => {
        // Meteor.call('addCard', { imageData }, (err, result) => {
        //     console.log(err, result);
        // });
        ownProps.navigation.navigate('AddCardsFromImage', { imageUri: image.uri });
    }
}), AddCardsFromImageScreen);
