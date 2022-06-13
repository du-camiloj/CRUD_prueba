import { Request, Response } from "express";
import { UserSchema } from "../entity/UserSchema";
import { ProductSchema } from "../entity/ProductSchema";
import { PurchaseSchema } from "../entity/PurchaseSchema";

export async function createBuy(req: Request, res: Response){
    try{
        
        const {userId, productId, quantityBuy} = req.body;
        
        const user = await UserSchema.findOneBy({id: userId})
        const products = await ProductSchema.findOneBy({id: productId})
        if (!user) return res.status(404).json({message: "Usuario no existe"})
        else if (!products) return res.status(404).json({message: "Producto no existe"})
        else if(products.quantity<quantityBuy) return res.status(404).json({message: "Producto no tiene la cantidad suficiente"})
        else if(user.money<(products.price*quantityBuy)) return res.status(404).json({message: "Usuario no tiene dinero sufciente"})
    
        const purchase = new PurchaseSchema();
        purchase.user = user;
        purchase.total = (products.price*quantityBuy);
        purchase.products = [products];
        purchase.purchaseDate = new Date();
    
        await purchase.save()
    
        ProductSchema.update({id: productId}, {quantity: (products.quantity-quantityBuy)})
    
    
        console.log("estoy aquii")
    
        return res.status(200).json(purchase)
        
    }catch(err){
        if (err instanceof Error) {
            return res.status(500).json({Message: err.message})
        }
    }
    
    

}

export async function createUser(req: Request, res: Response){
    try{
        const {username, password, money} = req.body;
        
        const user = new UserSchema();
        user.username = username;
        user.password = password;
        user.money = money;
        
        await user.save()
    
        return res.json(user)

    }catch(err){
        if (err instanceof Error) {
            return res.status(500).json({Message: err.message})
        }
    }
    
}