import {
    Field,
    ObjectType,
} from 'type-graphql'

@ObjectType()
export class AdminType {
    @Field()
    isValid: boolean

    constructor(user: AdminType) {
        this.isValid = user.isValid
    }
}
