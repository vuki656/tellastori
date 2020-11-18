import { GraphQLDate } from 'graphql-iso-date'
import {
    Field,
    ObjectType,
} from 'type-graphql'

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

    constructor(post: PostType) {
        this.id = post.id
        this.note = post.note
        this.date = post.date
        this.number = post.number
    }

}
