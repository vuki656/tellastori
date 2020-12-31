import { gql } from '@apollo/client/core'

export const LOGIN_ADMIN = gql`
    mutation LoginAdmin($input: LogInAdminInput!) {
        logInAdmin(input: $input) {
            token
        }
    }
`
