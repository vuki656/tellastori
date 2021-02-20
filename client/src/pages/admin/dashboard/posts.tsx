import type { NextPage } from 'next'
import NextHead from 'next/head'
import * as React from 'react'

import { AdminDashboardPosts } from '../../../modules/Admin/AdminDashboardPosts'

const AdminDashboardPostsPage: NextPage = () => {
    return (
        <>
            <NextHead>
                <title>
                    Admin Dashboard - Posts
                </title>
            </NextHead>
            <AdminDashboardPosts />
        </>
    )
}

export default AdminDashboardPostsPage
