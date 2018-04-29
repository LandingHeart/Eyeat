/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
    StackNavigator,
    TabNavigator,
    DrawerNavigator,
    withNavigation,
} from 'react-navigation'
import glamorous, { View } from 'glamorous-native'
import { YellowBox } from 'react-native'
import StorageService from './lib/StorageService'
import Home from './screens/Home'
import Menu from './screens/Menu'
import Nearby from './screens/Nearby'
import QRCode from './screens/QRCode'
import NfcManager, { NdefParser } from 'react-native-nfc-manager'
import { SpeechToText, TextToSpeech } from 'react-native-watson'
import {
    SpeechToTextUsername,
    SpeechToTextPassword,
    TextToSpeechUsername,
    TextToSpeechPassword,
} from './lib/credentials'

YellowBox.ignoreWarnings([
    'Warning: isMounted(...) is deprecated',
    'Module RCTImageLoader',
    'Module RNTextToSpeech requires',
    'Module RNSpeechToText requires',
    'Module RNToneAnalyzer requires',
    'Module RNNaturalLanguageUnderstanding requires',
    'Module RNConversation requires',
])

type Props = {}

const HomeStack = StackNavigator({
    Home: { screen: Home },
})

const MenuStack = StackNavigator({
    Menu: { screen: Menu },
})

const NearbyStack = StackNavigator({
    Nearby: { screen: Nearby },
})

const QRCodeStack = StackNavigator({
    QRCode: { screen: QRCode },
})

const MainStack = TabNavigator(
    {
        HomeStack: { screen: HomeStack },
        NearbyStack: { screen: NearbyStack },
        MenuStack: { screen: MenuStack },
    },
    {
        tabBarPosition: 'bottom',
    }
)

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            restaurantId: null,
        }
    }

    componentWillMount() {
        SpeechToText.initialize(SpeechToTextUsername, SpeechToTextPassword)
        TextToSpeech.initialize(TextToSpeechUsername, TextToSpeechPassword)
    }

    componentDidMount() {
        StorageService.setStateUpdater(data => this.updateState(data))
        StorageService.init()
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
                            StorageService.set(
                                'restaurantId',
                                NdefParser.parseText(tag.ndefMessage[0])
                            )
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

    updateState = (data = {}) => {
        console.log('Change of state within the main APP ', data)
        this.setState({
            error: false,
            ...data,
        })
    }

    componentWillUnmount() {
        NfcManager.stop()
        NfcManager.unregisterTagEvent()
    }

    render() {
        return (
            <View flex={1}>
                <MainStack accessible={true} />
            </View>
        )
    }
}
