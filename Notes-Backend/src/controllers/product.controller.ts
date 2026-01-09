import { Request, Response } from "express"
import logger from "../logger/logger"
import productModel from "../models/products.model";

export async function getProducts(req: Request, res: Response) {
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
}

const [products, total] = await Promise.all([
    productModel.find(filter).skip(skip).limit(limit1),
    productModel.countDocuments(filter),
  ])
  res.json({
    data: products,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(total / limit1),
      totalItems: total,
    },
  })

    
//   logger.info("Query data received", JSON.stringify(data))
//   console.log(data);
}

export async function createProducts(req: Request, res: Response){

   try {
    const { title, amount, category, notes } = req.body

    // 🔐 Basic validation
    if (!title || !category || typeof amount !== "number") {
      return res.status(400).json({
        message: "Invalid product data",
      })
    }

    const product = await productModel.create({
      title,
      amount,
      category,
      notes,
    })

    res.status(201).json({
      message: "Product created successfully",
      data: product,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "Failed to create product",
    })
  }
}