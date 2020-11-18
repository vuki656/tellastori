import * as React from 'react'

import { CreateNewPostDialog } from '../CreateNewPostDialog'

import { NavigationBarRoot } from './NavigationBar.styles'

export const NavigationBar: React.FunctionComponent = () => {
    return (
        <NavigationBarRoot>
            <h3>Confessions</h3>
            <CreateNewPostDialog />
        </NavigationBarRoot>
    )
}
