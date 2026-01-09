"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const user_middleware_1 = __importDefault(require("../middlewares/user.middleware"));
const router = express_1.default.Router();
router.post("/register", user_controller_1.registerController);
router.post("/login", user_controller_1.loginController);
router.get("/logout", user_middleware_1.default, user_controller_1.logoutController);
router.get("/@me", user_middleware_1.default, (req, res) => {
    res.status(200).json({ message: "User is authenticated" });
});
router.post("/refresh", user_controller_1.refreshTokenController);
exports.default = router;
