import { useMutation } from '@apollo/client'
import dayjs from 'dayjs'
import * as React from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'

import { VOTE } from '../../../graphql/mutations'
import {
    VoteMutation,
    VoteMutationVariables,
    VoteTypeEnum,
} from '../../../graphql/types'

import {
    PostsPostProps,
    StylesPropsType,
} from './PostsCard.types'

export const PostsCard: React.FunctionComponent<PostsPostProps> = (props) => {
    const {
        post,
        onChange,
    } = props

    const {
        metadata,
        date,
        id,
        note,
        number,
    } = post

    const [voteMutation] = useMutation<VoteMutation, VoteMutationVariables>(VOTE)

    const handleVote = (voteType: VoteTypeEnum) => {
        if (metadata?.voteType) {
            return
        }

        voteMutation({
            variables: {
                input: {
                    postId: id,
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
        <View
            key={post.id}
            style={styles().root}
        >
            <View style={styles().content}>
                <View style={styles().topBar}>
                    <Text style={styles().number}>#{number}</Text>
                    <Text style={styles().date}>{dayjs(date).format('Do MMM YYYY')}</Text>
                </View>
                <Text style={styles().note}>
                    {note}
                </Text>
            </View>
            <View style={styles().buttonsWrapper}>
                <View style={styles({ active: metadata?.voteType === VoteTypeEnum.Positive }).button}>
                    <TouchableOpacity onPress={handlePositiveVote}>
                        <Text style={styles().likeButton}>
                            👍 Like
                            <Text style={styles().count}>
                                {' '}{metadata?.positiveCount}
                            </Text>
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles({ active: metadata?.voteType === VoteTypeEnum.Negative }).button}>
                    <TouchableOpacity onPress={handleNegativeVote}>
                        <Text style={styles().dislikeButton}>
                            👎 Dislike
                            <Text style={styles().count}>
                                {' '}{metadata?.negativeCount}
                            </Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = (stylesProps?: StylesPropsType) => StyleSheet.create({
    button: {
        borderTopColor: stylesProps?.active ? '#febb01' : '#cccccc',
        borderTopWidth: stylesProps?.active ? 2 : 1,
        flex: 1,
    },
    buttonsWrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    content: { padding: 20 },
    count: { color: '#cccccc' },
    date: { color: '#cccccc' },
    dislikeButton: {
        borderColor: '#cccccc',
        borderLeftWidth: 1,
        color: 'black',
        padding: 10,
        paddingHorizontal: 0,
        textAlign: 'center',
    },
    likeButton: {
        color: 'black',
        padding: 10,
        paddingHorizontal: 0,
        textAlign: 'center',
    },
    note: {
        lineHeight: 18,
        textAlign: 'justify',
    },
    number: { color: '#cccccc' },
    root: {
        backgroundColor: '#ffffff',
        borderColor: '#cccccc',
        borderRadius: 10,
        borderWidth: 1,
        fontSize: 18,
        marginBottom: 20,
        textAlignVertical: 'top',
        width: '100%',
    },
    topBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
    },
})
