import {
    Arg,
    Ctx,
    Mutation,
    Resolver,
} from 'type-graphql'

import { ContextType } from '../../../global/types'

import { VoteInput } from './mutations/inputs'
import { VotePayload } from './mutations/payloads'
import { VoteType } from './types'
import { VoteService } from './Vote.service'

@Resolver(() => VoteType)
export class VoteResolver {

    constructor(
        private readonly service: VoteService,
    ) {
    }

    @Mutation(() => VotePayload)
    public async vote(
        @Arg('input') input: VoteInput,
        @Ctx() context: ContextType,
    ): Promise<VotePayload> {
        return this.service.create(input, context)
    }

}
