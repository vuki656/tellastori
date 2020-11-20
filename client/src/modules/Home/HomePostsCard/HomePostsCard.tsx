import { useMutation } from '@apollo/client'
import dayjs from 'dayjs'
import * as React from 'react'

import { VOTE } from '../../../graphql/mutations'
import {
    VoteMutation,
    VoteMutationVariables,
    VoteTypeEnum,
} from '../../../graphql/types'

import {
    HomePostCardButtons,
    HomePostCardCount,
    HomePostCardDate,
    HomePostCardHeader,
    HomePostCardNote,
    HomePostCardNumber,
    HomePostsCardContent,
    HomePostsCardRoot,
    HomePostsListLeftButton,
    HomePostsListRightButton,
} from './HomePostsCard.styles'
import { HomePostsCardProps } from './HomePostsCard.types'

export const HomePostsCard: React.FunctionComponent<HomePostsCardProps> = (props) => {
    const {
        post,
        onChange,
    } = props

    const [voteMutation] = useMutation<VoteMutation, VoteMutationVariables>(VOTE)

    const handleVote = (voteType: VoteTypeEnum) => {
        if (post.metadata?.voteType) {
            return
        }

        voteMutation({
            variables: {
                input: {
                    postId: post.id,
                    voteType: voteType,
                },
            },
        })
        .then(() => {
            onChange()
        })
    }

    const handlePositiveVote = () => {
        handleVote(VoteTypeEnum.Positive)
    }

    const handleNegativeVote = () => {
        handleVote(VoteTypeEnum.Negative)
    }

    return (
        <HomePostsCardRoot key={post.id}>
            <HomePostsCardContent>
                <HomePostCardHeader>
                    <HomePostCardNumber>
                        #{post.number}
                    </HomePostCardNumber>
                    <HomePostCardDate>
                        {dayjs(post.date).format('Do MMM YYYY')}
                    </HomePostCardDate>
                </HomePostCardHeader>
                <HomePostCardNote>
                    {post.note}
                </HomePostCardNote>
            </HomePostsCardContent>
            <HomePostCardButtons>
                <HomePostsListLeftButton
                    active={post.metadata?.voteType === VoteTypeEnum.Positive}
                    fullWidth
                    onClick={handlePositiveVote}
                    variant="blank"
                >
                    👍 Yes <HomePostCardCount>{post.metadata?.positiveCount}</HomePostCardCount>
                </HomePostsListLeftButton>
                <HomePostsListRightButton
                    active={post.metadata?.voteType === VoteTypeEnum.Negative}
                    fullWidth
                    onClick={handleNegativeVote}
                    variant="blank"
                >
                    😑 No<HomePostCardCount>{post.metadata?.negativeCount}</HomePostCardCount>
                </HomePostsListRightButton>
            </HomePostCardButtons>
        </HomePostsCardRoot>
    )
}
