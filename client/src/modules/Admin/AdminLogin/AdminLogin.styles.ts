import { Button } from '@dvukovic/dujo-ui'
import styled from 'styled-components'

export const AdminLoginRoot = styled('div')({
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
})

export const AdminLoginTitle = styled('p')({
    fontSize: '30px',
    margin: 0,
})

export const AdminLoginForm = styled('form')((props) => ({
    display: 'flex',
    flexDirection: 'column',
    marginTop: props.theme.spacing.md,
}))

export const AdminLoginButton = styled(Button)((props) => ({
    marginTop: props.theme.spacing.md,
}))
