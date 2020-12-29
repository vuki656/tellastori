import { gql } from '@apollo/client/core'

export const VERIFY_ADMIN = gql`
    query VerifyAdmin($input: VerifyAdminInput!) {
        verifyAdmin(input: $input) {
            isValid
        }
    }
`
