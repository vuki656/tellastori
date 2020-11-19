import { gql } from '@apollo/client/core'

import { POST_PAYLOAD } from '../fragments'

export const POSTS = gql`
    query Posts($input: GetAllPostsArgs!) {
        posts(input: $input) {
            hasNext
            hasPrevious
            list {
                ...PostPayload
            }
        }
    }
    ${POST_PAYLOAD}
`
