import styled from 'styled-components'

export const AdminDashboardPostsRoot = styled('div')({})

export const AdminDashboardPostsList = styled('div')((props) => ({
    display: 'grid',
    padding: props.theme.spacing.md,
    rowGap: props.theme.spacing.md,
}))

export const AdminDashboardPostCardRoot = styled('div')((props) => ({
    columnGap: props.theme.spacing.sm,
    display: 'grid',
    gridTemplateColumns: '0.9fr auto',
}))

export const AdminDashboardPostCardActions = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
})
