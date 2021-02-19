import {
    Field,
    ObjectType,
} from 'type-graphql'

import { VoteTypeEnum } from '../../../enums'

@ObjectType()
export class PostMetadataType {
    @Field(() => VoteTypeEnum, { nullable: true })
    voteType?: VoteTypeEnum

    @Field()
    positiveCount: number

    @Field()
    negativeCount: number

    constructor(postMetadata: PostMetadataType) {
        this.voteType = postMetadata.voteType
        this.positiveCount = postMetadata.positiveCount
        this.negativeCount = postMetadata.negativeCount
    }
}
