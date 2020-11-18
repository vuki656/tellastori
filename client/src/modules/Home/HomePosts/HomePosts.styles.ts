import styled from 'styled-components'

import { Panel } from '../../../ui-kit/components/Panel'

export const HomePostsRoot = styled('div')((props) => ({
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: props.theme.spacing.md,
}))

export const HomePostCard = styled(Panel)((props) => ({
    marginTop: props.theme.spacing.md,
    width: '40%',
}))

export const HomePostCardHeader = styled('div')((props) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: props.theme.spacing.md,
}))

export const HomePostCardNumber = styled('p')((props) => ({
    color: props.theme.palette.grey.light300,
    fontSize: '12px',
    margin: 0,
}))

export const HomePostCardDate = styled('p')((props) => ({
    color: props.theme.palette.grey.light300,
    fontSize: '12px',
    margin: 0,
}))
