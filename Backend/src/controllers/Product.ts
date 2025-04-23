import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const productAdd = async (req: Request, res: Response) => {
  try {
    const createPayload = req.body;

    res.status(200).json({ msg: "Product added successfully" });
  } catch (err) {
    res.status(500).json({
      msg: "Error occurred in product add API",
    });
    console.log(err);
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
