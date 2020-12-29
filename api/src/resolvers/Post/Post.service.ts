import { Service } from 'typedi'
import {
    EntityRepository,
    Repository,
} from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { PostEntity } from '../../entities'
import { VoteTypeEnum } from '../../enums'
import { ContextType } from '../../types'
import { VoteCountType } from '../Vote/types'

import { GetAllPostsArgs } from './args'
import { CreatePostInput } from './mutations/inputs'
import { CreatePostPayload } from './mutations/payloads'
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
        input: GetAllPostsArgs,
        context: ContextType
    ) {
        const offset = input.pageNumber * DEFAULT_LIST_SIZE

        const [posts, postsAmount] = await this.repository.findAndCount({
            order: { id: 'ASC' },
            skip: offset,
            take: DEFAULT_LIST_SIZE,
        })

        return new PaginatedPostsType({
            hasNext: postsAmount > offset + DEFAULT_LIST_SIZE,
            hasPrevious: input.pageNumber !== 0,
            list: posts.map((post) => {
                const metadata = this.getPostMetadata(post, context)

                return new PostType(
                    post,
                    metadata,
                )
            }),
        })
    }

    public getPostMetadata = (
        post: PostEntity,
        context: ContextType
    ) => {
        const vote = post.votes.find((vote) => {
            return vote.userId === context.userId
        })

        const {
            negativeCount,
            positiveCount,
        } = post.votes.reduce((acc: VoteCountType, vote) => {
            if (vote.type === VoteTypeEnum.negative) {
                acc.negativeCount++
            }

            if (vote.type === VoteTypeEnum.positive) {
                acc.positiveCount++
            }

            return acc
        }, {
            negativeCount: 0,
            positiveCount: 0,
        })

        return new PostMetadataType({
            negativeCount: negativeCount,
            positiveCount: positiveCount,
            voteType: vote?.type,
        })
    }

}
