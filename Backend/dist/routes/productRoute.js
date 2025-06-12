"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Product_1 = require("../controllers/Product");
const upload_1 = require("../middlewares/upload");
const router = (0, express_1.Router)();
// Product Routes
router.post("/add", upload_1.upload.single("image"), Product_1.productAdd);
router.get("/products", Product_1.getAllProducts);
router.get("/category/:category", Product_1.getProductsByCategory);
router.delete("/product/:id", Product_1.deleteProduct); // Added delete product route
// HomePage Banner Routes
router.post("/home-banner", upload_1.upload.single("image"), Product_1.addHomeBannerOption1); // Add new banner
router.get("/home-banners", Product_1.getHomeBannersOption1); // Get all banners
// Fixed: Changed :bannerId to :position to match the controller
router.delete("/home-banner/:position", Product_1.deleteHomeBannerOption1); // Delete specific banner
// AboutPage Routes
router.post("/about-page", upload_1.upload.single("image"), Product_1.addOrUpdateAboutPage);
router.get("/about-page", Product_1.getAboutPage);
router.put("/about-banner", upload_1.upload.single("image"), Product_1.updateAboutBanner);
exports.default = router;
