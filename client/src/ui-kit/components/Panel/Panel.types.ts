import React from 'react'

import { SpacingType } from '../../styles'

export type PanelProps = React.HTMLAttributes<HTMLDivElement> & {
    spacing?: SpacingType,
}
