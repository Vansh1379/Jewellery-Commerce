import { PrismaClient } from "@prisma/client";
import { Request, response, Response } from "express";

const prisma = new PrismaClient();

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
      msg: "Error in het product api",
    });
    console.log(err);
  }
};

// GET /api/products/category/:category
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

export const deleteProducts = async (req: Request, res: Response) => {};
