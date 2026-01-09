"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = getProducts;
exports.createProducts = createProducts;
const products_model_1 = __importDefault(require("../models/products.model"));
async function getProducts(req, res) {
    console.log(req.query);
    const { search, page, limit } = req.query;
    const limit1 = Number(limit);
    const skip = (Number(page) - 1) * Number(limit);
    const filter = {
        $or: [
            { title: { $regex: search, $options: "i" } },
            { month: { $regex: search, $options: "i" } },
            { category: { $regex: search, $options: "i" } },
            { amount: { $regex: search, $options: "i" } },
        ],
    };
    const [products, total] = await Promise.all([
        products_model_1.default.find(filter).skip(skip).limit(limit1),
        products_model_1.default.countDocuments(filter),
    ]);
    res.json({
        data: products,
        pagination: {
            currentPage: page,
            totalPages: Math.ceil(total / limit1),
            totalItems: total,
        },
    });
    //   logger.info("Query data received", JSON.stringify(data))
    //   console.log(data);
}
async function createProducts(req, res) {
    try {
        const { title, amount, category, notes } = req.body;
        // 🔐 Basic validation
        if (!title || !category || typeof amount !== "number") {
            return res.status(400).json({
                message: "Invalid product data",
            });
        }
        const product = await products_model_1.default.create({
            title,
            amount,
            category,
            notes,
        });
        res.status(201).json({
            message: "Product created successfully",
            data: product,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to create product",
        });
    }
}
