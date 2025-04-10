/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */
/* ts-disable */

import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export const GA_TRACKING_ID = publicRuntimeConfig.GA_TRACKING_ID

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
    window.gtag('config', GA_TRACKING_ID, { page_path: url })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
    action,
    category,
    label,
    value,
}) => {
    window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
    })
}
