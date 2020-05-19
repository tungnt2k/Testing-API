import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 50,
        unique: true
    })
    username: string

    @Column("text")
    password: string
}
