import { NextPage } from 'next'
import NextHead from 'next/head'
import * as React from 'react'

import { AdminLogin } from '../modules/AdminLogin'

const AdminLoginPage: NextPage = () => {
    return (
        <>
            <NextHead>
                <title>
                    Admin Login
                </title>
            </NextHead>
            <AdminLogin />
        </>
    )
}

export default AdminLoginPage
