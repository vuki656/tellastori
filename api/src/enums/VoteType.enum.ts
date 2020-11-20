import { registerEnumType } from 'type-graphql'

export enum VoteTypeEnum {
    positive = 'positive',
    negative = 'negative',
}

registerEnumType(VoteTypeEnum, { name: 'VoteTypeEnum' })
