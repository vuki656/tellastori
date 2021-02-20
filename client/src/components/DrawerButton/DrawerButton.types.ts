import type { LinkProps } from 'next/link'
import type React from 'react'

export type DrawerButtonProps = LinkProps & {
    href: string
    component: React.ReactNode
}
