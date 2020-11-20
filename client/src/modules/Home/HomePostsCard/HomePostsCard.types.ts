import { VoteTypeEnum } from '../../../graphql/types'

type PostMetadataType = {
    voteType?: VoteTypeEnum | null
    positiveCount: number
    negativeCount: number
}

type PostType = {
    id: string,
    note: string,
    date: string,
    number: number
    metadata?: PostMetadataType
}

export type HomePostsCardProps = {
    post: PostType,
    onChange: () => void
}
