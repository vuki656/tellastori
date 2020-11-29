import { ApolloProvider } from '@apollo/client'
import {
    createTheme,
    GlobalStyles,
    ThemeProvider,
} from '@dvukovic/dujo-ui'
import NextApp, { AppProps } from 'next/app'
import React from 'react'

import { useApolloClient } from '../lib/useApolloClient'
import { useGoogleAnalytics } from '../lib/useGoogleAnalitics'
import { useUserTagging } from '../lib/useUserTagging'

const App = (props: AppProps): JSX.Element => {
    const {
        Component,
        pageProps,
    } = props

    const theme = createTheme()

    const client = useApolloClient(pageProps.initialApolloState)

    const {
        onGAVisit,
        onGALeave,
    } = useGoogleAnalytics()

    const { assignIdToUser } = useUserTagging()

    React.useEffect(() => {
        assignIdToUser()
        onGAVisit()

        return () => {
            onGALeave()
        }
    }, [assignIdToUser, onGALeave, onGAVisit])

    return (
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
                <GlobalStyles />
                <Component {...pageProps} />
            </ThemeProvider>
        </ApolloProvider>
    )
}

class Root extends NextApp {

    // eslint-disable-next-line require-await
    static async getInitialProps() {
        return { pageProps: {} }
    }

    public render(): JSX.Element {
        return (
            <App {...this.props} />
        )
    }

}

export default Root
