import {
    Field,
    InputType,
} from 'type-graphql'

@InputType()
export class LogInAdminInput {

    @Field()
    public username: string

    @Field()
    public password: string

}
