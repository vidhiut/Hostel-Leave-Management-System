import { Router } from "express";
const router = Router();

import { studentRegister, studentLogin,parentRegister,parentLogin,wardenRegister,wardenLogin } from "../controllers/authContoller.js";

//-------------------Registration-------------------------

router.post("/student-register", studentRegister);
router.post("/parent-register", parentRegister);
router.post("/warden-register", wardenRegister);

//---------------------Login--------------------------

router.post("/student-login", studentLogin);
router.post("/parent-login", parentLogin);
router.post("/warden-login", wardenLogin);

export default router;
