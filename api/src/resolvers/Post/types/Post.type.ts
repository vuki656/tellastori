import {
    Field,
    ObjectType
} from "type-graphql"

@ObjectType()
export class PostType {

    @Field()
    public id: string

    @Field()
    public note: string

    constructor(post: PostType) {
        this.id = post.id
        this.note = post.note
    }

}
