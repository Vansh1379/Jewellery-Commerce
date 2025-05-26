import { PrismaClient } from "../generated/prisma";
import { Request, Response } from "express";

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

    await prisma.product.create({
      data: {
        name,
        catageory: category,
        img: imageUrl,
      },
    });

    res.status(200).json({ msg: "Product added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error occurred in product add API" });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      msg: "Theese Are products",
    });
  } catch (err) {
    res.status(500).json({
      msg: "Error in het product api",
    });
    console.log(err);
  }
};
