import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { Card } from '../components';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollContent: {
        alignItems: 'stretch',
        paddingTop: 10,
        backgroundColor: '#F5FCFF'
    },
    card: {
        marginBottom: 10
    }
});

export default class HomeScreen extends Component {
    static propTypes = {
        cards: PropTypes.arrayOf(PropTypes.shape({
            term: PropTypes.string,
            termLanguage: PropTypes.string,
            definition: PropTypes.string,
            definitionLanguage: PropTypes.string,
            createdAt: PropTypes.number,
            lastReviewedAt: PropTypes.number
        })),
        isConnected: PropTypes.bool,
        isUserNull: PropTypes.bool,
        onNullUser: PropTypes.func.isRequired
    }

    static defaultProps = {
        isConnected: true,
        isUserNull: false,
        cards: []
    }

    constructor(props) {
        super(props);

        if (!props.isConnected) {
            Alert.alert('Cannot connect to server.');
        } else if (props.isUserNull) {
            props.onNullUser();
        }
    }

    render() {
        const { cards } = this.props;
        const cardElements = cards.map(card => <Card key={card._id} {...card} style={styles.card} />);
        return (
            <ScrollView contentContainerStyle={styles.scrollContent} style={styles.container}>
                {cardElements}
            </ScrollView>
        );
    }
}
