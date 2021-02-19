import {
    Field,
    InputType,
} from 'type-graphql'

@InputType()
export class VerifyAdminInput {
    @Field()
    token: string
}
