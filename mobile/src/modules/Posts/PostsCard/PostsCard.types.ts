import { VoteTypeEnum } from '../../../graphql/types'

type MetadataType = {
    voteType?: VoteTypeEnum | null
    positiveCount: number
    negativeCount: number
}

export type PostType = {
    id: string
    note: string
    date: string
    number: number
    metadata?: MetadataType | null
}

export type PostsPostProps = {
    post: PostType
    onChange: () => void
}

export type StylesPropsType = {
    active?: boolean
}
