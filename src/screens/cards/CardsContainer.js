import React from 'react';
import Meteor, { createContainer } from 'react-native-meteor';
import CardsScreen from './CardsScreen';
import { HeaderButton } from '../../components';

const container = createContainer(({ navigation }) => {
    const onHeaderRightPress = () => navigation.navigate('TakeOrSelectPhoto');
    if (!navigation.getParam('onCardsHeaderRightPress')) {
        navigation.setParams({ onCardsHeaderRightPress: onHeaderRightPress });
    }

    return {
        cards: Meteor.collection('cards').find({ userId: Meteor.userId() }),
        isConnected: Meteor.status().status === 'connected' || Meteor.status().status === 'connecting',
        isUserNull: !Meteor.loggingIn() && Meteor.user() === null,
        onNullUser: () => {
            navigation.navigate('SignInOrSignUp');
        },
        onCardPress: (id) => {
            Meteor.call('deleteCard', { id }, (err, result) => {
                console.log(err, result);
            });
        }
    };
}, CardsScreen);


container.navigationOptions = ({ navigation: { getParam } }) => ({
    headerRight: <HeaderButton onPress={getParam('onCardsHeaderRightPress')} />
});

export default container;
