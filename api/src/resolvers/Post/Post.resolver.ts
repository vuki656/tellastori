import {
    Arg,
    Mutation,
    Query,
    Resolver,
} from 'type-graphql'

import { CreatePostInput } from './mutations/inputs'
import { CreatePostPayload } from './mutations/payloads'
import { PostService } from './Post.service'
import { PostType } from './types'

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

    @Query(() => [PostType])
    public async posts(): Promise<PostType[]> {
        return this.service.getAll()
    }

}
