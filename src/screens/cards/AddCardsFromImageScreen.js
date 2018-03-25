import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ImageBackground,
    PanResponder,
    Animated,
    ImageEditor,
    ImageStore,
    PixelRatio
} from 'react-native';
import PropTypes from 'prop-types';
import { HorizontalCardList } from '../../components';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF'
    },
    image: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'stretch'
    },
    cropRectangle: {
        position: 'absolute',
        backgroundColor: 'black',
        opacity: 0.4
    },
    footer: {
        height: 90
    }
});

function normalizeRectangle(origin, dimensions) {
    return {
        origin: {
            x: dimensions.width >= 0 ?
                origin.x : origin.x + dimensions.width,
            y: dimensions.height >= 0 ?
                origin.y : origin.y + dimensions.height
        },
        dimensions: {
            width: Math.abs(dimensions.width),
            height: Math.abs(dimensions.height)
        }
    };
}

export default class AddCardsFromImageScreen extends Component {
    static propTypes = {
        imageUri: PropTypes.string,
        addedCards: PropTypes.arrayOf(PropTypes.shape({
            term: PropTypes.string,
            termLanguage: PropTypes.string,
            definition: PropTypes.string,
            definitionLanguage: PropTypes.string,
            createdAt: PropTypes.number,
            lastReviewedAt: PropTypes.number
        })),
        onCropImage: PropTypes.func,
        onCardPress: PropTypes.func,
        onComponentWillUnmount: PropTypes.func
    }

    static defaultProps = {
        imageUri: undefined,
        addedCards: [],
        onCropImage: () => {},
        onCardPress: () => {},
        onComponentWillUnmount: () => {}
    }

    constructor(props) {
        super(props);

        this.state = {
            cropRectangleOrigin: { x: 0, y: 0 },
            cropRectangleDimensions: { width: 0, height: 0 }
        };

        this.handleImageDragStart = this.handleImageDragStart.bind(this);
        this.handleImageDrag = this.handleImageDrag.bind(this);
        this.handleImageDragStop = this.handleImageDragStop.bind(this);

        this.panResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderGrant: this.handleImageDragStart,
            onPanResponderMove: this.handleImageDrag,
            onPanResponderRelease: this.handleImageDragStop
        });
    }

    componentWillUnmount() {
        this.props.onComponentWillUnmount();
    }

    handleImageDragStart(e) {
        this.setState({
            cropRectangleOrigin: ({ x: e.nativeEvent.locationX, y: e.nativeEvent.locationY }),
            cropRectangleDimensions: ({ width: 0, height: 0 })
        });
    }

    handleImageDrag(e) {
        const { cropRectangleOrigin } = this.state;
        this.setState({
            cropRectangleDimensions: ({
                width: e.nativeEvent.locationX - cropRectangleOrigin.x,
                height: e.nativeEvent.locationY - cropRectangleOrigin.y
            })
        });
    }

    handleImageDragStop() {
        const { imageUri, onCropImage } = this.props;
        const { cropRectangleOrigin, cropRectangleDimensions } = this.state;
        const { origin, dimensions } = normalizeRectangle(cropRectangleOrigin, cropRectangleDimensions);
        ImageEditor.cropImage(imageUri, {
            size: {
                width: PixelRatio.getPixelSizeForLayoutSize(dimensions.width) * 0.96,
                height: PixelRatio.getPixelSizeForLayoutSize(dimensions.height) * 0.96
            },
            offset: { x: PixelRatio.getPixelSizeForLayoutSize(origin.x) * 0.96, y: PixelRatio.getPixelSizeForLayoutSize(origin.y) * 0.96 }
        }, (uri) => {
            ImageStore.getBase64ForTag(uri, (croppedImageData) => {
                onCropImage(croppedImageData);
                this.setState({
                    cropRectangleOrigin: ({ x: 0, y: 0 }),
                    cropRectangleDimensions: ({ width: 0, height: 0 })
                });
            }, (error) => { console.log(error); });
        }, (error) => { console.log(error); });
    }

    render() {
        const { imageUri, addedCards, onCardPress } = this.props;
        const { cropRectangleOrigin, cropRectangleDimensions } = this.state;
        const { origin, dimensions } = normalizeRectangle(cropRectangleOrigin, cropRectangleDimensions);

        return (
            <View style={styles.container}>
                <Animated.View style={styles.image}>
                    <ImageBackground source={{ uri: imageUri }} style={styles.image} {...this.panResponder.panHandlers}>
                        <Animated.View style={[
                            styles.cropRectangle,
                            {
                                top: origin.y,
                                left: origin.x,
                                width: dimensions.width,
                                height: dimensions.height
                            }
                        ]}
                        />
                        <View style={styles.footer}>
                            <HorizontalCardList cards={addedCards} onCardPress={onCardPress} />
                        </View>
                    </ImageBackground>
                </Animated.View>
            </View>
        );
    }
}
