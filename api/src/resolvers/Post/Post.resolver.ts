import {
    Arg,
    Ctx,
    Mutation,
    Query,
    Resolver,
} from 'type-graphql'

import { ContextType } from '../../../global/types'

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

    @Query(() => PaginatedPostsType)
    public async posts(
        @Arg('input') input: GetAllPostsArgs,
        @Ctx() context: ContextType,
    ): Promise<PaginatedPostsType> {
        return this.service.getPaginated(input, context)
    }

    @Mutation(() => CreatePostPayload)
    public async createPost(
        @Arg('input') input: CreatePostInput
    ): Promise<CreatePostPayload> {
        return this.service.create(input)
    }

}
