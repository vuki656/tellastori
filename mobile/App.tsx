import { ApolloProvider } from '@apollo/client'
import * as React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import AppRoot from './src/AppRoot'
import { useApolloClient } from './src/lib/useApolloClient'
import { useUserTagging } from './src/lib/useUserTagging'

export default function App() {
    const client = useApolloClient()
    const tagging = useUserTagging()

    React.useEffect(() => {
        tagging.assignIdToUser()
    }, [])

    return (
        <ApolloProvider client={client}>
            <SafeAreaProvider>
                <AppRoot />
            </SafeAreaProvider>
        </ApolloProvider>
    )
}
