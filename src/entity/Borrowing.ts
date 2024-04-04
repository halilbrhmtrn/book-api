import { Book } from "./Book";
import { User } from "./User";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";


@Entity()
export class Borrowing {
    @PrimaryGeneratedColumn()
    id: number

    @Column(
        {
            type: 'timestamp',
            default: () => 'CURRENT_TIMESTAMP'
        }
    )
    borrowedAt: Date

    @Column({
        nullable: true
    })
    returnedAt: Date

    @ManyToOne(() => User, user => user.borrowings)
    @JoinColumn({
        name: 'user_id'
    })
    user: User

    @ManyToOne(() => Book, book => book.borrowings)
    @JoinColumn({
        name: 'book_id'
    })
    book: Book

    @Column({
        nullable: true
    })
    score: number

    @Column()
    status: string
}