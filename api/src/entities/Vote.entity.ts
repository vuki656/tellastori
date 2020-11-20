import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'

import { VoteTypeEnum } from '../enums'

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

    @ManyToOne(() => PostEntity, (post) => post.votes)
    @JoinColumn({ name: 'vote_id' })
    post: PostEntity

}
