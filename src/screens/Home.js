import React, { Component } from 'react'
import { Button, Image, Dimensions } from 'react-native'
import glamorous, { View, Text } from 'glamorous-native'
import { SpeechToText } from 'react-native-watson'
import * as Icon from '../lib/Icons'

const Header = glamorous.view({
    maxHeight: 30,
    borderTopWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#999',
    flex: 1,
})

const Row = glamorous.view({
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 7,
})

const ImagePlaceholder = glamorous.touchableOpacity({})

export default class Home extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => ({
        title: 'EYEAT',
        tabBarIcon: ({ focused, tintColor }) => {
            const { routeName } = navigation.state
            let iconName = `ios-home${focused ? '' : '-outline'}`

            // You can return any component that you like here! We usually use an
            // icon component from react-native-vector-icons
            return <Icon.Ionicons name={iconName} size={25} color={tintColor} />
        },
    })

    render() {
        return (
            <View flex={1} backgroundColor="white">
                <Header>
                    <Text>Most Popular</Text>
                </Header>
                <Row>
                    <ImagePlaceholder
                        style={{
                            width: Dimensions.get('window').width / 3 - 7,
                            height: Dimensions.get('window').width / 3 - 7,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgb(171, 251, 174)',
                        }}>
                        <Text style={{ fontSize: 18, fontWeight: '600' }}>
                            McDonalds
                        </Text>
                    </ImagePlaceholder>
                    <ImagePlaceholder
                        style={{
                            width: Dimensions.get('window').width / 3 - 7,
                            height: Dimensions.get('window').width / 3 - 7,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgb(171, 251, 174)',
                        }}>
                        <Text style={{ fontSize: 18, fontWeight: '600' }}>
                            McDonalds
                        </Text>
                    </ImagePlaceholder>
                    <ImagePlaceholder
                        style={{
                            width: Dimensions.get('window').width / 3 - 7,
                            height: Dimensions.get('window').width / 3 - 7,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgb(171, 251, 174)',
                        }}>
                        <Text style={{ fontSize: 18, fontWeight: '600' }}>
                            McDonalds
                        </Text>
                    </ImagePlaceholder>
                </Row>
                <Header>
                    <Text>Most Friendly</Text>
                </Header>
                <Row>
                    <ImagePlaceholder
                        style={{
                            width: Dimensions.get('window').width / 3 - 7,
                            height: Dimensions.get('window').width / 3 - 7,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgb(171, 251, 174)',
                        }}>
                        <Text style={{ fontSize: 18, fontWeight: '600' }}>
                            McDonalds
                        </Text>
                    </ImagePlaceholder>
                    <ImagePlaceholder
                        style={{
                            width: Dimensions.get('window').width / 3 - 7,
                            height: Dimensions.get('window').width / 3 - 7,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgb(171, 251, 174)',
                        }}>
                        <Text style={{ fontSize: 18, fontWeight: '600' }}>
                            McDonalds
                        </Text>
                    </ImagePlaceholder>
                    <ImagePlaceholder
                        style={{
                            width: Dimensions.get('window').width / 3 - 7,
                            height: Dimensions.get('window').width / 3 - 7,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgb(171, 251, 174)',
                        }}>
                        <Text style={{ fontSize: 18, fontWeight: '600' }}>
                            McDonalds
                        </Text>
                    </ImagePlaceholder>
                </Row>
                <Header>
                    <Text>Your Friends Have Visited</Text>
                </Header>
                <Row>
                    <ImagePlaceholder
                        style={{
                            width: Dimensions.get('window').width / 3 - 7,
                            height: Dimensions.get('window').width / 3 - 7,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgb(171, 251, 174)',
                        }}>
                        <Text style={{ fontSize: 18, fontWeight: '600' }}>
                            McDonalds
                        </Text>
                    </ImagePlaceholder>
                    <ImagePlaceholder
                        style={{
                            width: Dimensions.get('window').width / 3 - 7,
                            height: Dimensions.get('window').width / 3 - 7,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgb(171, 251, 174)',
                        }}>
                        <Text style={{ fontSize: 18, fontWeight: '600' }}>
                            McDonalds
                        </Text>
                    </ImagePlaceholder>
                    <ImagePlaceholder
                        style={{
                            width: Dimensions.get('window').width / 3 - 7,
                            height: Dimensions.get('window').width / 3 - 7,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgb(171, 251, 174)',
                        }}>
                        <Text style={{ fontSize: 18, fontWeight: '600' }}>
                            McDonalds
                        </Text>
                    </ImagePlaceholder>
                </Row>
                <View flex={0.5} />
            </View>
        )
    }
}
