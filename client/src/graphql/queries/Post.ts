import { gql } from '@apollo/client/core'

import { POST_PAYLOAD } from '../fragments'

export const POSTS = gql`
    query Posts {
        posts {
            ...PostPayload
        }
    }
    ${POST_PAYLOAD}
`
