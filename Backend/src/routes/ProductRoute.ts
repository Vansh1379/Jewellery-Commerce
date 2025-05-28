import { Router } from "express";
import { getAllProducts, productAdd } from "../controllers/Product";
import { upload } from "../middlewares/upload";

const router = Router();

router.post("/add", upload.single("image"), productAdd);
router.get("/products", getAllProducts);
router.get(`/catageory/`, )

export default router;
