import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: '#F5FCFF'
    }
});

export default class HomeScreen extends Component {
    static propTypes = {
        user: PropTypes.shape({
            email: PropTypes.string,
            username: PropTypes.string,
            password: PropTypes.string
        }),
        onNullUser: PropTypes.func.isRequired
    }

    static defaultProps = {
        user: undefined
    }

    constructor(props) {
        super(props);

        if (props.user === null) {
            props.onNullUser();
        }
    }

    render() {
        const { user } = this.props;

        return (
            <View style={styles.container}>
                <Text>
                    {user && user.username}
                </Text>
            </View>
        );
    }
}
