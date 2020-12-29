import { useQuery } from '@apollo/client'
import { Button } from '@dvukovic/dujo-ui'
import * as React from 'react'

import { PostCard } from '../../../components/PostCard'
import { POSTS } from '../../../graphql/queries'
import {
    PostsQuery,
    PostsQueryVariables,
} from '../../../graphql/types'
import { HomePostsListButtons } from '../../Home/HomePosts/HomePosts.styles'

import {
    AdminDashboardPostsList,
    AdminDashboardPostsRoot,
} from './AdminDashboardPosts.styles'

export const AdminDashboardPosts: React.FunctionComponent = () => {
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
        <AdminDashboardPostsRoot>
            <AdminDashboardPostsList>
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
            </AdminDashboardPostsList>
        </AdminDashboardPostsRoot>
    )
}
