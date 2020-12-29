import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('admin')
export class AdminEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        nullable: false,
        type: 'varchar',
    })
    username: string

    @Column({
        length: 255,
        type: 'varchar',
    })
    password: string

}
