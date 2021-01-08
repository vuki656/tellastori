import {
    ApolloClient,
    ApolloProvider,
    InMemoryCache,
} from '@apollo/client'
import * as React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import AppRoot from './src/AppRoot'

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'http://tellastori-api-1614044971.us-east-1.elb.amazonaws.com/', // TODO: REMOVE
})

export default function App() {
    return (
        <ApolloProvider client={client}>
            <SafeAreaProvider>
                <AppRoot />
            </SafeAreaProvider>
        </ApolloProvider>
    )
}
