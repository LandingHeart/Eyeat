import React, { Component } from 'react'
import { Button } from 'react-native'
import glamorous, { View, Text } from 'glamorous-native'
import { SpeechToText } from 'react-native-watson'
import { SpeechToTextUsername, SpeechToTextPassword } from '../lib/credentials'
import * as Icon from '../lib/Icons'

SpeechToText.initialize(SpeechToTextUsername, SpeechToTextPassword)

const BigIconButtonContainer = glamorous.touchableOpacity({
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
})

const BigIconButton = ({ font, name, text }) => {
    const BIcon = Icon[font]
    return (
        <BigIconButtonContainer>
            <BIcon name={name} size={100} style={{ paddingBottom: 20 }} />
            <Text textAlign="center" fontSize={18}>
                {text}
            </Text>
        </BigIconButtonContainer>
    )
}

export default class Home extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => ({
        title: 'Home',
    })

    _startRecording = () => {
        SpeechToText.startStreaming((error, text) => {
            console.log('Stream response: ', text)
        })
    }

    _stopRecording = () => {
        SpeechToText.stopStreaming()
        console.log('Stopped streaming/recording')
    }
    render() {
        return (
            <View flex={1} backgroundColor="white">
                <View flex={1} alignItems="center" justifyContent="center">
                    <Text textAlign="center" fontSize={17} fontWeight="600">
                        <Text>To get to the menu of the restaurant{'\n'}</Text>
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
            </View>
        )
    }
}
