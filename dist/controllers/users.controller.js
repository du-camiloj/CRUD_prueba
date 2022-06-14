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
exports.deleteUser = exports.updateUser = exports.getAllUserss = exports.login = exports.createUser = void 0;
const UserSchema_1 = require("../entity/UserSchema");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.body.password || !req.body.username) {
                return res.status(400).json({ Message: "Envie nombre de usario y contraseña" });
            }
            const { username, password, money } = req.body;
            const salt = yield bcrypt_1.default.genSalt(10);
            const user = new UserSchema_1.UserSchema();
            user.username = username;
            user.password = yield bcrypt_1.default.hash(password, salt);
            user.money = money;
            yield user.save();
            return res.status(201).json(user);
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(500).json({ Message: err.message });
            }
        }
    });
}
exports.createUser = createUser;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.body.password || !req.body.username) {
                return res.status(400).json({ Message: "Envie nombre de usario y contraseña" });
            }
            const user = yield UserSchema_1.UserSchema.findOneBy({ username: req.body.username });
            if (!user) {
                return res.status(400).json({ Message: "Usuario no encontrado" });
            }
            const isMatch = yield bcrypt_1.default.compare(req.body.password, user.password);
            if (isMatch) {
                return res.status(200).json({ token: yield createToken(user) });
            }
            return res.status(400).json({ Message: "La contraseña es incorrecta" });
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(500).json({ Message: err.message });
            }
        }
    });
}
exports.login = login;
function getAllUserss(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield UserSchema_1.UserSchema.find();
            return res.json(users);
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(500).json({ Message: err.message });
            }
        }
    });
}
exports.getAllUserss = getAllUserss;
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const user = yield UserSchema_1.UserSchema.findOneBy({ id: parseInt(id) });
            if (!user)
                return res.status(404).json({ message: "Usuario no existe" });
            yield UserSchema_1.UserSchema.update({ id: parseInt(id) }, req.body);
            return res.sendStatus(204);
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(500).json({ Message: err.message });
            }
        }
    });
}
exports.updateUser = updateUser;
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const result = yield UserSchema_1.UserSchema.delete({ id: parseInt(id) });
            if (result.affected === 0) {
                res.status(404).json({ message: "Usuario no encontrado" });
            }
            return res.sendStatus(204);
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(500).json({ Message: err.message });
            }
        }
    });
}
exports.deleteUser = deleteUser;
function createToken(user) {
    return __awaiter(this, void 0, void 0, function* () {
        return jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, 'mySecret');
    });
}
