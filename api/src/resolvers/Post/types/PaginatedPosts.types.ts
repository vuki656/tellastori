import {
    Field,
    ObjectType,
} from 'type-graphql'

import { PostType } from './Post.type'

@ObjectType()
export class PaginatedPostsType {
    @Field()
    hasNext: boolean

    @Field()
    hasPrevious: boolean

    @Field(() => [PostType])
    list: PostType[]

    constructor(paginatedPosts: PaginatedPostsType) {
        this.hasNext = paginatedPosts.hasNext
        this.hasPrevious = paginatedPosts.hasPrevious
        this.list = paginatedPosts.list
    }
}
