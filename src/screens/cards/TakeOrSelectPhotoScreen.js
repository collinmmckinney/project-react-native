import React, { Component } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import { CameraKitCamera } from 'react-native-camera-kit';
import { Button } from '../../components';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF'
    },
    camera: {
        flex: 1
    },
    button: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0
    }
});

export default class TakeOrSelectPhotoScreen extends Component {
    static propTypes = {
        onTakePhotoPress: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);

        this.handleTakePhotoPress = this.handleTakePhotoPress.bind(this);
    }

    async handleTakePhotoPress() {
        const { onTakePhotoPress } = this.props;

        let cameraAuthorization = await CameraKitCamera.checkDeviceCameraAuthorizationStatus();
        if (!cameraAuthorization) {
            cameraAuthorization = await CameraKitCamera.requestDeviceCameraAuthorization();
        }
        if (cameraAuthorization) {
            const image = await this.camera.capture(true);
            onTakePhotoPress(image);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <CameraKitCamera
                    ref={ref => this.camera = ref}
                    style={styles.camera}
                    cameraOptions={{
                        flashMode: 'auto',
                        focusMode: 'on',
                        zoomMode: 'on'
                    }}
                />
                <Button label="Take Photo" onPress={this.handleTakePhotoPress} style={styles.button} />
            </View>
        );
    }
}
