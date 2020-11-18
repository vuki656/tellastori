import styled from 'styled-components'

export const NavigationBarRoot = styled('div')((props) => ({
    alignItems: 'center',
    backgroundColor: props.theme.palette.white,
    boxShadow: `0 2px 10px 0 ${props.theme.palette.grey.light300}`,
    display: 'flex',
    flexDirection: 'row',
    height: '50px',
    justifyContent: 'space-between',
    padding: props.theme.spacing.md,
    width: '100%',
}))
