import { Router } from "express";
import { CreateAppointment } from "../Controllers/appointment";

const router = Router();


router.post('/',CreateAppointment)


export default router;