import { ApolloServer } from 'apollo-server'

import { getSchema } from './schema'

export const startServer = (): void => {
    const port = 8080
    const server = new ApolloServer({
        context: ({ req }) => {
            return {
                secret: process.env.JWT_SECRET,
                token: req.headers.token,
                userId: req.headers.userid,
            }
        },
        schema: getSchema(),
    })

    server
        .listen({ port: port })
        .then(() => {
            // eslint-disable-next-line no-console
            console.log(`======== UP ON ${port} ========`)
        })
        .catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error)
        })
}
