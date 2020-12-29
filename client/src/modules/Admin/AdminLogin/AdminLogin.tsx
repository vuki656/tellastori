import {
    ApolloError,
    useMutation,
} from '@apollo/client'
import { TextField } from '@dvukovic/dujo-ui'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import * as React from 'react'
import * as Yup from 'yup'

import { LOGIN_ADMIN } from '../../../graphql/mutations'
import {
    LoginAdminMutation,
    LoginAdminMutationVariables,
} from '../../../graphql/types'

import {
    AdminLoginButton,
    AdminLoginForm,
    AdminLoginPanel,
    AdminLoginRoot,
    AdminLoginTitle,
} from './AdminLogin.styles'
import { AdminLoginFormType } from './AdminLogin.types'

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
        handleSubmit,
        errors,
        values,
        handleChange,
        setErrors,
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

                window.localStorage.setItem(
                    'token',
                    token
                )

                router.push('/admin/dashboard/posts')
            })
            .catch((error: ApolloError) => {
                const errors = error.graphQLErrors[0].extensions?.exception

                if (errors) {
                    setErrors({ ...errors })
                }
            })
        },
        validationSchema: ValidationSchema,
    })

    return (
        <AdminLoginRoot>
            <AdminLoginPanel>
                <AdminLoginTitle>
                📖 Tellastori
                </AdminLoginTitle>
                <AdminLoginForm onSubmit={handleSubmit}>
                    <TextField
                        error={Boolean(errors.username)}
                        fullWidth
                        helperText={errors.username}
                        label="Username"
                        name="username"
                        onChange={handleChange}
                        value={values.username}
                    />
                    <TextField
                        error={Boolean(errors.password)}
                        fullWidth
                        helperText={errors.password}
                        label="Password"
                        name="password"
                        onChange={handleChange}
                        type="password"
                        value={values.password}
                    />
                    <AdminLoginButton
                        fullWidth
                        loading={loginLoading}
                        type="submit"
                    >
                        Login
                    </AdminLoginButton>
                </AdminLoginForm>
            </AdminLoginPanel>
        </AdminLoginRoot>
    )
}
