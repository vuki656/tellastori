import 'reflect-metadata'
import { buildSchemaSync } from 'type-graphql'
import { NonEmptyArray } from 'type-graphql/dist/interfaces/NonEmptyArray'

import * as resolvers from '../resolvers'

import { authChecker } from './authorization'

buildSchemaSync({
    authChecker: authChecker,
    resolvers: [...Object.values(resolvers)] as unknown as NonEmptyArray<string>,
})
