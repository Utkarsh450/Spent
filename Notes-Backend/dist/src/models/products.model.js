"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
    },
    amount: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    month: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
        default: "",
        trim: true,
    },
}, { timestamps: true });
const productModel = mongoose_1.default.models.Products || mongoose_1.default.model("Products", productSchema);
exports.default = productModel;
