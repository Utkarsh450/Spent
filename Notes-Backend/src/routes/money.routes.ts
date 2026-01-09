import express from "express";
import authenticateUser from "../middlewares/user.middleware";
import { createProducts, getProducts } from "../controllers/product.controller";
const router = express.Router();

router.get("/", authenticateUser, getProducts)
router.post("/", authenticateUser, createProducts);

// router.delete("/products/:id", authenticateUser, deleteProduct)

// router.put("/products/:id", authenticateUser, updateProducts)

export default router;