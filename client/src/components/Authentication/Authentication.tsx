import { useLazyQuery } from '@apollo/client'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import * as React from 'react'

import { VERIFY_ADMIN } from '../../graphql/queries'
import type {
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
                    Cookies.remove('token')

                    void router.push('/admin/login')
                }
            },
            variables: { input: { token: token } },
        }
    )

    React.useEffect(() => {
        const retrievedToken = Cookies.get('token') ?? ''

        setToken(retrievedToken)
        verifyAdmin()
    }, [token])

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {data?.verifyAdmin.isValid ? children : null}
        </>
    )
}
