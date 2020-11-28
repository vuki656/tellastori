import cuid from 'cuid'

type UseUserTaggingType = {
    assignIdToUser: () => void
}

export const useUserTagging = (): UseUserTaggingType => {
    const assignId = () => {
        const userId = localStorage.getItem('userId')

        if (!userId) {
            localStorage.setItem('userId', cuid())
        }
    }

    return { assignIdToUser: assignId }
}
