import { VoteTypeEnum } from '../../../graphql/types'

type PostType = {
    id: string,
    note: string,
    date: string,
    number: number
    voteType: VoteTypeEnum
    positiveCount: number
    negativeCount: number
}

export type HomePostsCardProps = {
    post: PostType
}
