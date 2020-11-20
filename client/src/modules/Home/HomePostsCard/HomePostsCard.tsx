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
    const { post } = props

    const [voteMutation] = useMutation<VoteMutation, VoteMutationVariables>(VOTE)

    const handlePositiveVote = () => {
        voteMutation({
            variables: {
                input: {
                    postId: post.id,
                    voteType: VoteTypeEnum.Positive,
                },
            },
        })
    }

    const handleNegativeVote = () => {
        voteMutation({
            variables: {
                input: {
                    postId: post.id,
                    voteType: VoteTypeEnum.Negative,
                },
            },
        })
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
                    active={post.voteType === VoteTypeEnum.Positive}
                    fullWidth
                    onClick={handlePositiveVote}
                    variant="blank"
                >
                    👍 Yes <HomePostCardCount>{post.positiveCount}</HomePostCardCount>
                </HomePostsListLeftButton>
                <HomePostsListRightButton
                    active={post.voteType === VoteTypeEnum.Negative}
                    fullWidth
                    onClick={handleNegativeVote}
                    variant="blank"
                >
                    😑 No<HomePostCardCount>{post.negativeCount}</HomePostCardCount>
                </HomePostsListRightButton>
            </HomePostCardButtons>
        </HomePostsCardRoot>
    )
}
