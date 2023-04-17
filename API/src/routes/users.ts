import { Router } from "express";
import { getUsers, signIn, signUp } from "../Controllers/users";
const router = Router();

router.post('/signup',signUp);
router.post('/signin',signIn);
router.get('/',getUsers)

export default router;