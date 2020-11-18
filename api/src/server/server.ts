import { ApolloServer } from 'apollo-server'

import { getSchema } from './schema'

export const startServer = async(): Promise<void> => {
    const port = 4000
    const server = new ApolloServer({ schema: await getSchema() })

    server
    .listen({ port })
    .then(() => {
        // eslint-disable-next-line no-console
        console.log(`======== UP ON ${port} ========`)
    })
    .catch((e) => {
        // eslint-disable-next-line no-console
        console.log(e)
    })
}
