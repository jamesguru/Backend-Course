import { Router } from "express";
import { CreateAppointment } from "../Controllers/appointment";
import { VerifyToken } from "../Middlewares/verifyToken";


const router = Router();


router.post('/',CreateAppointment)


export default router;