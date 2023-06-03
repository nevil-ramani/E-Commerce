import { DataSource } from "typeorm";
import {User} from "./src/entity/user.entity"

export const myDataSource = new DataSource({

    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "nevilramani",
    database: "postgres",
    synchronize: true,
    logging: true,
    // entities: [Post, Category],
    entities: [User],
    subscribers: [],
})
