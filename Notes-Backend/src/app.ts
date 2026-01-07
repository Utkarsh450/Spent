import express, { Application } from "express"
import authRoutes from "./routes/user.routes"
import cors from "cors";
import cookieParser from "cookie-parser";

const app: Application = express()

app.use(express.json())

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(cookieParser());


app.use("/api/auth", authRoutes);


export default app