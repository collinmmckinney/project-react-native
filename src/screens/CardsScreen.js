import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { Card } from '../components';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
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

export default class CardsScreen extends Component {
    static propTypes = {
        cards: PropTypes.arrayOf(PropTypes.shape({
            _id: PropTypes.string,
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
        onNullUser: PropTypes.func.isRequired,
        onCardPress: PropTypes.func
    }

    static defaultProps = {
        cards: [],
        isConnected: true,
        isUserNull: false,
        onCardPress: () => {}
    }

    constructor(props) {
        super(props);

        if (!props.isConnected) {
            this.connectionTimer = setTimeout(() => {
                Alert.alert('Cannot connect to server.');
            }, 2000);
        } else if (props.isUserNull) {
            props.onNullUser();
        }

        this.renderCard = this.renderCard.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isUserNull) {
            nextProps.onNullUser();
        }
        if (nextProps.isConnected) {
            clearTimeout(this.connectionTimer);
        }
    }

    renderCard({ item }) {
        const { onCardPress } = this.props;
        return <Card {...item} onPress={() => { onCardPress(item._id); }} />;
    }

    render() {
        const { cards } = this.props;

        return (
            <FlatList
                data={cards}
                renderItem={this.renderCard}
                keyExtractor={({ _id }) => _id}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                contentContainerStyle={styles.scrollContent}
                style={styles.container}
            />
        );
    }
}
