"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProducts = exports.getProductsByCategory = exports.getAllProducts = exports.productAdd = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const productAdd = async (req, res) => {
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
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Error occurred in product add API" });
    }
};
exports.productAdd = productAdd;
const getAllProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        res.status(200).json({ products });
    }
    catch (err) {
        res.status(500).json({
            msg: "Error in het product api",
        });
        console.log(err);
    }
};
exports.getAllProducts = getAllProducts;
// GET /api/products/category/:category
const getProductsByCategory = async (req, res) => {
    const category = req.params.category;
    try {
        const products = await prisma.product.findMany({
            where: {
                catageory: category,
            },
        });
        res.status(200).json(products);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Error fetching products by category" });
    }
};
exports.getProductsByCategory = getProductsByCategory;
const deleteProducts = async (req, res) => { };
exports.deleteProducts = deleteProducts;
