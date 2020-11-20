import React from 'react'
import styled from 'styled-components'

import { getButtonStyles } from '../Button'

import { IconButtonProps } from './IconButton.types'

type IconButtonRoot =
    React.ButtonHTMLAttributes<HTMLButtonElement>
    & Pick<IconButtonProps, 'variant'>

export const IconButtonRoot = styled('button')<IconButtonRoot>((props) => {
    let styles = {
        '&:focus': { outline: 'none' },
        ...getButtonStyles(props.theme, props),
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        padding: 0,
    }

    if (props.variant === 'outlined') {
        styles = {
            ...styles,
            padding: props.theme.spacing.xxs,
        }
    }

    return styles
})
