import {
    Field,
    ObjectType,
} from 'type-graphql'

@ObjectType()
export class DeletePostPayload {

    @Field()
    id: string

    constructor(id: string) {
        this.id = id
    }

}
