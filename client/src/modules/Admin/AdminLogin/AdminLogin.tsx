import type { ApolloError } from '@apollo/client'
import { useMutation } from '@apollo/client'
import { TextField } from '@dvukovic/dujo-ui'
import { useFormik } from 'formik'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import * as React from 'react'
import * as Yup from 'yup'

import { LOGIN_ADMIN } from '../../../graphql/mutations'
import type {
    LoginAdminMutation,
    LoginAdminMutationVariables,
} from '../../../graphql/types'

import {
    AdminLoginButton,
    AdminLoginForm,
    AdminLoginRoot,
    AdminLoginTitle,
} from './AdminLogin.styles'
import type { AdminLoginFormType } from './AdminLogin.types'

const ValidationSchema = Yup.object().shape({
    password: Yup.string()
        .required('Required'),
    username: Yup.string()
        .required('Required'),
})

export const AdminLogin: React.FunctionComponent = () => {
    const router = useRouter()

    const [
        adminLoginMutation,
        { loading: loginLoading },
    ] = useMutation<LoginAdminMutation, LoginAdminMutationVariables>(LOGIN_ADMIN)

    const {
        errors,
        handleChange,
        handleSubmit,
        setErrors,
        values,
    } = useFormik<AdminLoginFormType>({
        initialValues: {
            password: '',
            username: '',
        },
        onSubmit: (formValues) => {
            adminLoginMutation({
                variables: {
                    input: {
                        password: formValues.password,
                        username: formValues.username,
                    },
                },
            })
                .then((response) => {
                    const token = response?.data?.logInAdmin.token ?? ''

                    Cookies.set('token', token)
                    void router.push('/admin/dashboard/posts')
                })
                .catch((error: ApolloError) => {
                    const formErrors = error.graphQLErrors[0].extensions?.exception

                    if (formErrors) {
                        setErrors({ ...formErrors })
                    }
                })
        },
        validationSchema: ValidationSchema,
    })

    return (
        <AdminLoginRoot>
            <div>
                <AdminLoginTitle>
                    📖 Tellastori
                </AdminLoginTitle>
                <AdminLoginForm onSubmit={handleSubmit}>
                    <TextField
                        error={Boolean(errors.username)}
                        fullWidth={true}
                        helperText={errors.username}
                        label="Username"
                        name="username"
                        onChange={handleChange}
                        value={values.username}
                    />
                    <TextField
                        error={Boolean(errors.password)}
                        fullWidth={true}
                        helperText={errors.password}
                        label="Password"
                        name="password"
                        onChange={handleChange}
                        type="password"
                        value={values.password}
                    />
                    <AdminLoginButton
                        fullWidth={true}
                        loading={loginLoading}
                        type="submit"
                    >
                        Login
                    </AdminLoginButton>
                </AdminLoginForm>
            </div>
        </AdminLoginRoot>
    )
}
