import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Book } from "./Book"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

    @OneToMany(() => Book, book => book.user)
    books: Book[];

}