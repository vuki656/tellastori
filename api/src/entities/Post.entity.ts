import {
    Column,
    Entity,
    Generated,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'

import { VoteEntity } from './Vote.entity'

@Entity('post')
export class PostEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        name: 'number',
        nullable: false,
    })
    @Generated('increment')
    number: number

    @Column({
        name: 'date',
        nullable: true,
        type: 'date',
    })
    date: Date

    @Column({
        length: 2000,
        nullable: true,
        type: 'varchar',
    })
    note: string

    @OneToMany(() => VoteEntity, (vote) => vote.post, {
        eager: true,
        onDelete: 'CASCADE',
    })
    votes: VoteEntity[]

}
