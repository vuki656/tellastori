import styled from 'styled-components'

import { Button } from '../../../ui-kit/components/Button'
import { Panel } from '../../../ui-kit/components/Panel'

type HomePostsListButtonProps = {
    active?: boolean
}

export const HomePostsCardRoot = styled(Panel)({
    maxWidth: '700px',
    padding: 0,
    width: '700px',
})

export const HomePostCardHeader = styled('div')((props) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: props.theme.spacing.md,
}))

export const HomePostsCardContent = styled('div')((props) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: props.theme.spacing.md,
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

export const HomePostCardNote = styled('p')((props) => ({
    overflow: 'hidden',
    paddingBottom: props.theme.spacing.xs,
    textOverflow: 'ellipsis',
}))

export const HomePostCardButtons = styled('div')({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
})

export const HomePostsListLeftButton = styled(Button)<HomePostsListButtonProps>((props) => ({
    border: `1px solid ${props.theme.palette.grey.light300}`,
    borderBottom: 'none',
    borderLeft: 'none',
    borderRadius: '0 0 0 10px',
    borderTop: props.active ? `2px solid ${props.theme.palette.yellow.main}` : '',
    columnGap: props.theme.spacing.xs,
    padding: props.theme.spacing.md,
}))

export const HomePostsListRightButton = styled(Button)<HomePostsListButtonProps>((props) => ({
    border: `1px solid ${props.theme.palette.grey.light300}`,
    borderBottom: 'none',
    borderLeft: 'none',
    borderRadius: '0 0 10px 0',
    borderRight: 'none',
    borderTop: props.active ? `2px solid ${props.theme.palette.yellow.main}` : '',
    columnGap: props.theme.spacing.xs,
    padding: props.theme.spacing.md,
}))

export const HomePostCardCount = styled('p')((props) => ({
    color: props.theme.palette.grey.light300,
    margin: 0,
}))
