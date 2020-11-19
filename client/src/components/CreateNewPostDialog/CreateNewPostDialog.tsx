import { useMutation } from '@apollo/client'
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import { useFormik } from 'formik'
import * as React from 'react'
import { useToggle } from 'react-use'

import { CREATE_POST } from '../../graphql/mutations'
import {
    CreatePostMutation,
    CreatePostMutationVariables,
} from '../../graphql/types'
import { Button } from '../../ui-kit/components/Button'
import { Dialog } from '../../ui-kit/components/Dialog'
import { DialogActions } from '../../ui-kit/components/DialogActions'
import { TextArea } from '../../ui-kit/components/TextArea'

import { DisablePostingMessage } from './CreateNewPostDialog.styles'
import { CreateNewPostDialogType } from './CreateNewPostDialog.types'

dayjs.extend(isSameOrAfter)

export const CreateNewPostDialog: React.FunctionComponent = () => {
    const [isOpen, toggleIsOpen] = useToggle(false)
    const [lastPostDate, setLastPostDate] = React.useState<string>('')

    const [createPostMutation] = useMutation<CreatePostMutation, CreatePostMutationVariables>(CREATE_POST)

    React.useEffect(() => {
        setLastPostDate(localStorage.getItem('last_post_date') ?? '')
    }, [])

    const form = useFormik<CreateNewPostDialogType>({
        initialValues: { note: '' },
        onSubmit: (formValues) => {
            createPostMutation({ variables: { input: { note: formValues.note } } })
            .then(() => {
                toggleIsOpen()
                form.resetForm()
                setLastPostDate(dayjs().format('MM-DD-YYYY'))
                localStorage.setItem('last_post_date', dayjs().format('MM-DD-YYYY'))
            })
        },
    })

    const handleCancel = () => {
        toggleIsOpen()
        form.resetForm()
    }

    const disablePosting = dayjs(lastPostDate).isSameOrAfter(dayjs().format('MM-DD-YYYY'), 'day')

    return (
        <>
            <Button
                onClick={toggleIsOpen}
                variant="primary"
            >
                Post
            </Button>
            <Dialog
                isOpen={isOpen}
                title="Post a confession"
            >
                <form onSubmit={form.handleSubmit}>
                    <TextArea
                        fullWidth
                        label="Your confession"
                        maxLength={2000}
                        minLength={50}
                        name="note"
                        onChange={form.handleChange}
                        required
                        rows={8}
                        value={form.values.note}
                    />
                    {disablePosting ? (
                        <DisablePostingMessage>
                                You can only post once a day. 📅
                        </DisablePostingMessage>
                    ) : null}
                    <DialogActions>
                        <Button
                            onClick={handleCancel}
                            variant="outlined"
                        >
                            Cancel
                        </Button>
                        <Button
                            // disabled={disablePosting} //todo: rollback
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
