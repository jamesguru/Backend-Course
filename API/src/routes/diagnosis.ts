import { Router } from "express";
import { createDiagnosis, getDiagnosisForUser, updateDiagnosis } from "../Controllers/diagnosis";
import { VerifyToken } from "../Middlewares/verifyToken";


const router = Router();

router.post('/',createDiagnosis);
router.put('/:id',updateDiagnosis);
router.post('/user',getDiagnosisForUser)

export default router;