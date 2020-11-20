import {
    Field,
    ObjectType,
} from 'type-graphql'

import { VoteTypeEnum } from '../../../enums'

@ObjectType()
export class VoteType {

    @Field()
    id: string

    @Field()
    userId: string

    @Field(() => VoteTypeEnum)
    type: VoteTypeEnum

    constructor(vote: VoteType) {
        this.id = vote.id
        this.userId = vote.userId
        this.type = vote.type
    }

}
