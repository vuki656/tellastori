import React from 'react'
import styled, {
    CSSObject,
    keyframes,
} from 'styled-components'

import { Theme } from '../../styles'

import { ButtonProps } from './Button.types'

type ButtonRootTypes =
    React.ButtonHTMLAttributes<HTMLButtonElement>
    & Pick<ButtonProps, 'variant' | 'fullWidth'>

type ButtonIconTypes =
    React.HTMLAttributes<HTMLDivElement>
    & {
    position: 'start' | 'end',
}

export const getButtonStyles = (
    theme: Theme,
    props: ButtonRootTypes,
) => {
    let styles: CSSObject = { border: 'none' }

    if (props.variant === 'primary') {
        styles = {
            ...styles,
            '&:hover': {
                backgroundColor: theme.palette.blue.dark,
                cursor: 'pointer',
            },
            backgroundColor: theme.palette.blue.main,
            border: 'none',
            color: theme.palette.white,
            fontWeight: 'bold',
            transition: theme.transitions.create('background-color', 300),
        }
    }

    if (props.variant === 'outlined') {
        styles = {
            ...styles,
            '&:hover': {
                backgroundColor: theme.palette.grey.light500,
                cursor: 'pointer',
            },
            backgroundColor: theme.palette.white,
            borderColor: theme.palette.grey.light350,
            borderRadius: '4px',
            borderStyle: 'solid',
            borderWidth: '1px',
            transition: theme.transitions.create('background-color', 300),
        }
    }

    if (props.variant === 'blank') {
        styles = {
            ...styles,
            '&:hover': {
                backgroundColor: theme.palette.grey.light500,
                cursor: 'pointer',
            },
            backgroundColor: 'transparent',
            cursor: 'pointer',
            transition: theme.transitions.create('background-color', 200),
        }
    }

    if (props.disabled) {
        styles = {
            ...styles,
            '&:hover': { backgroundColor: theme.palette.grey.light300 },
            backgroundColor: theme.palette.grey.light300,
        }
    }

    return styles
}

export const ButtonRoot = styled('button')<ButtonRootTypes>((props) => ({
    ...props.theme.typography.regular,
    '&:focus': { outline: 'none' },
    alignItems: 'center',
    borderRadius: '4px',
    display: 'flex',
    flexDirection: 'row',
    height: '30px',
    justifyContent: 'center',
    minWidth: '64px',
    padding: `0 ${props.theme.spacing.def}`,
    width: props.fullWidth ?
        '100%' :
        'fit-content',
    ...getButtonStyles(props.theme, props),
}))

export const ButtonIconWrapper = styled('div')<ButtonIconTypes>((props) => ({
    display: 'flex',
    marginLeft: props.position === 'end' && props.theme.spacing.xs,
    marginRight: props.position === 'start' && props.theme.spacing.xs,
}))

const rotateAnimation = keyframes({ '100%': { transform: 'rotate(360deg)' } })

export const Loader = styled.div`
    border: 3px solid #f3f3f3;
    border-top: 3px solid #3498db;
    border-radius: 100%;
    width: 17px;
    height: 17px;
    animation: ${rotateAnimation} 0.7s linear infinite;
`
