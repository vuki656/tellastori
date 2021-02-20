import { useMutation } from '@apollo/client'
import {
    Button,
    Dialog,
    DialogActions,
    TextArea,
} from '@dvukovic/dujo-ui'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import { useFormik } from 'formik'
import Cookies from 'js-cookie'
import * as React from 'react'
import * as Yup from 'yup'

import { CREATE_POST } from '../../../graphql/mutations'
import type {
    CreatePostMutation,
    CreatePostMutationVariables,
} from '../../../graphql/types'

import { DisablePostingMessage } from './HomeCreateNewPostDialog.styles'
import type { HomeCreateNewPostDialogType } from './HomeCreateNewPostDialog.types'

dayjs.extend(customParseFormat)
dayjs.extend(isSameOrAfter)

const ValidationSchema = Yup.object().shape({
    note: Yup.string()
        .min(10, 'It has to be more than 10 characters 😞')
        .max(2000, 'That\'s a long one. Make it a bit shorter 🤏')
        .required('You gotta put something in 🙃'),
})

export const HomeCreateNewPostDialog: React.FunctionComponent = () => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [lastPostDate, setLastPostDate] = React.useState<string>('')

    const [createPostMutation] = useMutation<CreatePostMutation, CreatePostMutationVariables>(CREATE_POST)

    React.useEffect(() => {
        const retrievedLastPostDate = Cookies.get('last-post-date') ?? ''

        setLastPostDate(retrievedLastPostDate)
    }, [])

    const form = useFormik<HomeCreateNewPostDialogType>({
        initialValues: { note: '' },
        onSubmit: (formValues) => {
            createPostMutation({
                refetchQueries: ['Posts'],
                variables: { input: { note: formValues.note } },
            })
                .then(() => {
                    setIsOpen(false)
                    form.resetForm()

                    const today = dayjs().format('MM-DD-YYYY')

                    setLastPostDate(today)
                    Cookies.set('last-post-date', today)
                })
                .catch(() => {
                    form.errors.note = 'You did something we didn\'t know you can do 😲. Please refresh and try again.'
                })
        },
        validateOnChange: false,
        validationSchema: ValidationSchema,
    })

    const handleCancel = () => {
        setIsOpen(false)
        form.resetForm()
    }

    const disablePosting = dayjs(lastPostDate, 'MM-DD-YYYY').format('MM-DD-YYYY') === dayjs().format('MM-DD-YYYY')

    return (
        <>
            <Button
                onClick={() => {
                    setIsOpen(true)
                }}
                variant="primary"
            >
                Post
            </Button>
            <Dialog
                isOpen={isOpen}
                title="Whats your story"
            >
                {disablePosting ?
                    (
                        <DisablePostingMessage>
                            You can only post once a day. 📅
                        </DisablePostingMessage>
                    )
                    : null}
                <form onSubmit={form.handleSubmit}>
                    <TextArea
                        error={Boolean(form.errors.note)}
                        fullWidth={true}
                        helperText={form.errors.note}
                        name="note"
                        onChange={form.handleChange}
                        rows={10}
                        value={form.values.note}
                    />
                    <DialogActions>
                        <Button
                            onClick={handleCancel}
                            variant="outlined"
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={disablePosting}
                            type="submit"
                            variant="primary"
                        >
                            Post
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}
