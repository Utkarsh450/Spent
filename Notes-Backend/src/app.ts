import express, { Application } from "express"
import authRoutes from "./routes/user.routes"
import productRoutes from "./routes/money.routes";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path"

const app: Application = express()

app.use(express.json())

app.use(express.static( path.join(__dirname, "../public")))

app.use(cors({
    // origin: "https://spent-yr8d.vercel.app",
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(cookieParser());



app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes)
app.get("*name", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"))
})

export default app