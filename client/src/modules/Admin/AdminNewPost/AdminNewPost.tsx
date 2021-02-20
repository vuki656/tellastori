import { useMutation } from '@apollo/client'
import {
    Button,
    TextArea,
} from '@dvukovic/dujo-ui'
import { useFormik } from 'formik'
import * as React from 'react'

import { CREATE_POST } from '../../../graphql/mutations'
import type {
    CreatePostMutation,
    CreatePostMutationVariables,
} from '../../../graphql/types'

import {
    AdminNewPostButtons,
    AdminNewPostRoot,
} from './AdminNewPost.styles'
import type { AdminNewPostFormType } from './AdminNewPost.types'

export const AdminNewPost: React.FunctionComponent = () => {
    const [createPostMutation] = useMutation<CreatePostMutation, CreatePostMutationVariables>(CREATE_POST)

    const form = useFormik<AdminNewPostFormType>({
        initialValues: { note: '' },
        onSubmit: (formValues) => {
            createPostMutation({ variables: { input: { note: formValues.note } } })
                .then(() => {
                    form.resetForm()
                })
                .catch(() => {
                    form.errors.note = 'Something went wrong.'
                })
        },
        validateOnChange: false,
    })

    const handleCancel = () => {
        form.resetForm()
    }

    return (
        <AdminNewPostRoot>
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
                <AdminNewPostButtons>

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
                </AdminNewPostButtons>
            </form>
        </AdminNewPostRoot>
    )
}
