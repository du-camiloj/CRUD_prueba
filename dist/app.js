"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const passport_1 = __importDefault(require("passport"));
const passport_2 = __importDefault(require("./middelwares/passport"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const products_routes_1 = __importDefault(require("./routes/products.routes"));
const Purchases_routes_1 = __importDefault(require("./routes/Purchases.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const app = (0, express_1.default)();
//puerto de variable de entorno o 4000
app.set('port', process.env.PORT || 4000);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(passport_1.default.initialize());
passport_1.default.use(passport_2.default);
app.use(users_routes_1.default);
app.use(products_routes_1.default);
app.use(Purchases_routes_1.default);
app.use(auth_routes_1.default);
module.exports = app;
