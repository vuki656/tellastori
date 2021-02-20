import { gql } from '@apollo/client/core'

import { VOTE_PAYLOAD } from '../fragments'

export const VOTE = gql`
    mutation Vote($input: VoteInput!) {
        vote(input: $input) {
            vote {
                ...VotePayload
            }
        }
    }
    ${VOTE_PAYLOAD}
`
