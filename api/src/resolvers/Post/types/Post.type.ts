import { GraphQLDate } from 'graphql-iso-date'
import {
    Field,
    ObjectType,
} from 'type-graphql'

import { VoteTypeEnum } from '../../../enums'

@ObjectType()
export class PostType {

    @Field()
    id: string

    @Field()
    note: string

    @Field(() => GraphQLDate)
    date: Date

    @Field()
    number: number

    @Field({ nullable: true })
    voteType?: VoteTypeEnum

    @Field()
    positiveCount?: number

    @Field()
    negativeCount?: number

    constructor(
        post: PostType,
        voteType: VoteTypeEnum | undefined,
        positiveCount: number,
        negativeCount: number,
    ) {
        this.id = post.id
        this.note = post.note
        this.date = post.date
        this.number = post.number
        this.negativeCount = negativeCount
        this.positiveCount = positiveCount
        this.voteType = voteType
    }

}
