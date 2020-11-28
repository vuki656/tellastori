import { useMutation } from '@apollo/client'
import {
    Button,
    Dialog,
    DialogActions,
    TextArea,
} from '@dvukovic/dujo-ui'
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import { useFormik } from 'formik'
import * as React from 'react'
import * as Yup from 'yup'

import { CREATE_POST } from '../../../graphql/mutations'
import {
    CreatePostMutation,
    CreatePostMutationVariables,
} from '../../../graphql/types'

import { DisablePostingMessage } from './HomeCreateNewPostDialog.styles'
import { HomeCreateNewPostDialogType } from './HomeCreateNewPostDialog.types'

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
        setLastPostDate(localStorage.getItem('lastPostDate') ?? '')
    }, [])

    const form = useFormik<HomeCreateNewPostDialogType>({
        initialValues: { note: '' },
        onSubmit: (formValues) => handleSubmit(formValues),
        validateOnChange: false,
        validationSchema: ValidationSchema,
    })

    const handleSubmit = (formValues: HomeCreateNewPostDialogType) => {
        createPostMutation({
            refetchQueries: ['Posts'],
            variables: { input: { note: formValues.note } },
        })
        .then(() => {
            setIsOpen(false)
            form.resetForm()

            setLastPostDate(dayjs().format('MM-DD-YYYY'))
            localStorage.setItem('lastPostDate', dayjs().format('MM-DD-YYYY'))
        })
        .catch(() => {
            form.errors.note = 'You did something we didn\'t know you can do 😲. Please refresh and try again.'
        })
    }

    const handleCancel = () => {
        setIsOpen(false)
        form.resetForm()
    }

    const disablePosting = dayjs(lastPostDate).isSameOrAfter(dayjs().format('MM-DD-YYYY'), 'day')

    return (
        <>
            <Button
                onClick={() => setIsOpen(true)}
                variant="primary"
            >
                Post
            </Button>
            <Dialog
                isOpen={isOpen}
                title="Whats your story"
            >
                {disablePosting ? (
                    <DisablePostingMessage>
                        You can only post once a day. 📅
                    </DisablePostingMessage>
                ) : null}
                <form onSubmit={form.handleSubmit}>
                    <TextArea
                        error={Boolean(form.errors.note)}
                        fullWidth
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
