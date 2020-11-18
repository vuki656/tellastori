import { useMutation } from '@apollo/client'
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

import { CreateNewPostDialogType } from './CreateNewPostDialog.types'

export const CreateNewPostDialog: React.FunctionComponent = () => {
    const [isOpen, toggleIsOpen] = useToggle(false)

    const [createPostMutation] = useMutation<CreatePostMutation, CreatePostMutationVariables>(CREATE_POST)

    const form = useFormik<CreateNewPostDialogType>({
        initialValues: { note: '' },
        onSubmit: (formValues) => {
            createPostMutation({ variables: { input: { note: formValues.note } } })
            .then(() => {
                toggleIsOpen()
            })
        },
    })

    const handleCancel = () => {
        toggleIsOpen()
        form.resetForm()
    }

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
                        name="note"
                        onChange={form.handleChange}
                        rows={8}
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
