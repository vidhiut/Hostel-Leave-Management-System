import { Router } from "express";
import { getApplications, getStudentProfile, submitApplication, updateStudentProfile } from "../controllers/studentController.js";
const router = Router();


router.get('/student-profile',getStudentProfile);
router.put('/student-profile',updateStudentProfile);
router.get('/application',getApplications);
router.post('/application',submitApplication);


export default router;