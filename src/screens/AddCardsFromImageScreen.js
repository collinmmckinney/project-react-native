import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Image
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF'
    },
    image: {
        flex: 1
    }
});

export default class TakeOrSelectPhotoScreen extends Component {
    static propTypes = {
        imageUri: PropTypes.string,
        onCropImage: PropTypes.func.isRequired
    }

    static defaultProps = {
        imageUri: undefined
    }

    constructor(props) {
        super(props);

        this.handleCropImage = this.handleCropImage.bind(this);
    }

    handleCropImage() {
        const { onCropImage } = this.props;
    }

    render() {
        const { imageUri } = this.props;

        return (
            <View style={styles.container}>
                {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
            </View>
        );
    }
}
