import { useMutation } from '@apollo/client'
import AsyncStorage from '@react-native-async-storage/async-storage'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import { useFormik } from 'formik'
import React from 'react'
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import * as Yup from 'yup'

import { CREATE_POST } from '../../graphql/mutations'
import type {
    CreatePostMutation,
    CreatePostMutationVariables,
} from '../../graphql/types'

import type {
    PostFormTypes,
    StylePropsType,
} from './Post.types'

dayjs.extend(customParseFormat)
dayjs.extend(isSameOrAfter)

const ValidationSchema = Yup.object().shape({
    note: Yup.string()
        .min(10, 'It has to be more than 10 characters 😞')
        .max(2000, 'That\'s a long one. Make it a bit shorter 🤏')
        .required('You gotta put something in 🙃'),
})

const styles = (styleProps?: StylePropsType) => StyleSheet.create({
    button: {
        backgroundColor: styleProps?.disablePosting ? '#0083ff' : '#cccccc',
        borderRadius: 7,
        color: '#ffffff',
        fontSize: 15,
        padding: 5,
        paddingHorizontal: 15,
    },
    message: {
        marginTop: 20,
        textAlign: 'center',
    },
    messageSection: { paddingHorizontal: 40 },
    root: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
    textField: {
        backgroundColor: '#ffffff',
        borderColor: '#cccccc',
        borderRadius: 10,
        borderWidth: 1,
        fontSize: 18,
        height: '50%',
        marginBottom: 20,
        padding: 20,
        textAlignVertical: 'top',
        width: '95%',
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 20,
    },
})

export const CreateNewPost = () => {
    const [lastPostDate, setLastPostDate] = React.useState<string>('')

    const [createPostMutation] = useMutation<CreatePostMutation, CreatePostMutationVariables>(CREATE_POST)

    React.useEffect(() => {
        void AsyncStorage.getItem('last-post-date')
            .then((receivedLastPostDate) => {
                setLastPostDate(receivedLastPostDate ?? '')
            })
    }, [])

    const form = useFormik<PostFormTypes>({
        initialValues: { note: '' },
        onSubmit: (formValues) => {
            createPostMutation({ variables: { input: { note: formValues.note } } })
                .then(() => {
                    form.resetForm()

                    const today = dayjs().format('MM-DD-YYYY')

                    setLastPostDate(today)
                    void AsyncStorage.setItem('last-post-date', today)
                })
                .catch(() => {
                    form.errors.note = 'You did something we didn\'t know you can do 😲. Please refresh and try again.'
                })
        },
        validateOnChange: false,
        validationSchema: ValidationSchema,
    })

    // NOTE: DAYJS COMPARISON FUNCTION DOESN'T WORK WITH SAFARI
    const disablePosting = dayjs(lastPostDate, 'MM-DD-YYYY').format('MM-DD-YYYY') === dayjs().format('MM-DD-YYYY')

    return (
        <View style={styles().root}>
            <Text style={styles().title}>
                Post Your Story
            </Text>
            <TextInput
                multiline={true}
                onChangeText={form.handleChange('note')}
                style={styles().textField}
                value={form.values.note}
            />
            <TouchableOpacity
                disabled={disablePosting}
                onPress={() => {
                    form.handleSubmit()
                }}
            >
                <Text style={styles({ disablePosting: disablePosting }).button}>
                    Post
                </Text>
            </TouchableOpacity>
            <View style={styles().messageSection}>
                {disablePosting
                    ? (
                        <Text style={styles().message}>
                            📅 You can only post once a day.
                        </Text>
                    )
                    : null}
                {form.errors.note
                    ? (
                        <Text style={styles().message}>
                            {form.errors.note}
                        </Text>
                    )
                    : null}
            </View>
        </View>
    )
}
