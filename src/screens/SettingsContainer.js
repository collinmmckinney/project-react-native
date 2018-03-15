import Meteor, { createContainer } from 'react-native-meteor';
import SettingsScreen from './SettingsScreen';

export default createContainer(ownProps => ({
    onPressLogout: () => {
        Meteor.logout(() => {
            ownProps.navigation.navigate('SignInOrSignUp');
        });
    }
}), SettingsScreen);
