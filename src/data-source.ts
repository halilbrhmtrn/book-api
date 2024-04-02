import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Book } from "./entity/Book"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "bookapi",
    synchronize: true,
    logging: false,
    entities: [User, Book],
    migrations: [],
    subscribers: [],
    dropSchema: true
})
