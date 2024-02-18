import { Router } from "express";
import { getApplicationById, updateApplicationById } from "../controllers/parentController.js";
const router = Router();


router.get('/application/:id',getApplicationById);
router.patch('/application/:id',updateApplicationById);


export default router;