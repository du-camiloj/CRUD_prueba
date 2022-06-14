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
exports.createBuy = void 0;
const UserSchema_1 = require("../entity/UserSchema");
const ProductSchema_1 = require("../entity/ProductSchema");
const PurchaseSchema_1 = require("../entity/PurchaseSchema");
function createBuy(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.body.userId || !req.body.productId || !req.body.quantityBuy) {
                return res.status(400).json({ Message: "Envie id de usario y producto y la cantidad a comprar" });
            }
            const { userId, productId, quantityBuy } = req.body;
            const user = yield UserSchema_1.UserSchema.findOneBy({ id: userId });
            const products = yield ProductSchema_1.ProductSchema.findOneBy({ id: productId });
            if (!user)
                return res.status(404).json({ message: "Usuario no existe" });
            else if (!products)
                return res.status(404).json({ message: "Producto no existe" });
            else if (products.quantity < quantityBuy)
                return res.status(404).json({ message: "Producto no tiene la cantidad suficiente" });
            else if (user.money < (products.price * quantityBuy))
                return res.status(404).json({ message: "Usuario no tiene dinero sufciente" });
            const purchase = new PurchaseSchema_1.PurchaseSchema();
            purchase.user = user;
            purchase.total = (products.price * quantityBuy);
            purchase.products = [products];
            purchase.purchaseDate = new Date();
            yield purchase.save();
            ProductSchema_1.ProductSchema.update({ id: productId }, { quantity: (products.quantity - quantityBuy) });
            return res.status(200).json(purchase);
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(500).json({ Message: err.message });
            }
        }
    });
}
exports.createBuy = createBuy;
