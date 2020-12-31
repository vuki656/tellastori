import {
    Arg,
    Authorized,
    Ctx,
    Mutation,
    Query,
    Resolver,
} from 'type-graphql'

import { ContextType } from '../../types'

import { GetAllPostsArgs } from './args'
import {
    CreatePostInput,
    DeletePostInput,
} from './mutations/inputs'
import {
    CreatePostPayload,
    DeletePostPayload,
} from './mutations/payloads'
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

    @Authorized()
    @Mutation(() => DeletePostPayload)
    public async deletePost(
        @Arg('input') input: DeletePostInput
    ) {
        return this.service.delete(input)
    }

}
