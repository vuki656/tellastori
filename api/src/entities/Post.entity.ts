import {
    Column,
    Entity,
    Generated,
    PrimaryGeneratedColumn,
} from 'typeorm'

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

}
