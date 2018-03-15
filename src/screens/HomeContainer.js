import Meteor, { createContainer } from 'react-native-meteor';
import HomeScreen from './HomeScreen';

export default createContainer(ownProps => ({
    user: Meteor.user(),
    onNullUser: () => {
        console.log("calling null user");
        ownProps.navigation.navigate('SignInOrSignUp');
    }
}), HomeScreen);
