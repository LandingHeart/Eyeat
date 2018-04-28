import React, { Component } from 'react'
import { Text } from 'react-native'
import glamorous, { View } from 'glamorous-native'

export default class Login extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => ({
        title: 'Login',
    })
    render() {
        return (
            <View flex={1} alignItems="center" justifyContent="center">
                <Text>Login screen</Text>
            </View>
        )
    }
}
