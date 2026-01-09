"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_middleware_1 = __importDefault(require("../middlewares/user.middleware"));
const product_controller_1 = require("../controllers/product.controller");
const router = express_1.default.Router();
router.get("/", user_middleware_1.default, product_controller_1.getProducts);
router.post("/", user_middleware_1.default, product_controller_1.createProducts);
// router.delete("/products/:id", authenticateUser, deleteProduct)
// router.put("/products/:id", authenticateUser, updateProducts)
exports.default = router;
