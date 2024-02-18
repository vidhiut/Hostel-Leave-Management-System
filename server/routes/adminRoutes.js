import { Router } from "express";
import { getAllApplications, getAllStudents, getProfile, updateApplicationById, updateProfile } from "../controllers/adminController.js";
const router = Router();


router.get('/profile',getProfile);
router.put('/profile',updateProfile);
router.get('/students',getAllStudents);
router.get('/applications',getAllApplications);
router.patch('/application/:id',updateApplicationById);


export default router;