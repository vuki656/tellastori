import { NextPage } from 'next'
import NextHead from 'next/head'
import * as React from 'react'

import { AdminNewPost } from '../../../modules/Admin/AdminNewPost'

const AdminDashboardNewPostPage: NextPage = () => {
    return (
        <>
            <NextHead>
                <title>
                    Admin Dashboard - New Post
                </title>
            </NextHead>
            <AdminNewPost />
        </>
    )
}

export default AdminDashboardNewPostPage
