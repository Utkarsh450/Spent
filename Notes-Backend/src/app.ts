import express, { Application } from "express"
import authRoutes from "./routes/user.routes"
import productRoutes from "./routes/money.routes";
import cors from "cors";
import cookieParser from "cookie-parser";

const app: Application = express()

app.use(express.json())

app.use(cors({
    origin: "https://spent-yr8d-ds30pg5sw-utkarsh450s-projects.vercel.app",
    credentials: true,
}));
app.use(cookieParser());



app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes)

export default app