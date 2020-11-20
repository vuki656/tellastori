import { useQuery } from '@apollo/client'
import { Button } from '@dvukovic/dujo-ui'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import * as React from 'react'

import { POSTS } from '../../../graphql/queries'
import {
    PostsQuery,
    PostsQueryVariables,
} from '../../../graphql/types'
import { HomePostsCard } from '../HomePostsCard'

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
                        <HomePostsCard
                            key={post.id}
                            onChange={refetch}
                            post={post}
                        />
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
