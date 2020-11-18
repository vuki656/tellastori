import { GraphQLSchema } from 'graphql'
import { buildSchemaSync } from 'type-graphql'
import { Container } from 'typedi'
import { PostResolver } from "../resolvers/Post"



export const getSchema = (): GraphQLSchema => {
    return buildSchemaSync({
        container: Container,
        resolvers: [
            PostResolver
        ],
        validate: false,
    })
}
