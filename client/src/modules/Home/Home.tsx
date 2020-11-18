import * as React from 'react'

import { NavigationBar } from '../../components/NavigationBar'

import { HomeRoot } from './Home.styles'
import { HomePosts } from './HomePosts'

export const Home: React.FunctionComponent = () => {
    return (
        <HomeRoot>
            <NavigationBar />
            <HomePosts />
        </HomeRoot>
    )
}
