import {
    Field,
    ObjectType,
} from 'type-graphql'

import { VoteTypeEnum } from '../../../enums'
import { PostType } from '../../Post/types'

@ObjectType()
export class VoteType {

    @Field()
    id: string

    @Field()
    userId: string

    @Field()
    post: PostType

    @Field(() => VoteTypeEnum)
    type: VoteTypeEnum

    constructor(vote: VoteType) {
        this.id = vote.id
        this.userId = vote.userId
        this.type = vote.type
    }

}
