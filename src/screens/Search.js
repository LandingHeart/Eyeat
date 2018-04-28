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
        <View flex={1} paddingVertical={8}>
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
                        starSize={14}
                        rating={+item.rating}
                    />
                    <Text>
                        {item.openTime} - {item.closeTime}
                    </Text>
                </View>
                <View flex={1}>
                    <Text fontSize={13} color="#999">
                        {item.address}
                    </Text>
                </View>
                <View flex={3}>
                    <Text fontSize={14}>{item.greeting}</Text>
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
                        lightTheme
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
                                height={30}
                                borderBottomWidth={1}
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
