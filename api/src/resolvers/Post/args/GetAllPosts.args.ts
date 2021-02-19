import {
    Field,
    InputType,
} from 'type-graphql'

@InputType()
export class GetAllPostsArgs {
    @Field()
    pageNumber: number
}
