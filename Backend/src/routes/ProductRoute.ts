import { Router } from "express";
import {
  getAllProducts,
  getProductsByCategory,
  productAdd,
} from "../controllers/Product";
import { upload } from "../middlewares/upload";

const router = Router();

router.post("/add", upload.single("image"), productAdd);
router.get("/products", getAllProducts);
router.get("/category/:category", getProductsByCategory);

export default router;
