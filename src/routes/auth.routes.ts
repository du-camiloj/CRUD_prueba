import { Router } from "express";
import { login } from "../controllers/users.controller";
import passport from "passport";
const router = Router()


router.post('/login', passport.authenticate('jwt', {session: false}) ,login)
export default router