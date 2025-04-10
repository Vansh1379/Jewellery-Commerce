import { Router } from "express";
import { getAllProducts, productAdd } from "../controllers/Product";

const router = Router();

router.post("/add", productAdd);
router.get("/products", getAllProducts);

export default router;
