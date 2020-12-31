import { LinkProps } from 'next/link'
import React from 'react'

export type DrawerButtonProps = LinkProps & {
    href: string,
    component: React.ReactNode
}
