import { gql } from '@apollo/client/core'

import { POST_PAYLOAD } from '../fragments'

export const CREATE_POST = gql`
    mutation CreatePost($input: CreatePostInput!) {
        createPost(input: $input) {
            post {
                ...PostPayload
            }
        }
    }
    ${POST_PAYLOAD}
`

