import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('post')
export class PostEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        length: 2000,
        nullable: true,
        type: 'varchar',
    })
    note: string

    @Column({
        type: 'varchar',
        nullable: false
    })
    posterId: string

}
