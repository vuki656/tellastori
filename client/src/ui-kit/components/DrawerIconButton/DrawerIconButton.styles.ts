import React from 'react'
import styled from 'styled-components'

import { DrawerIconButtonProps } from './DrawerIconButton.types'

type DrawerIconButtonRootProps =
    React.HTMLAttributes<HTMLDivElement>
    & Pick<DrawerIconButtonProps, 'selected'>

export const DrawerIconButtonRoot = styled('div')<DrawerIconButtonRootProps>((props) => ({
    '& svg': {
        fill: props.selected
            ? props.theme.palette.grey.dark300
            : '',
    },
    '&:hover': {
        backgroundColor: props.theme.palette.grey.light400,
        transition: props.theme.transitions.create('background-color', 300),
    },
    alignItems: 'center',
    backgroundColor: props.selected ?
        props.theme.palette.grey.light400 :
        '',
    cursor: 'pointer',
    display: 'flex',
    height: '40px',
    justifyContent: 'center',
    width: '100%',
}))
