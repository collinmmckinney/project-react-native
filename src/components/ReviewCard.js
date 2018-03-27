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
        justifyContent: 'center'
    },
    questionContainer: {
        flex: 0.5,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
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
        let backgroundColor = 'black';
        if (correct) {
            backgroundColor = 'green';
        } else if (incorrect) {
            backgroundColor = 'red';
        }

        return (
            <View style={[styles.container, style, { backgroundColor }]}>
                <View style={styles.questionContainer}>
                    <Text style={styles.question}>{question}</Text>
                    { incorrect && <Text style={styles.answer}>{answer}</Text> }
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
                <Button label={incorrect ? 'Next' : 'Submit'} onPress={incorrect ? this.handlePressNext : this.handleSubmit} />
            </View>
        );
    }
}
