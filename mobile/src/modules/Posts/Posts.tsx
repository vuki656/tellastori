import { useQuery } from '@apollo/client'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import React from 'react'
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { POSTS } from '../../graphql/queries'
import {
    PostsQuery,
    PostsQueryVariables,
} from '../../graphql/types'

import { StylePropsType } from './Posts.types'
import { PostsCard } from './PostsCard'

dayjs.extend(advancedFormat)

export const Posts = () => {
    const [pageNumber, setPageNumber] = React.useState(0)

    const {
        data,
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
        <SafeAreaView>
            <View style={styles().root}>
                <View style={styles().titleWrapper}>
                    <Text style={styles().title}>📖 Tellastori</Text>
                </View>
                <ScrollView style={styles().postsWrapper}>
                    {data?.posts.list.map((post) => {
                        return (
                            <PostsCard
                                key={post.id}
                                onChange={refetch}
                                post={post}
                            />
                        )
                    })}
                    <View style={styles().paginationButton}>
                        <TouchableOpacity
                            disabled={!data?.posts.hasPrevious}
                            onPress={handlePreviousClick}
                        >
                            <Text style={styles({ disabled: !data?.posts.hasPrevious }).paginationButton}>
                                Previous
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            disabled={!data?.posts.hasNext}
                            onPress={handleNextClick}
                        >
                            <Text style={styles({ disabled: !data?.posts.hasNext }).paginationButton}>
                                Next
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = (styleProps?: StylePropsType) => StyleSheet.create({
    paginationButton: {
        backgroundColor: styleProps?.disabled ? '#cccccc' : '#0083ff',
        borderRadius: 7,
        color: '#ffffff',
        fontSize: 15,
        padding: 5,
        paddingHorizontal: 20,
    },
    paginationButtonsWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    postsWrapper: { padding: 15 },
    root: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: 60,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        width: '100%',
    },
    titleWrapper: {
        alignItems: 'center',
        backgroundColor: '#ffffff',
        display: 'flex',
        elevation: 6,
        flexDirection: 'row',
        height: 50,
        shadowColor: '#000',
        shadowOffset: {
            height: 3,
            width: 0,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        width: '100%',
    },
})
