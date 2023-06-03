"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_entity_1 = require("./src/entity/user.entity");
const app_data_source_1 = require("./app-data-source");
// establish database connection
app_data_source_1.myDataSource
    .initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
})
    .catch((err) => {
    console.error("Error during Data Source initialization:", err);
});
// create and setup express app
const app = (0, express_1.default)();
app.use(express_1.default.json());
// register routes
app.get("/users", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield app_data_source_1.myDataSource.getRepository(user_entity_1.User).find();
        res.json(users);
    });
});
app.get("/users/:id", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const results = yield app_data_source_1.myDataSource.getRepository(user_entity_1.User).findOneBy({
            id: parseInt(req.params.id)
        });
        return res.send(results);
    });
});
app.post("/users", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield app_data_source_1.myDataSource.getRepository(user_entity_1.User).create(req.body);
        const results = yield app_data_source_1.myDataSource.getRepository(user_entity_1.User).save(user);
        return res.send(results);
    });
});
// app.put("/users/:id", async function (req: Request, res: Response) {
//     const user = await myDataSource.getRepository(User).findOneBy({
//         id: req.params.id,
//     })
//     myDataSource.getRepository(User).merge(user, req.body)
//     const results = await myDataSource.getRepository(User).save(user)
//     return res.send(results)
// })
app.put("/users/:id", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield app_data_source_1.myDataSource.getRepository(user_entity_1.User).findOneBy({
            id: parseInt(req.params.id),
        });
        if (user) {
            app_data_source_1.myDataSource.getRepository(user_entity_1.User).merge(user, req.body);
            const results = yield app_data_source_1.myDataSource.getRepository(user_entity_1.User).save(user);
            return res.send(results);
        }
        else {
            return res.status(404).send("User not found");
        }
    });
});
app.delete("/users/:id", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const results = yield app_data_source_1.myDataSource.getRepository(user_entity_1.User).delete(req.params.id);
        return res.send(results);
    });
});
// start express server
app.listen(3000, () => {
    console.log('Example app listening on port 3000');
});
