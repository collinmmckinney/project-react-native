import Meteor, { createContainer } from 'react-native-meteor';
import HomeScreen from './HomeScreen';

export default createContainer(ownProps => ({
    user: Meteor.user(),
    onNullUser: () => {
        ownProps.navigation.navigate('SignInOrSignUp');
    }
}), HomeScreen);
