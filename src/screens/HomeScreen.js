import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from '../components';

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
        cards: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string,
            translation: PropTypes.string
        })),
        onNullUser: PropTypes.func.isRequired
    }

    static defaultProps = {
        user: undefined,
        cards: []
    }

    constructor(props) {
        super(props);

        if (props.user === null) {
            props.onNullUser();
        }
    }

    render() {
        const { cards } = this.props;
        console.log(cards);

        const cardElements = cards.map(({ text, translation, _id }) => <Button key={_id} label={`${text} ${translation}`} />);

        return (
            <View style={styles.container}>
                {cardElements}
            </View>
        );
    }
}
