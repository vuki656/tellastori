import styled from 'styled-components'

export const AdminNewPostRoot = styled('div')((props) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: props.theme.spacing.md,
    width: '70%',
}))

export const AdminNewPostButtons = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
})
