import React, { Component } from 'react'
import { FlatList } from 'react-native'
import glamorous, { View, Text } from 'glamorous-native'
import { SearchBar } from 'react-native-elements'
import restaurants from '../data/restaurants'
import NfcManager, { NdefParser } from 'react-native-nfc-manager'
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

const BigIconButtonContainer = glamorous.touchableOpacity({
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
})

const BigIconButton = ({ font, name, text }) => {
    const BIcon = Icon[font]
    return (
        <BigIconButtonContainer
            accessibilityLabel={text.toLowerCase()}
            accessible={true}
            onAcccessibilityTap={() => console.log('ACCESSIBILITY TAPPED')}>
            <BIcon
                name={name}
                size={100}
                style={{ paddingBottom: 20 }}
                pointerEvents="none"
            />
            <Text
                textAlign="center"
                fontSize={18}
                // accessibilityLabel={text.toLowerCase()}
                pointerEvents="none">
                {text}
            </Text>
        </BigIconButtonContainer>
    )
}

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

    constructor(props) {
        super(props)
        this.state = {
            restaurantId: null,
        }
    }

    _listEmptyComponent = () => (
        <View
            flex={1}
            alignItems="center"
            justifyContent="center"
            marginTop={100}>
            <Text textAlign="center" fontSize={17} fontWeight="600">
                <Text>To get to the menu of the restaurant{'\n'}</Text>
                <Text>Scan an NFC sticker if possible{'\n'}</Text>
                <Text>Touch RIGHT to use your location{'\n'}</Text>
                <Text>Touch LEFT to use a QR Code</Text>
            </Text>
            <View
                paddingTop={20}
                width="80%"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-around">
                <BigIconButton
                    name="barcode-scan"
                    font="MaterialCommunityIcons"
                    text={'SCAN\n QR CODE'}
                />
                <BigIconButton
                    name="my-location"
                    font="MaterialIcons"
                    text={'CURRENT LOCATION'}
                />
            </View>
        </View>
    )

    componentWillMount = () => {
        NfcManager.start({
            onSessionClosedIOS: () => {
                console.log('ios session closed')
            },
        })
            .then(result => {
                console.log('start OK', result)
                NfcManager.registerTagEvent(
                    tag => {
                        console.log(
                            'Parsed',
                            NdefParser.parseText(tag.ndefMessage[0])
                        )
                        if (NdefParser.parseText(tag.ndefMessage[0])) {
                            this.setState({
                                restaurantId: NdefParser.parseText(
                                    tag.ndefMessage[0]
                                ),
                            })
                        }
                    },
                    'Hold your device over the tag',
                    true
                )
            })
            .catch(error => {
                console.log('device does not support nfc!')
            })
    }

    componentWillUnmount() {
        NfcManager.stop()
        NfcManager.unregisterTagEvent()
    }

    _renderItem = ({ item }) => <FoodRenderItem item={item} />

    render() {
        const restCamis = this.state.restaurantId
        const data =
            (!!restCamis || {}) &&
            restaurants.filter(r => r.camis === restCamis)[0]
        console.log(data)
        return (
            <View flex={1} backgroundColor="white">
                {data &&
                    data.menu && (
                        <SearchTopBar>
                            <SearchBar
                                lightTheme
                                editable={!!restCamis}
                                onChangeText={() => {}}
                                onClear={() => {}}
                                placeholder="Type Here..."
                            />
                        </SearchTopBar>
                    )}
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
