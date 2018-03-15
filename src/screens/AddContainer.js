import Meteor, { createContainer } from 'react-native-meteor';
import AddScreen from './AddScreen';

export default createContainer(() => ({
    onAddCardPress: (imageData) => {
        Meteor.call('addCard', { imageData }, (err, result) => {
            console.log(err, result);
        });
    }
}), AddScreen);
