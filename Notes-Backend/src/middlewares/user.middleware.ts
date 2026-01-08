import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"

export function authenticateUser(req: Request, res: Response, next: NextFunction){
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({message: "Access Denied. No token provided."});
    }
    try{
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
        (req as any).user = decoded;
        next();
    } catch(err){
        return  res.status(401).json({message: "Invalid token."});
    }
}

export default authenticateUser;