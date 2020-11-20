import React from 'react'
import styled, { CSSObject } from 'styled-components'

import { DrawerProps } from './Drawer.types'

type DrawerRootProps =
    React.HTMLAttributes<HTMLDivElement>
    & Pick<DrawerProps, 'variant'>

export const DrawerRoot = styled('div')<DrawerRootProps>((props) => {
    let styles: CSSObject = {
        backgroundColor: props.theme.palette.white,
        boxShadow: `0 2px 10px 0 ${props.theme.palette.grey.light300}`,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        zIndex: props.theme.zIndex.drawer,
    }

    if (props.variant === 'mini') {
        styles = {
            ...styles,
            maxWidth: '50px',
            minWidth: '50px',
            width: '50px',
        }
    }

    return styles
})

