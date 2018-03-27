import Meteor, { createContainer } from 'react-native-meteor';
import moment from 'moment';
import LearnScreen from './LearnScreen';

export default createContainer(({ navigation }) => ({
    cardsToReview: Meteor.collection('cards').find({
        $and: [
            { userId: Meteor.userId() },
            {
                $or: [
                    { lastReviewedAt: null },
                    {
                        $and: [
                            { level: 0 },
                            {
                                lastReviewedAt: {
                                    $lte: Date.now() - moment.duration(4, 'hours').asMilliseconds()
                                }
                            }
                        ]
                    },
                    {
                        $and: [
                            { level: 1 },
                            {
                                lastReviewedAt: {
                                    $lte: Date.now() - moment.duration(4, 'hours').asMilliseconds()
                                }
                            }
                        ]
                    },
                    {
                        $and: [
                            { level: 2 },
                            {
                                lastReviewedAt: {
                                    $lte: Date.now() - moment.duration(8, 'hours').asMilliseconds()
                                }
                            }
                        ]
                    },
                    {
                        $and: [
                            { level: 3 },
                            {
                                lastReviewedAt: {
                                    $lte: Date.now() - moment.duration(24, 'hours').asMilliseconds()
                                }
                            }
                        ]
                    },
                    {
                        $and: [
                            { level: 4 },
                            {
                                lastReviewedAt: {
                                    $lte: Date.now() - moment.duration(48, 'hours').asMilliseconds()
                                }
                            }
                        ]
                    },
                    {
                        $and: [
                            { level: 5 },
                            {
                                lastReviewedAt: {
                                    $lte: Date.now() - moment.duration(1, 'weeks').asMilliseconds()
                                }
                            }
                        ]
                    },
                    {
                        $and: [
                            { level: 6 },
                            {
                                lastReviewedAt: {
                                    $lte: Date.now() - moment.duration(2, 'weeks').asMilliseconds()
                                }
                            }
                        ]
                    },
                    {
                        $and: [
                            { level: 7 },
                            {
                                lastReviewedAt: {
                                    $lte: Date.now() - moment.duration(1, 'months').asMilliseconds()
                                }
                            }
                        ]
                    },
                    {
                        $and: [
                            { level: 8 },
                            {
                                lastReviewedAt: {
                                    $lte: Date.now() - moment.duration(4, 'months').asMilliseconds()
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    }),
    onStartReviewPress: (cardsToReview) => {
        navigation.navigate('Review', { cardsToReview });
    }
}), LearnScreen);
