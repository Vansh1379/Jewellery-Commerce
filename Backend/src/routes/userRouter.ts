import { Router } from "express";
import { loginAuth, signupAuth } from "../controllers/userAuth";

const router = Router();

router.post("/signup", signupAuth);
router.post("/login", loginAuth);

export default router;
