import { ApolloProvider } from '@apollo/client'
import {
    createTheme,
    GlobalStyles,
    ThemeProvider,
} from '@dvukovic/dujo-ui'
import type { AppProps } from 'next/app'
import NextApp from 'next/app'
import { useRouter } from 'next/router'
import React from 'react'

import { Authentication } from '../components/Authentication'
import { useApolloClient } from '../lib/useApolloClient'
import { useGoogleAnalytics } from '../lib/useGoogleAnalitics'
import { useUserTagging } from '../lib/useUserTagging'
import { AdminDashboardMenu } from '../modules/Admin/AdminDashboardMenu'

const App = (props: AppProps): JSX.Element => {
    const {
        Component,
        pageProps,
    } = props

    const theme = createTheme()
    const router = useRouter()

    const client = useApolloClient(pageProps.initialApolloState)

    const {
        onGALeave,
        onGAVisit,
    } = useGoogleAnalytics()

    const { assignIdToUser } = useUserTagging()

    React.useEffect(() => {
        assignIdToUser()
        onGAVisit()

        return () => {
            onGALeave()
        }
    }, [assignIdToUser, onGALeave, onGAVisit])

    let RenderComponent = <Component {...pageProps} />

    if (router.pathname.includes('dashboard')) {
        RenderComponent = (
            <Authentication>
                <AdminDashboardMenu />
                <Component {...pageProps} />
            </Authentication>
        )
    }

    return (
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
                <GlobalStyles />
                {RenderComponent}
            </ThemeProvider>
        </ApolloProvider>
    )
}

class Root extends NextApp {
    // eslint-disable-next-line require-await, @typescript-eslint/require-await
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
