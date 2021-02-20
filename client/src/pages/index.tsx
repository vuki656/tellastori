import type { NextPage } from 'next'
import NextHead from 'next/head'
import * as React from 'react'

import { Home } from '../modules/Home'

const HomePage: NextPage = () => {
    return (
        <>
            <NextHead>
                <title>
                    Home
                </title>
            </NextHead>
            <Home />
        </>
    )
}

export default HomePage
