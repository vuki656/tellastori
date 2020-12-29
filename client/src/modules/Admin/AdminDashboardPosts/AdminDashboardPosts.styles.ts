import styled from 'styled-components'

export const AdminDashboardPostsRoot = styled('div')({
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    width: '100%',
})

export const AdminDashboardPostsList = styled('div')((props) => ({
    display: 'grid',
    padding: props.theme.spacing.md,
    rowGap: props.theme.spacing.md,
}))
