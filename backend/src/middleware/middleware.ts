import asyncHandler from "../utils/asynsHandler";
import { Request, NextFunction } from "express";
import ApiError from "../utils/ApiError";
import jwt  from "jsonwebtoken";
import { getUserById } from "../services/service";

// Extend Express Request interface to include 'user'
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const verifyToken = asyncHandler(async (req: Request, _:any, next: NextFunction) => {
     const authHeader = req.header("Authorization");
     const token = req.cookies?.accessToken || (authHeader ? authHeader.replace("Bearer ", "") : null);

     if (!token) {
         throw new ApiError(401, "Authorization token required");
     }

     const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
        if (!decodeToken) {
            throw new ApiError(403, "Invalid or expired token");
        }

        let user;
        if (typeof decodeToken === "object" && "_id" in decodeToken) {
            user = await getUserById((decodeToken as any)._id);
        } else {
            throw new ApiError(403, "Invalid token payload");
        }

        req.user = user; // Attach user info to request object       
        next();
})

export default verifyToken;