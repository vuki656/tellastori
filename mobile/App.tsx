import {
    ApolloClient,
    ApolloProvider,
    InMemoryCache,
} from '@apollo/client'
import * as React from 'react'

import AppRoot from './src/AppRoot'

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'http://localhost:8080',
})

export default function App() {
    return (
        <ApolloProvider client={client}>
            <AppRoot />
        </ApolloProvider>
    )
}
