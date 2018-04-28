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
import { YellowBox } from 'react-native'
import Home from './screens/Home'
import Search from './screens/Search'
import QRCode from './screens/QRCode'

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

const SearchStack = StackNavigator({
    Search: { screen: Search },
})

const QRCodeStack = StackNavigator({
    QRCode: { screen: QRCode },
})

const MainStack = TabNavigator({
    HomeStack: { screen: HomeStack },
    SearchStack: { screen: SearchStack },
    QRCodeStack: { screen: QRCodeStack },
})

export default class App extends Component {
    render() {
        return <MainStack />
    }
}
