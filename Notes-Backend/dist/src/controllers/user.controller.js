"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerController = registerController;
exports.loginController = loginController;
exports.logoutController = logoutController;
exports.refreshTokenController = refreshTokenController;
const user_model_1 = __importDefault(require("../models/user.model"));
const user_zod_1 = require("../validators/user.zod");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
async function registerController(req, res) {
    // ✅ 1. Validate first
    const parsed = user_zod_1.userZodSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            message: "Invalid input",
            errors: parsed.error.issues,
        });
    }
    // ✅ 2. Safe destructuring
    const { fullName, email, password } = parsed.data;
    // ✅ 3. Check existing user
    const existingUser = await user_model_1.default.findOne({ email });
    if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
    }
    // ✅ 4. Hash password
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    // ✅ 5. Create user
    const user = await user_model_1.default.create({
        fullName,
        email,
        password: hashedPassword,
    });
    // ✅ 6. Generate tokens (mongoose methods)
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    await user.save();
    // ✅ 7. Send cookies
    res
        .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
    })
        .json({ message: "User registered successfully", accessToken });
}
async function loginController(req, res) {
    const parsed = user_zod_1.userZodSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            message: "Invalid input",
            errors: parsed.error.issues,
        });
    }
    const { email, password } = parsed.data;
    const user = await user_model_1.default.findOne({ email }).select("+password");
    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    await user.save();
    // ✅ 7. Send cookies
    res
        .status(200)
        .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false, // 🔥 DEV
        sameSite: "lax",
        maxAge: 15 * 60 * 1000,
    })
        .json({ message: "User logged in successfully", user: { username: user.fullName, email: user.email }, accessToken });
}
async function logoutController(req, res) {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await user_model_1.default.findOne({ refreshToken })
        .select("+refreshToken");
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    // revoke refresh token
    user.refreshToken = undefined;
    await user.save();
    // clear cookies
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
    });
    return res.status(200).json({ message: "Logged out successfully" });
}
async function refreshTokenController(req, res) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ message: "Unauthorised" });
    }
    const user = await user_model_1.default.findOne({ refreshToken }).select("+refreshToken");
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    user.refreshToken = undefined;
    const newAccessToken = user.generateAccessToken();
    const newRefreshToken = user.generateRefreshToken();
    await user.save();
    res
        .cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false, // 🔥 localhost
        sameSite: "lax",
        maxAge: 15 * 60 * 1000,
    })
        .status(200)
        .json({ message: "Token refreshed", accessToken: newAccessToken });
}
