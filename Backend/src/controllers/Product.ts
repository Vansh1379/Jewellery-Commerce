import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// Existing Product APIs
export const productAdd = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, category } = req.body;
    const file = req.file;
    console.log(req.file);
    console.log(req.body);

    if (!file || !name || !category) {
      res.status(400).json({ msg: "All fields are required" });
      return;
    }

    const imageUrl = file.path;
    console.log(imageUrl);

    const response = await prisma.product.create({
      data: {
        name,
        catageory: category,
        img: imageUrl,
      },
    });

    console.log(response);
    res.status(200).json({ msg: "Product added successfully", imageUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error occurred in product add API" });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json({ products });
  } catch (err) {
    res.status(500).json({
      msg: "Error in get product api",
    });
    console.log(err);
  }
};

export const getProductsByCategory = async (req: Request, res: Response) => {
  const category = req.params.category;
  try {
    const products = await prisma.product.findMany({
      where: {
        catageory: category,
      },
    });
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching products by category" });
  }
};

// Updated Delete Product API
export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ msg: "Product ID is required" });
      return;
    }

    // Convert string id to number since your Prisma schema uses Int
    const productId = parseInt(id);

    if (isNaN(productId)) {
      res.status(400).json({ msg: "Invalid product ID" });
      return;
    }

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      res.status(404).json({ msg: "Product not found" });
      return;
    }

    // Delete the product
    await prisma.product.delete({
      where: { id: productId },
    });

    res.status(200).json({
      msg: "Product deleted successfully",
      deletedProductId: productId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error occurred while deleting product" });
  }
};

export const addHomeBannerOption1 = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { position } = req.body; // "1" or "2"
    const file = req.file;

    if (!file || !position || !["1", "2"].includes(position)) {
      res
        .status(400)
        .json({ msg: "Banner image and position (1 or 2) are required" });
      return;
    }

    const bannerUrl = file.path;

    // Get or create homepage
    let homePage = await prisma.homePage.findFirst();

    if (!homePage) {
      homePage = await prisma.homePage.create({
        data: {
          banner1: position === "1" ? bannerUrl : null,
          banner2: position === "2" ? bannerUrl : null,
        },
      });
    } else {
      // Update specific banner position
      const updateData =
        position === "1" ? { banner1: bannerUrl } : { banner2: bannerUrl };

      homePage = await prisma.homePage.update({
        where: { id: homePage.id },
        data: updateData,
      });
    }

    res.status(200).json({
      msg: `Banner ${position} updated successfully`,
      bannerUrl,
      homePage,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error occurred in banner API" });
  }
};

export const deleteHomeBannerOption1 = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { position } = req.params; // "1" or "2"

    if (!["1", "2"].includes(position)) {
      res.status(400).json({ msg: "Position must be 1 or 2" });
      return;
    }

    const homePage = await prisma.homePage.findFirst();

    if (!homePage) {
      res.status(404).json({ msg: "HomePage not found" });
      return;
    }

    const updateData = position === "1" ? { banner1: null } : { banner2: null };

    const updatedHomePage = await prisma.homePage.update({
      where: { id: homePage.id },
      data: updateData,
    });

    res.status(200).json({
      msg: `Banner ${position} deleted successfully`,
      homePage: updatedHomePage,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error deleting banner" });
  }
};

export const getHomeBannersOption1 = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const homePage = await prisma.homePage.findFirst();

    if (!homePage) {
      res.status(404).json({ msg: "HomePage not found" });
      return;
    }

    res.status(200).json({
      banner1: homePage.banner1,
      banner2: homePage.banner2,
      homePage,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching banners" });
  }
};

export const getHomeBanner = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const homePage = await prisma.homePage.findFirst();

    if (!homePage) {
      res.status(404).json({ msg: "Home banner not found" });
      return;
    }

    res.status(200).json({ banner: homePage.banner1 && homePage.banner2 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching home banner" });
  }
};

// AboutPage APIs
export const addOrUpdateAboutPage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      title,
      description1,
      description2,
      description3,
      whatWeDoTitle,
      whatWeDoDescription1,
      whatWeDoDescription2,
    } = req.body;

    const file = req.file;

    if (
      !file ||
      !title ||
      !description1 ||
      !whatWeDoTitle ||
      !whatWeDoDescription1 ||
      !whatWeDoDescription2
    ) {
      res.status(400).json({
        msg: "Banner image, title, description1, whatWeDoTitle, whatWeDoDescription1, and whatWeDoDescription2 are required",
      });
      return;
    }

    const bannerUrl = file.path;

    // Check if about page already exists
    const existingAboutPage = await prisma.aboutPage.findFirst();

    if (existingAboutPage) {
      // Update existing about page
      const response = await prisma.aboutPage.update({
        where: { id: existingAboutPage.id },
        data: {
          Banner: bannerUrl,
          title,
          description1,
          description2: description2 || null,
          description3: description3 || null,
          whatWeDoTitle,
          whatWeDoDescription1,
          whatWeDoDescription2,
          img: bannerUrl, // Using same image for both Banner and img fields
        },
      });
      res.status(200).json({
        msg: "About page updated successfully",
        data: response,
      });
    } else {
      // Create new about page entry
      const response = await prisma.aboutPage.create({
        data: {
          Banner: bannerUrl,
          title,
          description1,
          description2: description2 || null,
          description3: description3 || null,
          whatWeDoTitle,
          whatWeDoDescription1,
          whatWeDoDescription2,
          img: bannerUrl, // Using same image for both Banner and img fields
        },
      });
      res.status(200).json({
        msg: "About page added successfully",
        data: response,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error occurred in about page API" });
  }
};

export const getAboutPage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const aboutPage = await prisma.aboutPage.findFirst();

    if (!aboutPage) {
      res.status(404).json({ msg: "About page not found" });
      return;
    }

    res.status(200).json({ aboutPage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching about page" });
  }
};

// Update About Page Banner Only
export const updateAboutBanner = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const file = req.file;

    if (!file) {
      res.status(400).json({ msg: "Banner image is required" });
      return;
    }

    const bannerUrl = file.path;

    // Check if about page exists
    const existingAboutPage = await prisma.aboutPage.findFirst();

    if (!existingAboutPage) {
      res.status(404).json({
        msg: "About page not found. Please create the about page first.",
      });
      return;
    }

    // Update only the banner
    const response = await prisma.aboutPage.update({
      where: { id: existingAboutPage.id },
      data: {
        Banner: bannerUrl,
        img: bannerUrl, // Update img field as well
      },
    });

    res.status(200).json({
      msg: "About page banner updated successfully",
      bannerUrl,
      data: response,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error occurred in about banner update API" });
  }
};
