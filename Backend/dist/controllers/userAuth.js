"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAuth = exports.signupAuth = void 0;
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
//............................................................
const signupAuth = async (req, res, next) => {
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
        const token = jsonwebtoken_1.default.sign({
            data: newUser.id,
        }, "Secret", { expiresIn: "5h" });
        res.status(201).json({
            token,
            user: {
                id: newUser.id,
                email: newUser.email,
            },
        });
    }
    catch (err) {
        res.status(500).json({
            msg: "Error occured in singup auth",
        });
        console.log(err);
    }
};
exports.signupAuth = signupAuth;
//..................................................................................................................................
const loginAuth = async (req, res) => {
    try {
        const createPayload = req.body;
        const userExist = await prisma.user.findFirst({
            where: {
                email: createPayload.email,
                password: createPayload.password,
            },
        });
        if (userExist) {
            const token = jsonwebtoken_1.default.sign({
                data: userExist.id,
            }, "secret", { expiresIn: "5hr" });
            res.status(201).json({
                token,
                msg: "user logined successfully",
            });
        }
    }
    catch (err) {
        res.status(500).json({
            msg: "Error occured in login auth",
        });
        console.log(err);
    }
};
exports.loginAuth = loginAuth;
