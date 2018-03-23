import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
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
    separator: {
        height: 10
    }
});

export default class HomeScreen extends Component {
    static propTypes = {
        cards: PropTypes.arrayOf(PropTypes.shape({
            userId: PropTypes.string,
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

    renderCard({ item }) {
        return <Card key={item._id} {...item} />;
    }

    render() {
        const { cards } = this.props;

        return (
            <FlatList
                data={cards}
                renderItem={this.renderCard}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                contentContainerStyle={styles.scrollContent}
                style={styles.container}
            />
        );
    }
}
