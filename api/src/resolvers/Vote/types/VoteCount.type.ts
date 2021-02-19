import {
    Field,
    ObjectType,
} from 'type-graphql'

@ObjectType()
export class VoteCountType {
    @Field()
    negativeCount: number

    @Field()
    positiveCount: number

    constructor(voteCount: VoteCountType) {
        this.positiveCount = voteCount.positiveCount
        this.negativeCount = voteCount.negativeCount
    }
}
