import { useQuery } from '@apollo/client'
import dayjs from 'dayjs'
import * as React from 'react'

import { POSTS } from '../../../graphql/queries'
import { PostsQuery } from '../../../graphql/types'

import {
    HomePostCard,
    HomePostCardDate,
    HomePostCardHeader,
    HomePostCardNumber,
    HomePostsRoot,
} from './HomePosts.styles'

export const HomePosts: React.FunctionComponent = () => {
    const { data: postsData } = useQuery<PostsQuery>(POSTS)

    return (
        <HomePostsRoot>
            {postsData?.posts.map((post) => {
                return (
                    <HomePostCard key={post.id}>
                        <HomePostCardHeader>
                            <HomePostCardNumber>
                                #{post.number}
                            </HomePostCardNumber>
                            <HomePostCardDate>
                                {dayjs(post.date).format('MM-DD-YYYY')}
                            </HomePostCardDate>
                        </HomePostCardHeader>
                        {post.note}
                    </HomePostCard>
                )
            })}
        </HomePostsRoot>
    )
}
