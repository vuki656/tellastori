import { GraphQLSchema } from 'graphql'
import { buildSchemaSync } from 'type-graphql'
import { Container } from 'typedi'

import { PostResolver } from '../resolvers/Post'
import { VoteResolver } from '../resolvers/Vote'

export const getSchema = (): GraphQLSchema => {
    return buildSchemaSync({
        container: Container,
        resolvers: [
            PostResolver,
            VoteResolver,
        ],
        validate: false,
    })
}
