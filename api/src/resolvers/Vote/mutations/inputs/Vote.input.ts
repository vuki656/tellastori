import {
    Field,
    InputType,
} from 'type-graphql'

import { VoteTypeEnum } from '../../../../enums'

@InputType()
export class VoteInput {
    @Field()
    postId: string

    @Field(() => VoteTypeEnum)
    voteType: VoteTypeEnum
}
