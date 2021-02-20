import AsyncStorage from '@react-native-async-storage/async-storage'
import cuid from 'cuid'

import type { UseUserTaggingValue } from './useUserTagging.types'

export const useUserTagging = (): UseUserTaggingValue => {
    const assignId = async () => {
        const userId = await AsyncStorage.getItem('userId')

        if (!userId) {
            await AsyncStorage.setItem('userId', cuid())
        }
    }

    return { assignIdToUser: assignId }
}
