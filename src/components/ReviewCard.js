import React, { Component } from 'react';
import {
    View,
    ViewPropTypes,
    StyleSheet,
    KeyboardAvoidingView,
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
        justifyContent: 'center'
    },
    questionContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 200
    },
    question: {
        color: 'white',
        fontSize: 48
    },
    answer: {
        color: 'white',
        fontSize: 48
    },
    inputContainer: {
        flex: 1,
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
        onSubmitIncorrectAnswer: PropTypes.func,
        onPressNext: PropTypes.func
    }

    static defaultProps = {
        question: '',
        answer: '',
        style: null,
        onSubmitCorrectAnswer: () => {},
        onSubmitIncorrectAnswer: () => {},
        onPressNext: () => {}
    }

    constructor(props) {
        super(props);
        this.state = {
            input: '',
            correct: false,
            incorrect: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePressNext = this.handlePressNext.bind(this);
    }

    handleSubmit() {
        const { answer, onSubmitCorrectAnswer, onSubmitIncorrectAnswer } = this.props;
        const { input } = this.state;
        if (input === answer) {
            onSubmitCorrectAnswer();
            this.setState({ correct: true });
            this.setState({ incorrect: false });
        } else {
            onSubmitIncorrectAnswer();
            this.setState({ correct: false });
            this.setState({ incorrect: true });
        }
    }

    handlePressNext() {
        this.props.onPressNext();
    }

    render() {
        const { question, answer, style } = this.props;
        const { input, correct, incorrect } = this.state;
        const answered = correct || incorrect;
        let backgroundColor = 'black';
        if (correct) {
            backgroundColor = 'green';
        } else if (incorrect) {
            backgroundColor = 'red';
        }

        return (
            <KeyboardAvoidingView style={[styles.container, style, { backgroundColor }]} behavior="padding" ver>
                <View style={styles.questionContainer}>
                    <Text style={styles.question}>{question}</Text>
                    { answered && <Text style={styles.answer}>{answer}</Text> }
                </View>
                <View style={styles.inputContainer}>
                    { !answered &&
                        <TextInput
                            value={input}
                            onChangeText={value => this.setState({ input: value })}
                            onSubmitEditing={this.handleSubmit}
                            autoCorrect={false}
                            autoCapitalize="none"
                            returnKeyType="done"
                            returnKeyLabel="Submit"
                            style={styles.input}
                        />
                    }
                </View>
                { answered && <Button label="Next" onPress={this.handlePressNext} /> }
            </KeyboardAvoidingView>
        );
    }
}
