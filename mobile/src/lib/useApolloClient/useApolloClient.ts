import {
    ApolloClient,
    HttpLink,
    InMemoryCache,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const useApolloClient = () => {
    const httpLink = new HttpLink({
        credentials: 'same-origin',
        uri: 'http://tellastori-api-1614044971.us-east-1.elb.amazonaws.com/',
    })

    const authLink = setContext(async(operation, prevContext) => {
        const { headers } = prevContext

        const userId = await AsyncStorage.getItem('userId')

        return {
            headers: {
                ...headers,
                userId: userId,
            },
        }
    })

    return new ApolloClient({
        cache: new InMemoryCache(),
        link: authLink.concat(httpLink),
    })
}
