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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneProduct = exports.deleteProduct = exports.updateProducts = exports.getAllProducts = exports.createProduct = void 0;
const ProductSchema_1 = require("../entity/ProductSchema");
function createProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, categoryName, price, quantity } = req.body;
            const product = new ProductSchema_1.ProductSchema();
            product.name = name;
            product.categoryName = categoryName;
            product.price = price;
            product.quantity = quantity;
            yield product.save();
            return res.json(product);
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(500).json({ Message: err.message });
            }
        }
    });
}
exports.createProduct = createProduct;
function getAllProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const products = yield ProductSchema_1.ProductSchema.find();
            return res.json(products);
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(500).json({ Message: err.message });
            }
        }
    });
}
exports.getAllProducts = getAllProducts;
function updateProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const products = yield ProductSchema_1.ProductSchema.findOneBy({ id: parseInt(id) });
            if (!products)
                return res.status(404).json({ message: "Producto no existe" });
            yield ProductSchema_1.ProductSchema.update({ id: parseInt(id) }, req.body);
            return res.sendStatus(204);
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(500).json({ Message: err.message });
            }
        }
    });
}
exports.updateProducts = updateProducts;
function deleteProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const result = yield ProductSchema_1.ProductSchema.delete({ id: parseInt(id) });
            if (result.affected === 0) {
                res.status(404).json({ message: "Producto no encontrado" });
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
exports.deleteProduct = deleteProduct;
function getOneProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const product = yield ProductSchema_1.ProductSchema.findOneBy({ id: parseInt(id) });
            return res.status(200).json(product);
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(500).json({ Message: err.message });
            }
        }
    });
}
exports.getOneProduct = getOneProduct;
