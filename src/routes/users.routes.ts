import { Router } from "express";
import { createBuy, createUser } from "../controllers/users.controller";

const router = Router()

router.post('/users/buy', createBuy )

router.post('/users', createUser)


export default router