import styled from 'styled-components'

import { Panel } from '../../../ui-kit/components/Panel'

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

export const HomePostsCard = styled(Panel)({
    maxWidth: '700px',
    width: '700px',
})

export const HomePostCardHeader = styled('div')((props) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: props.theme.spacing.md,
}))

export const HomePostCardNumber = styled('p')((props) => ({
    color: props.theme.palette.grey.light300,
    fontSize: '13px',
    margin: 0,
}))

export const HomePostCardDate = styled('p')((props) => ({
    color: props.theme.palette.grey.light300,
    fontSize: '13px',
    margin: 0,
}))

export const HomePostCardNote = styled('p')({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
})

export const HomePostsListButtons = styled('div')((props) => ({
    columnGap: props.theme.spacing.md,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    paddingBottom: props.theme.spacing.md,
}))
