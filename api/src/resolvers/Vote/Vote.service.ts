import { Service } from 'typedi'
import type { Repository } from 'typeorm'
import { EntityRepository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { VoteEntity } from '../../entities'
import type { ContextType } from '../../types'

import type { VoteInput } from './mutations/inputs'
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
