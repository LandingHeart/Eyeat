import React, { Component } from 'react'
import StarRating from 'react-native-star-rating'
import { View, Text } from 'glamorous-native'

export default class RestaurantRenderItem extends Component {
    render() {
        const item = this.props.item
        return (
            <View flex={1} paddingVertical={8}>
                <View
                    flex={1}
                    flexDirection="row"
                    justifyContent="space-between">
                    <Text fontSize={19} fontWeight="500">
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
            </View>
        )
    }
}
