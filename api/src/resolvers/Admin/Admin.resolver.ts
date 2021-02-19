import {
    Arg,
    Ctx,
    Mutation,
    Query,
    Resolver,
} from 'type-graphql'

import type { ContextType } from '../../types'

import type { AdminService } from './Admin.service'
import type {
    LogInAdminInput,
    VerifyAdminInput,
} from './mutations/inputs'
import { LogInAdminPayload } from './mutations/payloads'
import { AdminType } from './types'

@Resolver(() => AdminType)
export class AdminResolver {
    constructor(
        private readonly adminService: AdminService,
    ) {
    }

    @Mutation(() => LogInAdminPayload)
    public async logInAdmin(
        @Arg('input') input: LogInAdminInput,
        @Ctx() context: ContextType,
    ): Promise<LogInAdminPayload> {
        return this.adminService.logIn(input, context)
    }

    @Query(() => AdminType)
    public async verifyAdmin(
        @Arg('input') input: VerifyAdminInput,
        @Ctx() context: ContextType,
    ): Promise<AdminType> {
        return this.adminService.verify(input, context)
    }
}
