import {
    Drawer,
    DrawerIcon,
    ExitIcon,
    ListIcon,
    PencilIcon,
} from '@dvukovic/dujo-ui'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import * as React from 'react'

import { DrawerButton } from '../../../components/DrawerButton'

export const AdminDashboardMenu: React.FunctionComponent = () => {
    const {
        pathname,
        push,
    } = useRouter()

    const handleLogout = () => {
        Cookies.remove('token')
        Cookies.remove('userId')

        push('/admin/login')
    }

    return (
        <Drawer variant="mini">
            <DrawerButton
                component={
                    <DrawerIcon
                        icon={<ListIcon />}
                        selected={pathname?.includes('posts')}
                        tooltipText="Posts"
                    />
                }
                href="/admin/dashboard/posts"
            />
            <DrawerButton
                component={
                    <DrawerIcon
                        icon={<PencilIcon />}
                        selected={pathname?.includes('users')}
                        tooltipText="Users"
                    />
                }
                href="/admin/dashboard/newPost"
            />
            <DrawerIcon
                icon={<ExitIcon />}
                onClick={handleLogout}
                tooltipText="Log Out"
            />
        </Drawer>
    )
}
