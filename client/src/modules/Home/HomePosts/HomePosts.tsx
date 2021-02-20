import { useQuery } from '@apollo/client'
import { Button } from '@dvukovic/dujo-ui'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import * as React from 'react'

import { PostCard } from '../../../components/PostCard'
import { POSTS } from '../../../graphql/queries'
import type {
    PostsQuery,
    PostsQueryVariables,
} from '../../../graphql/types'

import {
    HomePostsList,
    HomePostsListButtons,
    HomePostsRoot,
} from './HomePosts.styles'

dayjs.extend(advancedFormat)

export const HomePosts: React.FunctionComponent = () => {
    const [pageNumber, setPageNumber] = React.useState(0)

    const {
        data: postsData,
        refetch,
    } = useQuery<PostsQuery, PostsQueryVariables>(
        POSTS,
        { variables: { input: { pageNumber: pageNumber } } }
    )

    const handleNextClick = () => {
        setPageNumber((currentPageNumber) => {
            return currentPageNumber + 1
        })
    }

    const handlePreviousClick = () => {
        setPageNumber((currentPageNumber) => {
            return currentPageNumber - 1
        })
    }

    return (
        <HomePostsRoot>
            <HomePostsList>
                {postsData?.posts.list.map((post) => {
                    return (
                        <PostCard
                            key={post.id}
                            onChange={refetch}
                            post={post}
                        />
                    )
                })}
                <HomePostsListButtons>
                    <Button
                        disabled={!postsData?.posts.hasPrevious}
                        fullWidth={true}
                        onClick={handlePreviousClick}
                        variant="outlined"
                    >
                        Previous
                    </Button>
                    <Button
                        disabled={!postsData?.posts.hasNext}
                        fullWidth={true}
                        onClick={handleNextClick}
                    >
                        Next
                    </Button>
                </HomePostsListButtons>
            </HomePostsList>
        </HomePostsRoot>
    )
}
