import cuid from 'cuid'
import Cookies from 'js-cookie'

type UseUserTaggingType = {
    assignIdToUser(): void
}

export const useUserTagging = (): UseUserTaggingType => {
    const assignId = () => {
        const userId = Cookies.get('userId')

        if (!userId) {
            Cookies.set('userId', cuid())
        }
    }

    return { assignIdToUser: assignId }
}
