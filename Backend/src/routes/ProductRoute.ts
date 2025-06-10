import { Router } from "express";
import {
  getAllProducts,
  getProductsByCategory,
  productAdd,
  addHomeBannerOption1,
  getHomeBannersOption1,
  deleteHomeBannerOption1,
  addOrUpdateAboutPage,
  getAboutPage,
  updateAboutBanner,
} from "../controllers/Product";
import { upload } from "../middlewares/upload";

const router = Router();

// Product Routes
router.post("/add", upload.single("image"), productAdd);
router.get("/products", getAllProducts);
router.get("/category/:category", getProductsByCategory);

// HomePage Banner Routes (Option 2 - Recommended)
router.post("/home-banner", upload.single("image"), addHomeBannerOption1); // Add new banner
router.get("/home-banners", getHomeBannersOption1); // Get all banners
router.delete("/home-banner/:bannerId", deleteHomeBannerOption1); // Delete specific banner

// AboutPage Routes
router.post("/about-page", upload.single("image"), addOrUpdateAboutPage);
router.get("/about-page", getAboutPage);
router.put("/about-banner", upload.single("image"), updateAboutBanner);

export default router;
