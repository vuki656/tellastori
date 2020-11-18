import {
    Field,
    ObjectType,
} from 'type-graphql'

import { PostType } from '../../types'

@ObjectType()
export class CreatePostPayload {

    @Field()
    post: PostType

    constructor(post: PostType) {
        this.post = post
    }

}
