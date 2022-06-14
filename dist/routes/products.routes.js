"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controller_1 = require("../controllers/products.controller");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
router.post('/products', passport_1.default.authenticate('jwt', { session: false }), products_controller_1.createProduct);
router.get('/products', products_controller_1.getAllProducts);
router.get('/products/:id', products_controller_1.getOneProduct);
router.put('/products/:id', passport_1.default.authenticate('jwt', { session: false }), products_controller_1.updateProducts);
router.delete('/products/:id', passport_1.default.authenticate('jwt', { session: false }), products_controller_1.deleteProduct);
exports.default = router;
