import Meteor, { createContainer } from 'react-native-meteor';
import TakeOrSelectPhotoScreen from './TakeOrSelectPhotoScreen';

export default createContainer(ownProps => ({
    onTakePhotoPress: (image) => {
        // Meteor.call('addCard', { imageData }, (err, result) => {
        //     console.log(err, result);
        // });
        ownProps.navigation.navigate('AddCardsFromImage', { imageUri: image.uri });
    }
}), TakeOrSelectPhotoScreen);
