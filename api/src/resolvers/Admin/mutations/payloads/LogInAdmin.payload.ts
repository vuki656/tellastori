import {
    Field,
    ObjectType,
} from 'type-graphql'

@ObjectType()
export class LogInAdminPayload {

    @Field()
    public token: string

    constructor(token: string) {
        this.token = token
    }

}
