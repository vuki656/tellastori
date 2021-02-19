import {
    Field,
    ObjectType,
} from 'type-graphql'

@ObjectType()
export class AdminType {
    @Field()
    public isValid: boolean

    constructor(user: AdminType) {
        this.isValid = user.isValid
    }
}
