import React, { Component } from 'react'
import { FlatList } from 'react-native'
import glamorous, { View, Text } from 'glamorous-native'
import { SearchBar } from 'react-native-elements'
import restaurants from '../data/restaurants'
import StarRating from 'react-native-star-rating'

const SearchTopBar = glamorous.view({
    width: '100%',
})

const ResultsContainer = glamorous.view({
    flex: 1,
    alignItems: 'stretch',
})

export default class Search extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => ({
        title: 'Search',
    })

    _renderItem = ({ item }) => (
        <View flex={1} paddingBottom={8}>
            <View flex={1}>
                <Text fontSize={14} fontWeight="500">
                    {item.company}
                </Text>
            </View>
            <View flex={1}>
                <View
                    flexDirection="row"
                    flex={1}
                    alignItems="center"
                    justifyContent="space-between">
                    <StarRating
                        disabled={true}
                        maxStars={5}
                        starSize={11}
                        rating={+item.rating}
                    />
                    <Text>{item.balance}</Text>
                </View>
                <View flex={3}>
                    <Text fontSize={11}>{item.about}</Text>
                </View>
            </View>
        </View>
    )

    render() {
        const data = restaurants
        return (
            <View flex={1}>
                <SearchTopBar>
                    <SearchBar
                        onChangeText={() => {}}
                        onClear={() => {}}
                        placeholder="Type Here..."
                    />
                </SearchTopBar>
                <ResultsContainer>
                    <FlatList
                        data={data}
                        contentContainerStyle={{ paddingHorizontal: 20 }}
                        ListHeaderComponent={() => <View height={20} />}
                        ItemSeparatorComponent={() => (
                            <View
                                height={10}
                                borderTopWidth={1}
                                borderColor="#aaa"
                            />
                        )}
                        renderItem={this._renderItem}
                        keyExtractor={item => item._id}
                    />
                </ResultsContainer>
            </View>
        )
    }
}
