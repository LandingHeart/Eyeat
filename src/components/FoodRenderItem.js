import React, { Component } from 'react'
import StarRating from 'react-native-star-rating'
import { View, Text } from 'glamorous-native'

/**
 * 
 * 
                _id: '5ae42862f2575257b7653d91',
                picture: 'http://placehold.it/32x32',
                title: 'Fischer',
                rating: '0.38',
                company: 'COSMOSIS',
                ingredients: 'half and half',
                category: 'nearby',
 */

export default class FoodRenderItem extends Component {
    render() {
        const item = this.props.item
        return (
            <View flex={1} paddingVertical={8}>
                <View flex={1}>
                    <Text fontSize={19} fontWeight="500">
                        {item.title}
                    </Text>
                </View>
                <View flex={1}>
                    <View
                        flexDirection="row"
                        flex={1}
                        accessible={true}
                        onAccessibilityTap={() => console.log('ACCESSIBLE')}
                        alignItems="center"
                        justifyContent="space-between">
                        {/* <View accessible={false}> */}
                        <StarRating
                            disabled={true}
                            maxStars={5}
                            starSize={18}
                            rating={Math.round(+item.rating)}
                        />
                        {/* </View> */}
                        <Text>{item.balance}</Text>
                    </View>
                    <View flex={1}>
                        <Text fontSize={16} color="#999">
                            {item.ingredients}
                        </Text>
                    </View>
                    <View flex={3}>
                        <Text fontSize={14}>{item.greeting}</Text>
                    </View>
                </View>
            </View>
        )
    }
}
