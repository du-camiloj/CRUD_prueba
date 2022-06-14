"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const typeorm = require("typeorm");
const typeorm_1 = require("typeorm");
const ProductSchema_1 = require("./entity/ProductSchema");
const UserSchema_1 = require("./entity/UserSchema");
const PurchaseSchema_1 = require("./entity/PurchaseSchema");
exports.connection = new typeorm_1.DataSource({
    type: "postgres",
    host: "postgres_ss",
    port: 5432,
    username: 'postgres',
    password: 'admin1234',
    database: "shopping",
    synchronize: true,
    logging: false,
    entities: [
        ProductSchema_1.ProductSchema,
        UserSchema_1.UserSchema,
        PurchaseSchema_1.PurchaseSchema
    ]
});
