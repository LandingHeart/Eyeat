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
import glamorous, { View, Text } from 'glamorous-native'
import { YellowBox, Modal, Dimensions } from 'react-native'
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
import * as Icon from './lib/Icons'

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
        MenuStack: { screen: MenuStack },
        NearbyStack: { screen: NearbyStack },
    },
    {
        tabBarPosition: 'bottom',
    }
)

const VoiceModalContainer = glamorous.touchableHighlight({
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
})

export default class App extends Component<Props> {
    constructor(props) {
        super(props)
        this.state = {
            restaurantId: null,
            talking: false,
            listening: false,
            text: '',
            processAudio: null,
            showVoiceModal: false,
        }
    }

    componentWillMount() {
        SpeechToText.initialize(SpeechToTextUsername, SpeechToTextPassword)
        TextToSpeech.initialize(TextToSpeechUsername, TextToSpeechPassword)
    }

    componentDidMount() {
        StorageService.setStateUpdater(data => this.updateState(data))
        StorageService.setSpeaker(text => this.speak(text))
        StorageService.init()
        // NfcManager.start({
        //     onSessionClosedIOS: () => {
        //         console.log('ios session closed')
        //     },
        // })
        //     .then(result => {
        //         console.log('start OK', result)
        //         NfcManager.registerTagEvent(
        //             tag => {
        //                 console.log(
        //                     'Parsed',
        //                     NdefParser.parseText(tag.ndefMessage[0])
        //                 )
        //                 if (NdefParser.parseText(tag.ndefMessage[0])) {
        //                     StorageService.set(
        //                         'restaurantId',
        //                         NdefParser.parseText(tag.ndefMessage[0])
        //                     )
        //                 }
        //             },
        //             'Hold your device over the tag',
        //             true
        //         )
        //     })
        //     .catch(error => {
        //         console.log('device does not support nfc!')
        //     })
    }

    updateState = (data = {}) => {
        console.log('Change of state within the main APP ', data)
        this.setState({
            error: false,
            ...data,
        })
    }

    // componentWillUnmount() {
    //     NfcManager.stop()
    //     NfcManager.unregisterTagEvent()
    // }

    speak = text => {
        if (this.state.talking) {
            console.log('Alerady speaking, cancelling speak request of ', text)
            return
        }
        this.setState({ talking: true })
        return TextToSpeech.synthesize(text).then(() =>
            this.setState({ talking: false })
        )
    }

    startListening = () => {
        if (this.state.listening || this.state.talking) {
            console.log('Already listening/talking')
            return
        }
        this.setState({ listening: true, text: '' })
        console.log('Started listening')
        SpeechToText.startStreaming((err, text) => {
            if (err && !text) {
                console.log('No text was detected', err)
                this.setState({ listening: false, text: '' })
            } else if (!err && text) {
                this.setState({ text })
            } else {
                this.stopListening(text)
            }
        })
    }

    stopListening = textArg => {
        if (this.state.talking) {
            console.log('Already talking')
            return
        }
        SpeechToText.stopStreaming()
        console.log('Stop listening', textArg)
        text = textArg || this.state.text || ''
        this.setState({ listening: false, text, showVoiceModal: false })
        processAudio = this.processAudio(text)
    }

    processAudio = text => {
        processAudio = this.state.processAudio
        if (processAudio) {
            processAudio(text)
            this.setState({ processAudio: null })
        } else {
            console.log('No function to process text was provided')
            console.log('Text collected: ', text)
        }
    }

    render() {
        const showVoiceModal = this.state.showVoiceModal
        return (
            <View flex={1}>
                <MainStack accessible={true} />
                {showVoiceModal && (
                    <Modal
                        onShow={() =>
                            this.speak('Tap and hold anywhere to speak')
                        }
                        onRequestClose={() =>
                            StorageService.set(showVoiceModal, false)
                        }
                        onDismiss={() =>
                            StorageService.set(showVoiceModal, false)
                        }
                        transparent={true}>
                        <VoiceModalContainer
                            onPressIn={() => this.startListening()}
                            onPressOut={() => this.stopListening()}>
                            <View
                                backgroundColor="rgba(255,255,255,0.5)"
                                alignItems="center"
                                justifyContent="center"
                                width="50%"
                                height="50%">
                                <Text textColor="white">
                                    Tap and hold anywhere to speak
                                </Text>
                                <Icon.MaterialIcons
                                    name="keyboard-voice"
                                    size={140}
                                />
                            </View>
                        </VoiceModalContainer>
                    </Modal>
                )}
            </View>
        )
    }
}
