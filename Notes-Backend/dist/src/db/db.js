"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("../logger/logger"));
const connectToDB = () => {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
        throw new Error("MONGO_URI is not defined in environment variables");
    }
    mongoose_1.default
        .connect(mongoUri)
        .then(() => {
        logger_1.default.info("✅ Connected to MongoDB successfully");
    })
        .catch((err) => {
        logger_1.default.error("❌ Failed to connect to MongoDB", err);
        process.exit(1);
    });
};
exports.default = connectToDB;
