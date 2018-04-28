import { AsyncStorage } from 'react-native'

const instance = {}

export default class CookieService {
    static init() {
        return AsyncStorage.getItem('cookie').then(cookie => {
            if (cookie) {
                instance = JSON.parse(cookie)
                return instance
            } else {
                instance = {}
                return instance
            }
        })
    }

    static get() {
        if (instance) return instance
        else {
            AsyncStorage.getItem('cookie').then(cookie => {
                instance = JSON.parse(cookie)
                return instance
            })
        }
    }

    static set(key, value) {
        if (key && value) {
            if (instance) {
                if (instance[key] === value) {
                    //This item was already set previously
                    //Prevent unnecessary setItem in AsyncStorage
                    return Promise.resolve(ITEM_WAS_ALREADY_SET)
                }
                instance[key] = value
                return AsyncStorage.setItem('cookie', JSON.stringify(instance))
            } else {
                instance = { [key]: value }
                return AsyncStorage.setItem('cookie', JSON.stringify(instance))
            }
        }
    }

    static clean() {
        instance = {}
        return AsyncStorage.setItem('cookie', JSON.stringify(instance))
    }
}
