import express from "express";
import { loginController, logoutController, refreshTokenController, registerController } from "../controllers/user.controller";
import authenticateUser from "../middlewares/user.middleware";
const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/logout", authenticateUser, logoutController);
router.get("/@me", authenticateUser, (req, res) =>{
    res.status(200).json({message: "User is authenticated"})
});
router.post("/refresh", refreshTokenController);

export default router;