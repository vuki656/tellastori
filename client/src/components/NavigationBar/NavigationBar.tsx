import * as React from 'react'

import { HomeCreateNewPostDialog } from '../../modules/Home/HomeCreateNewPostDialog'

import { NavigationBarRoot } from './NavigationBar.styles'

export const NavigationBar: React.FunctionComponent = () => {
    return (
        <NavigationBarRoot>
            <h3>Confessions</h3>
            <HomeCreateNewPostDialog />
        </NavigationBarRoot>
    )
}
