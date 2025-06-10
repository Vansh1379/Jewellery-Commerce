import { Router } from "express";
import {
  getAllProducts,
  getProductsByCategory,
  productAdd,
  deleteProduct, // Added the delete product import
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
router.delete("/product/:id", deleteProduct); // Added delete product route

// HomePage Banner Routes
router.post("/home-banner", upload.single("image"), addHomeBannerOption1); // Add new banner
router.get("/home-banners", getHomeBannersOption1); // Get all banners
// Fixed: Changed :bannerId to :position to match the controller
router.delete("/home-banner/:position", deleteHomeBannerOption1); // Delete specific banner

// AboutPage Routes
router.post("/about-page", upload.single("image"), addOrUpdateAboutPage);
router.get("/about-page", getAboutPage);
router.put("/about-banner", upload.single("image"), updateAboutBanner);

export default router;
