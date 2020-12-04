import { TextField } from '@dvukovic/dujo-ui'
import { useFormik } from 'formik'
import * as React from 'react'
import * as Yup from 'yup'

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
    const {
        handleSubmit,
        errors,
        values,
        handleChange,
    } = useFormik<AdminLoginFormType>({
        initialValues: {
            password: '',
            username: '',
        },
        onSubmit: (formValues) => {
            console.log(formValues)
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
                        value={values.password}
                    />
                    <AdminLoginButton
                        fullWidth
                        type="submit"
                    >
                        Login
                    </AdminLoginButton>
                </AdminLoginForm>
            </AdminLoginPanel>
        </AdminLoginRoot>
    )
}
