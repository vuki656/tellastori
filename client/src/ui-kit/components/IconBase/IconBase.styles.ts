import React from 'react'
import styled, { CSSObject } from 'styled-components'

import { IconCommonProps } from '../../icons/Icon.types'
import { IconSizeType } from '../../styles'

type SvgRootProps =
    React.SVGAttributes<SVGElement>
    & IconCommonProps

export const SvgRoot = styled('svg')<SvgRootProps>((props) => {
    const styles: CSSObject = { ...getSize(props.size) }

    return styles
})

// eslint-disable-next-line consistent-return
const getSize = (size: IconSizeType) => {
    switch (size) {
        case 'small':
            return {
                height: '18px',
                width: '18px',
            }
        case 'medium':
            return {
                height: '24px',
                width: '24px',
            }
        case 'big':
            return {
                height: '32px',
                width: '32px',
            }
        default:
            return {
                height: '14px',
                width: '14px',
            }
    }
}
