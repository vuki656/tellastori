import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'

import type { VoteTypeEnum } from '../enums'

import { PostEntity } from './Post.entity'

@Entity('vote')
export class VoteEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        name: 'type',
        nullable: false,
        type: 'varchar',
    })
    type: VoteTypeEnum

    @Column({
        name: 'user_id',
        nullable: false,
        type: 'varchar',
    })
    userId: string

    @ManyToOne(() => PostEntity, (post) => post.votes, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'post_id' })
    post: PostEntity
}
