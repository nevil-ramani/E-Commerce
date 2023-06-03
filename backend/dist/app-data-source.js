"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myDataSource = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./src/entity/user.entity");
exports.myDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "nevilramani",
    database: "postgres",
    synchronize: true,
    logging: true,
    // entities: [Post, Category],
    entities: [user_entity_1.User],
    subscribers: [],
});
