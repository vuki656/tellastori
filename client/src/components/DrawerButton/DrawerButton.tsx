import Link from 'next/link'
import * as React from 'react'

import { DrawerButtonProps } from './DrawerButton.types'

export const DrawerButton: React.FunctionComponent<DrawerButtonProps> = (props) => {
    const {
        href,
        component,
        ...other
    } = props

    return (
        <Link
            href={href}
            {...other}
        >
            <a style={{ width: '100%' }}>
                {component}
            </a>
        </Link>
    )
}
