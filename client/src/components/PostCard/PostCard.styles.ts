import type { Theme } from '@dvukovic/dujo-ui'
import {
    Button,
    Panel,
} from '@dvukovic/dujo-ui'
import styled from 'styled-components'

type HomePostsListButtonProps = {
    active: boolean
}

export const HomePostsCardRoot = styled(Panel)({
    '@media (max-width: 800px)': { width: '80vw' },
    padding: 0,
    width: '40vw',
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
    whiteSpace: 'pre-wrap',
}))

export const HomePostCardButtons = styled('div')({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
})

const getButtonProps = (theme: Theme, isActive: boolean) => {
    return {
        border: `1px solid ${theme.palette.grey.light300}`,
        borderBottom: 'none',
        borderRight: 'none',
        borderTop: isActive ? `2px solid ${theme.palette.yellow.main}` : '',
        padding: theme.spacing.md,
    }
}

export const HomePostsListLeftButton = styled(Button)<HomePostsListButtonProps>((props) => ({
    ...getButtonProps(props.theme, props.active),
    borderLeft: 'none',
    borderRadius: '0 0 0 10px',
}))

export const HomePostsListRightButton = styled(Button)<HomePostsListButtonProps>((props) => ({
    ...getButtonProps(props.theme, props.active),
    borderRadius: '0 0 10px 0',
    borderRight: 'none',
}))

export const HomePostCardCount = styled('p')((props) => ({
    color: props.theme.palette.grey.light300,
    margin: 0,
}))
