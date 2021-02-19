import { Service } from 'typedi'
import type { Repository } from 'typeorm'
import { EntityRepository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { PostEntity } from '../../entities'
import { VoteTypeEnum } from '../../enums'
import type { ContextType } from '../../types'
import type { VoteCountType } from '../Vote/types'

import type { GetAllPostsArgs as GetAllPostsArguments } from './args'
import type {
    CreatePostInput,
    DeletePostInput,
} from './mutations/inputs'
import {
    CreatePostPayload,
    DeletePostPayload,
} from './mutations/payloads'
import {
    PaginatedPostsType,
    PostType,
} from './types'
import { PostMetadataType } from './types/PostMetadata.type'

const DEFAULT_LIST_SIZE = 20

@EntityRepository()
@Service({ global: true })
export class PostService {
    constructor(
        @InjectRepository(PostEntity) private readonly repository: Repository<PostEntity>,
    ) {
    }

    public async create(input: CreatePostInput) {
        const createdPost = await this.repository.save({
            date: new Date(),
            note: input.note,
        })

        return new CreatePostPayload(createdPost)
    }

    public async getPaginated(
        input: GetAllPostsArguments,
        context: ContextType
    ) {
        const offset = input.pageNumber * DEFAULT_LIST_SIZE

        const [posts, postsAmount] = await this.repository.findAndCount({
            order: { date: 'DESC' },
            skip: offset,
            take: DEFAULT_LIST_SIZE,
        })

        return new PaginatedPostsType({
            hasNext: postsAmount > offset + DEFAULT_LIST_SIZE,
            hasPrevious: input.pageNumber !== 0,
            list: posts.map((post) => {
                const metadata = this.getMetadata(post, context)

                return new PostType(
                    post,
                    metadata,
                )
            }),
        })
    }

    public getMetadata = (
        post: PostEntity,
        context: ContextType
    ) => {
        const foundVote = post.votes.find((vote) => {
            return vote.userId === context.userId
        })

        const stats = post.votes.reduce((accumulator: VoteCountType, value) => {
            if (value.type === VoteTypeEnum.negative) {
                accumulator.negativeCount++
            }

            if (value.type === VoteTypeEnum.positive) {
                accumulator.positiveCount++
            }

            return accumulator
        }, {
            negativeCount: 0,
            positiveCount: 0,
        })

        return new PostMetadataType({
            negativeCount: stats.negativeCount,
            positiveCount: stats.positiveCount,
            voteType: foundVote?.type,
        })
    }

    public async delete(input: DeletePostInput) {
        await this.repository.delete(input.id)

        return new DeletePostPayload(input.id)
    }
}
