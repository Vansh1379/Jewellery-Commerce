import { Router } from "express";
import userRouter from "./userRouter";
import productRoute from "./productRoute";

const router = Router();

router.use("/user", userRouter);
router.use("/product", productRoute);

export default router;
