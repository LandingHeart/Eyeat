import React, { Component } from 'react'
import { Text, Button } from 'react-native'
import glamorous, { View } from 'glamorous-native'
import { SpeechToText } from 'react-native-watson'
import { SpeechToTextUsername, SpeechToTextPassword } from '../lib/credentials'

SpeechToText.initialize(SpeechToTextUsername, SpeechToTextPassword)

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
            <View flex={1} alignItems="center" justifyContent="center">
                <Text>Home screen</Text>
                <Button
                    title="Start Recording"
                    onPress={() => this._startRecording()}
                />
                <Button
                    title="Stop Recording"
                    onPress={() => this._stopRecording()}
                />
            </View>
        )
    }
}
