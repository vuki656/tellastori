import { NextPage } from 'next'
import NextHead from 'next/head'
import * as React from 'react'

import { Post } from '../modules/Post'

const LoginPage: NextPage = () => {
    return (
        <>
            <NextHead>
                <title>
                    Post
                </title>
            </NextHead>
            <Post />
        </>
    )
}

export default LoginPage
