import {
    AuthenticationError,
    UserInputError,
} from 'apollo-server'
import { compareSync } from 'bcryptjs'
import {
    decode,
    sign,
    verify,
} from 'jsonwebtoken'
import { Service } from 'typedi'
import {
    EntityRepository,
    Repository,
} from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { AdminEntity } from '../../entities'
import { ContextType } from '../../types'

import {
    LogInAdminInput,
    VerifyAdminInput,
} from './mutations/inputs'
import { LogInAdminPayload } from './mutations/payloads'
import { AdminType } from './types'

export type DecodedTokenType = {
    username: string,
}

@EntityRepository()
@Service({ global: true })
export class AdminService {

    constructor(
        @InjectRepository(AdminEntity) private readonly repository: Repository<AdminEntity>,
    ) {
    }

    public async logIn(
        input: LogInAdminInput,
        context: ContextType,
    ): Promise<LogInAdminPayload> {
        const {
            username,
            password,
        } = input

        const admin = await this.repository.findOne({ where: { username: username } })

        if (!admin) {
            throw new UserInputError('Error', { username: 'Wrong username.' })
        }

        const isPasswordValid = compareSync(password, admin.password)

        if (!isPasswordValid) {
            throw new UserInputError('Error', { password: 'Wrong password.' })
        }

        const signedToken = sign(
            { username: admin?.username },
            context.secret, { expiresIn: '7 days' }
        )

        return new LogInAdminPayload(signedToken)
    }

    public async verify(
        input: VerifyAdminInput,
        context: ContextType,
    ): Promise<AdminType> {
        const { token } = input

        const decoded = decode(token)

        const typedDecoded = decoded as DecodedTokenType

        if (!typedDecoded) {
            return new AdminType({ isValid: false })
        }

        const admin = await this.repository.findOne({ where: { username: typedDecoded.username } })

        if (!admin) {
            return new AdminType({ isValid: false })
        }

        if (!token) {
            return new AdminType({ isValid: false })
        }

        await verify(token, context.secret, (error) => {
            if (error) throw new AuthenticationError('Authentication Failed')
        })

        return new AdminType({ isValid: true })
    }

}
