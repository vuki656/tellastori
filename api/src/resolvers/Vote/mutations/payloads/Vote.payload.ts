import {
    Field,
    ObjectType,
} from 'type-graphql'

import { VoteType } from '../../types'

@ObjectType()
export class VotePayload {

    @Field()
    vote: VoteType

    constructor(vote: VoteType) {
        this.vote = vote
    }

}
