import React, { Component } from 'react'
import { FlatList } from 'react-native'
import glamorous, { View, Text } from 'glamorous-native'
import { SearchBar } from 'react-native-elements'
import restaurants from '../data/restaurants'
import FoodRenderItem from '../components/FoodRenderItem'
import StorageService from '../lib/StorageService'
import * as Icon from '../lib/Icons'

const SearchTopBar = glamorous.view({
    width: '100%',
})

const ResultsContainer = glamorous.view({
    flex: 1,
    alignItems: 'stretch',
})

export default class Menu extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => ({
        title: 'Menu',
        tabBarIcon: ({ focused, tintColor }) => {
            const { routeName } = navigation.state
            let iconName = 'restaurant-menu'

            // You can return any component that you like here! We usually use an
            // icon component from react-native-vector-icons
            return (
                <Icon.MaterialIcons
                    name={iconName}
                    size={25}
                    color={tintColor}
                />
            )
        },
    })

    _listEmptyComponent = () => (
        <View flex={1} alignItems="center" padding={20}>
            <Text fontSize={17} textAlign="center" fontColor={'#999'}>
                Seems like you are not currently in a restaurant{'\n'}If you
                are, please scan any NFC tag or QR code within the restaurant
                for instant detection
            </Text>
        </View>
    )

    _renderItem = ({ item }) => <FoodRenderItem item={item} />

    render() {
        const restId = StorageService.get().restaurantId
        const data =
            (!!restId || {}) && restaurants.filter(r => r._id === restId)[0]
        console.log(data)
        return (
            <View flex={1}>
                <SearchTopBar>
                    <SearchBar
                        lightTheme
                        editable={!!restId}
                        onChangeText={() => {}}
                        onClear={() => {}}
                        placeholder="Type Here..."
                    />
                </SearchTopBar>
                <ResultsContainer>
                    <FlatList
                        data={data && data.menu}
                        contentContainerStyle={{ paddingHorizontal: 20 }}
                        ListEmptyComponent={() => this._listEmptyComponent()}
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
