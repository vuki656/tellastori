import {
    Field,
    InputType,
} from 'type-graphql'

@InputType()
export class LogInAdminInput {
    @Field()
    username: string

    @Field()
    password: string
}
