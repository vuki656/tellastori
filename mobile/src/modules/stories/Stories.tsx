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

import { StylePropsType } from './Stories.types'

dayjs.extend(advancedFormat)

const buttonStyle = {
    backgroundColor: '#0083ff',
    borderRadius: 7,
    color: '#ffffff',
    fontSize: 15,
    padding: 5,
    paddingHorizontal: 20,
}

const styles = (styleProps?: StylePropsType) => StyleSheet.create({
    buttonContainer: { flex: 1 },
    buttonSection: {
        display: 'flex',
        flexDirection: 'row',
    },
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    leftButton: {
        ...buttonStyle,
        backgroundColor: styleProps?.disabled ? '#cccccc' : '#0083ff',
    },
    postCard: {
        backgroundColor: '#ffffff',
        borderColor: '#cccccc',
        borderRadius: 10,
        borderWidth: 1,
        fontSize: 18,
        marginBottom: 20,
        textAlignVertical: 'top',
        width: '100%',
    },
    postDate: { color: '#cccccc' },
    postNote: {
        lineHeight: 18,
        paddingHorizontal: 20,
        textAlign: 'justify',
    },
    postNumber: { color: '#cccccc' },
    postTopBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        paddingHorizontal: 15,
    },
    postsRoot: { padding: 15 },
    rightButton: {
        ...buttonStyle,
        backgroundColor: styleProps?.disabled ? '#cccccc' : '#0083ff',
        marginLeft: 10,
    },
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
    titleSection: {
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
    voteButton: {
        borderColor: '#cccccc',
        borderWidth: 1,
        color: 'black',
        padding: 5,
        paddingHorizontal: 0,
        textAlign: 'center',
    },
    voteButtonSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
})

export const Stories = () => {
    const [pageNumber, setPageNumber] = React.useState(0)

    const { data } = useQuery<PostsQuery, PostsQueryVariables>(
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
                <View style={styles().titleSection}>
                    <Text style={styles().title}>📖 Tellastori</Text>
                </View>
                <ScrollView style={styles().postsRoot}>
                    {data?.posts.list.map((post) => {
                        return (
                            <View
                                key={post.id}
                                style={styles().postCard}
                            >
                                <View style={styles().postTopBar}>
                                    <Text style={styles().postNumber}>#{post.number}</Text>
                                    <Text style={styles().postDate}>{dayjs(post.date).format('Do MMM YYYY')}</Text>
                                </View>
                                <Text style={styles().postNote}>
                                    {post.note}
                                </Text>
                                <View style={styles().container}>
                                    <View style={styles().buttonContainer}>
                                        <TouchableOpacity>
                                            <Text style={styles().voteButton}>
                                                👍 Like {post.metadata?.positiveCount}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles().buttonContainer}>
                                        <TouchableOpacity>
                                            <Text style={styles().voteButton}>
                                                Dislike 👎 {post.metadata?.negativeCount}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )
                    })}
                    <View style={styles().buttonSection}>
                        <TouchableOpacity
                            disabled={!data?.posts.hasPrevious}
                            onPress={handlePreviousClick}
                        >
                            <Text style={styles({ disabled: !data?.posts.hasPrevious }).leftButton}>
                                Previous
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            disabled={!data?.posts.hasNext}
                            onPress={handleNextClick}
                        >
                            <Text style={styles({ disabled: !data?.posts.hasNext }).rightButton}>
                                Next
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}
