import { gql } from '@apollo/client/core'

export const VOTE_PAYLOAD = gql`
    fragment VotePayload on VoteType {
        id
        type
        userId
    }
`
