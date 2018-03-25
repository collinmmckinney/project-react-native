import React, { Component } from 'react';
import {
    View,
    ViewPropTypes,
    StyleSheet,
    Text,
    TextInput
} from 'react-native';
import PropTypes from 'prop-types';
import { Button } from '.';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: 'black'
    },
    questionContainer: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    question: {
        color: 'white',
        fontSize: 48
    },
    inputContainer: {
        flex: 0.5,
        justifyContent: 'center'
    },
    input: {
        height: 48,
        fontSize: 24,
        borderWidth: 1,
        backgroundColor: 'white'
    }
});

export default class ReviewCard extends Component {
    static propTypes = {
        question: PropTypes.string,
        answer: PropTypes.string,
        style: ViewPropTypes.style,
        onSubmitCorrectAnswer: PropTypes.func,
        onSubmitIncorrectAnswer: PropTypes.func
    }

    static defaultProps = {
        question: '',
        answer: '',
        style: null,
        onSubmitCorrectAnswer: () => {},
        onSubmitIncorrectAnswer: () => {}
    }

    constructor(props) {
        super(props);
        this.state = {
            input: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        const { answer, onSubmitCorrectAnswer, onSubmitIncorrectAnswer } = this.props;
        const { input } = this.state;
        if (input === answer) {
            onSubmitCorrectAnswer();
        } else {
            onSubmitIncorrectAnswer();
        }
    }

    render() {
        const { question, answer, style } = this.props;
        const { input } = this.state;

        return (
            <View style={[styles.container, style]}>
                <View style={styles.questionContainer}>
                    <Text style={styles.question}>{question}</Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        value={input}
                        onChangeText={value => this.setState({ input: value })}
                        autoCorrect={false}
                        autoCapitalize="none"
                        style={styles.input}
                    />
                </View>
                <Button label="Submit" onPress={this.handleSubmit} />
            </View>
        );
    }
}
