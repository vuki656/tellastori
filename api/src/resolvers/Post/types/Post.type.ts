import { GraphQLDate } from 'graphql-iso-date'
import {
    Field,
    ObjectType,
} from 'type-graphql'

import { PostEntity } from '../../../entities'
import { VoteType } from '../../Vote/types'

import { PostMetadataType } from './PostMetadata.type'

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

    @Field(() => [VoteType])
    votes: VoteType[]

    @Field(() => PostMetadataType)
    metadata?: PostMetadataType

    constructor(
        post: PostEntity,
        metadata: PostMetadataType,
    ) {
        this.id = post.id
        this.note = post.note
        this.date = post.date
        this.number = post.number
        this.metadata = metadata
    }

}
