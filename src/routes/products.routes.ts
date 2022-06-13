import { Router } from "express";
import { createProduct, getAllProducts, updateProducts, deleteProduct, getOneProduct } from "../controllers/products.controller";

const router = Router()

router.post('/products', createProduct)

router.get('/products', getAllProducts)

router.get('/products/:id', getOneProduct)

router.put('/products/:id', updateProducts)

router.delete('/products/:id', deleteProduct)


export default router