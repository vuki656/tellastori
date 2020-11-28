import { ApolloServer } from 'apollo-server'

import { getSchema } from './schema'

export const startServer = async(): Promise<void> => {
    const port = 8080
    const server = new ApolloServer({
        context: ({ req }) => {
            return { userId: req.headers.userid }
        },
        schema: await getSchema(),
    })

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
