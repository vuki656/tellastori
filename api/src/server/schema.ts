import { GraphQLSchema } from 'graphql'
import { buildSchemaSync } from 'type-graphql'
import { NonEmptyArray } from 'type-graphql/dist/interfaces/NonEmptyArray'
import { Container } from 'typedi'

import * as resolvers from '../resolvers'

export const getSchema = (): GraphQLSchema => {
    return buildSchemaSync({
        container: Container,
        resolvers: [...Object.values(resolvers)] as unknown as NonEmptyArray<string>,
        validate: false,
    })
}
