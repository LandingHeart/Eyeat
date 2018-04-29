import React, { Component } from 'react'
import { Image } from 'react-native'
import StarRating from 'react-native-star-rating'
import glamorous, { View, Text } from 'glamorous-native'
import gradeA from '../img/A.png'
import gradeB from '../img/B.png'
import gradeC from '../img/C.png'
import gradePending from '../img/pending.png'
import StorageService from '../lib/StorageService'

const GradeContainer = glamorous.touchableOpacity({
    width: 61,
    height: 78,
    position: 'absolute',
    zIndex: 1,
    bottom: -20,
    right: 0,
})

export default class RestaurantRenderItem extends Component {
    render() {
        const item = this.props.item
        let grade = gradePending
        if (item.grade === 'A') {
            grade = gradeA
        } else if (item.grade === 'B') {
            grade = gradeB
        } else if (item.grade === 'C') {
            grade = gradeC
        }
        return (
            <View flex={1} paddingVertical={8} marginBottom={19}>
                <View
                    flex={1}
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between">
                    <Text fontSize={18} fontWeight="500" numberOfLines={1}>
                        {item.dba}
                    </Text>
                    <Text>{item.zipcode}</Text>
                </View>
                <View flex={1}>
                    <View
                        flexDirection="row"
                        flex={1}
                        alignItems="center"
                        justifyContent="space-between">
                        <StarRating
                            disabled={true}
                            iconSet="MaterialCommunityIcons"
                            fullStar="heart"
                            emptyStar="heart-outline"
                            halfStar="heart-half-full"
                            maxStars={5}
                            starSize={18}
                            fullStarColor="red"
                            rating={Math.round(+item.rating)}
                        />
                    </View>
                    <View flex={1}>
                        <Text fontSize={16} color="#999">
                            {item.boro}
                        </Text>
                    </View>
                    <View flex={3}>
                        <Text fontSize={14}>{item.cuisine_description}</Text>
                    </View>
                </View>
                <GradeContainer
                    accessibilityLabel="Read Inspection Grade and Description"
                    onPress={() =>
                        StorageService.speak(
                            ((item.grade && 'Grade-' + item.grade + '.\n') ||
                                'Grade pending. ') +
                                item.violation_description ||
                                'Grade Pending. There is no violation description available'
                        )
                    }>
                    <Image
                        source={grade}
                        style={{
                            width: 61,
                            height: 78,
                            zIndex: 1,
                        }}
                    />
                </GradeContainer>
            </View>
        )
    }
}
