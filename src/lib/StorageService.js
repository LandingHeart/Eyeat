import { AsyncStorage } from 'react-native'

const instance = {}

var updateState = () => {}

var speaker = () => {}

export default class StorageService {
    static init() {
        return AsyncStorage.getItem('storage').then(storage => {
            if (storage) {
                instance = JSON.parse(storage)
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
            AsyncStorage.getItem('storage').then(storage => {
                instance = JSON.parse(storage)
                return instance
            })
        }
    }

    static updateManyNonAsync(elements) {
        for (const element in elements) {
            if (elements.hasOwnProperty(element)) {
                instance[element] = elements[element]
            }
        }
        updateState(instance)
    }

    static speak(text) {
        return speaker(text)
    }

    static set(key, value) {
        if (key && value !== undefined) {
            if (instance) {
                if (instance[key] === value) {
                    //This item was already set previously
                    //Prevent unnecessary setItem in AsyncStorage
                    return Promise.resolve('ITEM_WAS_ALREADY_SET')
                }
                instance[key] = value
                updateState(instance)
                return AsyncStorage.setItem('storage', JSON.stringify(instance))
            } else {
                instance = { [key]: value }
                updateState(instance)
                return AsyncStorage.setItem('storage', JSON.stringify(instance))
            }
        }
    }

    static clean() {
        instance = {}
        updateState(instance)
        return AsyncStorage.setItem('storage', JSON.stringify(instance))
    }

    static setStateUpdater = f => {
        updateState = f
    }

    static setSpeaker(f) {
        speaker = f
    }
}
