import { useLazyQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import * as React from 'react'

import { VERIFY_ADMIN } from '../../graphql/queries'
import {
    VerifyAdminQuery,
    VerifyAdminQueryVariables,
} from '../../graphql/types'

export const Authentication: React.FunctionComponent = (props) => {
    const { children } = props

    const router = useRouter()

    const [token, setToken] = React.useState('')

    const [
        verifyAdmin,
        { data },
    ] = useLazyQuery<VerifyAdminQuery, VerifyAdminQueryVariables>(
        VERIFY_ADMIN,
        {
            fetchPolicy: 'network-only',
            onCompleted: (response) => {
                if (!response?.verifyAdmin.isValid) {
                    window.localStorage.removeItem('token')

                    router.push('/admin/login')
                }
            },
            variables: { input: { token: token } },
        }
    )

    React.useEffect(() => {
        setToken(window.localStorage.getItem('token') ?? '')
        verifyAdmin()
    }, [])

    return (
        <>
            {data?.verifyAdmin.isValid ? children : null}
        </>
    )
}
