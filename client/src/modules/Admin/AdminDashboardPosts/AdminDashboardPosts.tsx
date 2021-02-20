import {
    useMutation,
    useQuery,
} from '@apollo/client'
import {
    Button,
    IconButton,
    TrashIcon,
} from '@dvukovic/dujo-ui'
import * as React from 'react'

import { PostCard } from '../../../components/PostCard'
import { DELETE_POST } from '../../../graphql/mutations'
import { POSTS } from '../../../graphql/queries'
import type {
    DeletePostMutation,
    DeletePostMutationVariables,
    PostsQuery,
    PostsQueryVariables,
} from '../../../graphql/types'
import { HomePostsListButtons } from '../../Home/HomePosts/HomePosts.styles'

import {
    AdminDashboardPostCardActions,
    AdminDashboardPostCardRoot,
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

    const [
        deletePostMutation,
    ] = useMutation<DeletePostMutation, DeletePostMutationVariables>(DELETE_POST)

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

    const handlePostDelete = (id: string) => () => {
        void deletePostMutation({ variables: { input: { id: id } } })
            .then(() => {
                void refetch()
            })
    }

    return (
        <AdminDashboardPostsRoot>
            <AdminDashboardPostsList>
                {postsData?.posts.list.map((post) => {
                    return (
                        <AdminDashboardPostCardRoot key={post.id}>
                            <PostCard
                                onChange={refetch}
                                post={post}
                            />
                            <AdminDashboardPostCardActions>
                                <IconButton
                                    icon={<TrashIcon />}
                                    onClick={handlePostDelete(post.id)}
                                    variant="outlined"
                                />
                            </AdminDashboardPostCardActions>
                        </AdminDashboardPostCardRoot>
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
            </AdminDashboardPostsList>
        </AdminDashboardPostsRoot>
    )
}
