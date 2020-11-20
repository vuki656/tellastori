import React from 'react'
import styled from 'styled-components'

import { PanelProps } from './Panel.types'

type PanelRootProps =
    React.HTMLAttributes<HTMLDivElement>
    & Pick<PanelProps, 'spacing'>

export const PanelRoot = styled('div')<PanelRootProps>((props) => ({
    backgroundColor: props.theme.palette.white,
    borderRadius: '10px',
    boxShadow: `0 2px 10px 0 ${props.theme.palette.grey.light300}`,
    padding: props.theme.spacing[props.spacing],
}))
