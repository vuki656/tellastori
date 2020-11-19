import { Service } from 'typedi'
import {
    EntityRepository,
    Repository,
} from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { PostEntity } from '../../entities'

import { GetAllPostsArgs } from './args'
import { CreatePostInput } from './mutations/inputs'
import { CreatePostPayload } from './mutations/payloads'
import { PostType } from './types'

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

    public async getAll(input: GetAllPostsArgs) {
        const offset = input.pageNumber * DEFAULT_LIST_SIZE

        const [posts] = await this.repository.findAndCount({
            skip: offset,
            take: DEFAULT_LIST_SIZE,
        })

        return posts.map((post) => {
            return new PostType(post)
        })
    }

}
