import { useQuery } from '@apollo/client'
import dayjs from 'dayjs'
import * as React from 'react'

import { POSTS } from '../../../graphql/queries'
import {
    PostsQuery,
    PostsQueryVariables,
} from '../../../graphql/types'
import { Button } from '../../../ui-kit/components/Button'
import { Panel } from '../../../ui-kit/components/Panel'

import {
    HomePostCardDate,
    HomePostCardHeader,
    HomePostCardNumber,
    HomePostsList,
    HomePostsListButtons,
    HomePostsRoot,
} from './HomePosts.styles'

export const HomePosts: React.FunctionComponent = () => {
    const [pageNumber, setPageNumber] = React.useState(0)

    const { data: postsData } = useQuery<PostsQuery, PostsQueryVariables>(POSTS, { variables: { input: { pageNumber: pageNumber } } })

    const handleNextClick = () => {
        setPageNumber((pageNumber) => {
            return pageNumber + 1
        })
    }

    const handlePreviousClick = () => {
        setPageNumber((pageNumber) => {
            return pageNumber - 1
        })
    }

    return (
        <HomePostsRoot>
            <HomePostsList>
                {postsData?.posts.list.map((post) => {
                    return (
                        <Panel key={post.id}>
                            <HomePostCardHeader>
                                <HomePostCardNumber>
                                #{post.number}
                                </HomePostCardNumber>
                                <HomePostCardDate>
                                    {dayjs(post.date).format('MM-DD-YYYY')}
                                </HomePostCardDate>
                            </HomePostCardHeader>
                            {post.note}
                        </Panel>
                    )
                })}
                <HomePostsListButtons>
                    <Button
                        disabled={!postsData?.posts.hasPrevious}
                        fullWidth
                        onClick={handlePreviousClick}
                        variant="outlined"
                    >
                        Previous
                    </Button>
                    <Button
                        disabled={!postsData?.posts.hasNext}
                        fullWidth
                        onClick={handleNextClick}
                    >
                        Next
                    </Button>
                </HomePostsListButtons>
            </HomePostsList>
        </HomePostsRoot>
    )
}
