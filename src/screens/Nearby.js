import React, { Component } from 'react'
import { FlatList } from 'react-native'
import glamorous, { View, Text } from 'glamorous-native'
import { SearchBar } from 'react-native-elements'
import restaurants from '../data/restaurants'
import RestaurantRenderItem from '../components/RestaurantRenderItem'
import { TextToSpeech, SpeechToText } from 'react-native-watson'
import { SpeechToTextUsername, SpeechToTextPassword } from '../lib/credentials'
import StorageService from '../lib/StorageService'
import * as Icon from '../lib/Icons'

const SearchTopBar = glamorous.touchableOpacity({
    width: '100%',
})

const ResultsContainer = glamorous.view({
    flex: 1,
    alignItems: 'stretch',
})

export default class Nearby extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => ({
        title: 'Nearby',
        tabBarIcon: ({ focused, tintColor }) => {
            const { routeName } = navigation.state
            let iconName = `ios-pin${focused ? '' : '-outline'}`

            // You can return any component that you like here! We usually use an
            // icon component from react-native-vector-icons
            return <Icon.Ionicons name={iconName} size={25} color={tintColor} />
        },
    })

    _renderItem = ({ item }) => <RestaurantRenderItem item={item} />

    startVoice = () => {
        if (StorageService.get().useVoice === undefined) {
            console.log('Asking user if they want to use voice')
            let count = 0
            TextToSpeech.synthesize(
                'Hello. Would you like to search using your voice?'
            ).then(res => {
                console.log('Finished speaking', res)
                if (res) {
                    this._startRecording((error, text) => {
                        console.log('Started recording', text)
                        if (count === 0) {
                            if (error || !text) {
                                this._stopRecording()
                            } else if (
                                text
                                    .toLowerCase()
                                    .split(/ /g)
                                    .includes('no')
                            ) {
                                StorageService.set('useVoice', false)
                                this._stopRecording()
                            } else {
                                TextToSpeech.synthesize(
                                    'You can search by category or a specific plate'
                                )
                            }
                            count++
                        } else {
                            //Remove the first word that was recognized
                            this.filterWithVoice(
                                text
                                    .split(/ /g)
                                    .slice(1)
                                    .join(' ')
                            )
                        }
                    })
                }
            })
        }
    }

    filterWithVoice = text => {
        console.log('Text to filter: ', text)
    }

    _startRecording = callback => {
        SpeechToText.startStreaming((error, text) => callback(error, text))
    }

    _stopRecording = () => {
        SpeechToText.stopStreaming()
        console.log('Stopped streaming/recording')
    }

    render() {
        const data = restaurants
        const useVoice =
            StorageService.get().useVoice === undefined ||
            StorageService.get().useVoice
        return (
            <View flex={1}>
                <SearchTopBar
                    onPress={() => useVoice && this.startVoice()}
                    pointerEvents={(useVoice && 'auto') || 'box-none'}>
                    <SearchBar
                        lightTheme
                        editable={useVoice === false}
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
