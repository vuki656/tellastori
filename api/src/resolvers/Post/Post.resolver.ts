import {
    Arg,
    Mutation,
    Query,
    Resolver,
} from 'type-graphql'

import { GetAllPostsArgs } from './args'
import { CreatePostInput } from './mutations/inputs'
import { CreatePostPayload } from './mutations/payloads'
import { PostService } from './Post.service'
import {
    PaginatedPostsType,
    PostType,
} from './types'

@Resolver(() => PostType)
export class PostResolver {

    constructor(
        private readonly service: PostService,
    ) {
    }

    @Mutation(() => CreatePostPayload)
    public async createPost(
        @Arg('input') input: CreatePostInput
    ): Promise<CreatePostPayload> {
        return this.service.create(input)
    }

    @Query(() => PaginatedPostsType)
    public async posts(
        @Arg('input') input: GetAllPostsArgs
    ): Promise<PaginatedPostsType> {
        return this.service.getPaginated(input)
    }

}
