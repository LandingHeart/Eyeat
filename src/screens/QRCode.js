import React, { Component } from 'react'
import { TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native'
import glamorous, { View } from 'glamorous-native'
import { Button } from 'react-native-elements'
import QRCodeScanner from 'react-native-qrcode-scanner'

export default class QRCode extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => ({
        title: 'QRCode',
    })

    constructor(props) {
        super(props)
        this.state = {
            text: 'http://facebook.github.io/react-native/',
            show: false,
        }
    }

    onSuccess = e => {
        console.log('Successful', e)
    }

    toggleQRCode = () => {
        this.setState({
            show: !this.state.show,
        })
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.show && (
                    <QRCodeScanner
                        onRead={this.onSuccess}
                        topContent={
                            <Text style={styles.centerText}>
                                Go to{' '}
                                <Text style={styles.textBold}>
                                    wikipedia.org/wiki/QR_code
                                </Text>{' '}
                                on your computer and scan the QR code.
                            </Text>
                        }
                        bottomContent={
                            <TouchableOpacity style={styles.buttonTouchable}>
                                <Text style={styles.buttonText}>
                                    OK. Got it!
                                </Text>
                            </TouchableOpacity>
                        }
                    />
                )}
                <Button title="Toggle QRCode" onPress={this.toggleQRCode} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777',
    },
    textBold: {
        fontWeight: '500',
        color: '#000',
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)',
    },
    buttonTouchable: {
        padding: 16,
    },
})
