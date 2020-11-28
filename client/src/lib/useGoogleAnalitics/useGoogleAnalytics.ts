import { useRouter } from 'next/router'

import * as gtag from './googleTag'

type GoogleAnalyticsHandlerType = {
    onGAVisit: () => void
    onGALeave: () => void
}

export const useGoogleAnalytics = (): GoogleAnalyticsHandlerType => {
    const router = useRouter()

    const handleRouteChange = (url: string) => {
        gtag.pageview(url)
    }

    const onVisit = () => {
        router.events.on('routeChangeComplete', handleRouteChange)
    }

    const onLeave = () => {
        router.events.off('routeChangeComplete', handleRouteChange)
    }

    return {
        onGALeave: onLeave,
        onGAVisit: onVisit,
    }
}
