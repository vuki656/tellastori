import { Service } from 'typedi'
import {
    EntityRepository,
    Repository,
} from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { ContextType } from '../../../global/types'
import { VoteEntity } from '../../entities'

import { VoteInput } from './mutations/inputs'
import { VotePayload } from './mutations/payloads'
import { VoteType } from './types'

@EntityRepository()
@Service({ global: true })
export class VoteService {

    constructor(
        @InjectRepository(VoteEntity) private readonly repository: Repository<VoteEntity>,
    ) {
    }

    public async create(
        input: VoteInput,
        context: ContextType
    ) {
        const createdVote = await this.repository.save({
            post: { id: input.postId },
            type: input.voteType,
            userId: context.userId,
        })

        return new VotePayload(new VoteType(createdVote))
    }

}
