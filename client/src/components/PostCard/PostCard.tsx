import { useMutation } from '@apollo/client'
import dayjs from 'dayjs'
import * as React from 'react'

import { VOTE } from '../../graphql/mutations'
import {
    VoteMutation,
    VoteMutationVariables,
    VoteTypeEnum,
} from '../../graphql/types'

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
} from './PostCard.styles'
import { HomePostsCardProps } from './PostCard.types'

export const PostCard: React.FunctionComponent<HomePostsCardProps> = (props) => {
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
        <HomePostsCardRoot>
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
                    <span style={{ paddingRight: '10px' }}>👍</span>
                    <span style={{ paddingRight: '10px' }}>Approve</span>
                    <HomePostCardCount>{post.metadata?.positiveCount}</HomePostCardCount>
                </HomePostsListLeftButton>
                <HomePostsListRightButton
                    active={post.metadata?.voteType === VoteTypeEnum.Negative}
                    fullWidth
                    onClick={handleNegativeVote}
                    variant="blank"
                >
                    <span style={{ paddingRight: '10px' }}>😑</span>
                    <span style={{ paddingRight: '10px' }}>No</span>
                    <HomePostCardCount>{post.metadata?.negativeCount}</HomePostCardCount>
                </HomePostsListRightButton>
            </HomePostCardButtons>
        </HomePostsCardRoot>
    )
}
