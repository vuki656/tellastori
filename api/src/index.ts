import { resolve } from 'path'

import dotenv from 'dotenv'

import 'reflect-metadata'

import {
    createDatabaseConnection,
    startServer,
} from './server'

dotenv.config({ path: resolve(__dirname, '../.env.local') })

createDatabaseConnection()
    .then(() => {
        startServer()
    })
    .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error)
        // eslint-disable-next-line no-console
        console.log('===== FAILED =====')
    })
