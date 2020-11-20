import styled from 'styled-components'

export const HomePostsRoot = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    overflow: 'auto',
})

export const HomePostsList = styled('div')((props) => ({
    display: 'grid',
    padding: props.theme.spacing.md,
    rowGap: props.theme.spacing.md,
}))

export const HomePostsListButtons = styled('div')((props) => ({
    columnGap: props.theme.spacing.md,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    paddingBottom: props.theme.spacing.md,
}))
