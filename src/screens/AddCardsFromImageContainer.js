import React from 'react';
import Meteor, { createContainer, ReactiveDict } from 'react-native-meteor';
import AddCardsFromImageScreen from './AddCardsFromImageScreen';
import { HeaderButton } from '../components';

const state = new ReactiveDict('AddCardsFromImageState');
state.set('addedCardIds', []);

const container = createContainer(({ navigation }) => {
    const onHeaderRightPress = () => navigation.navigate('Cards');
    if (!navigation.getParam('onAddCardsFromImageHeaderRightPress')) {
        navigation.setParams({ onAddCardsFromImageHeaderRightPress: onHeaderRightPress });
    }

    return {
        imageUri: navigation.getParam('imageUri', undefined),
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
    };
}, AddCardsFromImageScreen);

container.navigationOptions = ({ navigation: { getParam } }) => ({
    headerRight: <HeaderButton onPress={getParam('onAddCardsFromImageHeaderRightPress')} />
});

export default container;
