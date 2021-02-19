import {
    Field,
    InputType,
} from 'type-graphql'

@InputType()
export class CreatePostInput {
    @Field()
    note: string
}
