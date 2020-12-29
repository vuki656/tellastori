import { NextPage } from 'next'
import NextHead from 'next/head'
import * as React from 'react'

import { AdminDashboardUsers } from '../../../modules/Admin/AdminDashboardUsers'

const AdminDashboardUsersPage: NextPage = () => {
    return (
        <>
            <NextHead>
                <title>
                    Admin Dashboard - Users
                </title>
            </NextHead>
            <AdminDashboardUsers />
        </>
    )
}

export default AdminDashboardUsersPage
