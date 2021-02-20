import { gql } from '@apollo/client/core'

export const POST_PAYLOAD = gql`
    fragment PostPayload on PostType {
        id
        note
        date
        number
        metadata {
            voteType
            negativeCount
            positiveCount
        }
    }
`
