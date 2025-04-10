import { PrismaClient } from "../generated/prisma";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

//............................................................

export const signupAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const createPayload = req.body;

    const userExist = await prisma.user.findFirst({
      where: { email: createPayload.email },
    });

    if (userExist) {
      res.status(409).json({
        msg: "user already exist!, Please login",
      });
    }

    const newUser = await prisma.user.create({
      data: {
        email: createPayload.email,
        password: createPayload.password,
      },
    });

    const token = jwt.sign(
      {
        data: newUser.id,
      },
      "Secret",
      { expiresIn: "5h" }
    );

    res.status(201).json({
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
      },
    });
  } catch (err) {
    res.status(500).json({
      msg: "Error occured in singup auth",
    });
    console.log(err);
  }
};

//..................................................................................................................................
export const loginAuth = async (req: Request, res: Response) => {
  try {
    const createPayload = req.body;

    const userExist = await prisma.user.findFirst({
      where: {
        email: createPayload.email,
        password: createPayload.password,
      },
    });

    if (userExist) {
      const token = jwt.sign(
        {
          data: userExist.id,
        },
        "secret",
        { expiresIn: "5hr" }
      );

      res.status(201).json({
        token,
        msg: "user logined successfully",
      });
    }
  } catch (err) {
    res.status(500).json({
      msg: "Error occured in login auth",
    });
    console.log(err);
  }
};
