import { gql } from '@apollo/client/core'

export const POST_PAYLOAD = gql`
    fragment PostPayload on PostType {
        id
        note
        date
        number
        voteType
        negativeCount
        positiveCount
    }
`
