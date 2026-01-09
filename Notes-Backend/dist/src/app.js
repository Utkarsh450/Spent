"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const money_routes_1 = __importDefault(require("./routes/money.routes"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "https://spent-yr8d.vercel.app/",
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use("/api/auth", user_routes_1.default);
app.use("/api/products", money_routes_1.default);
exports.default = app;
