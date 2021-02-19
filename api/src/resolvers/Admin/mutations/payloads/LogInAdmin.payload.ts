import {
    Field,
    ObjectType,
} from 'type-graphql'

@ObjectType()
export class LogInAdminPayload {
    @Field()
    token: string

    constructor(token: string) {
        this.token = token
    }
}
