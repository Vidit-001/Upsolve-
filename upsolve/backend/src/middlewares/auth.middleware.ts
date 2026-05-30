
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import { Request, Response, NextFunction } from "express";
import { IUserDocument } from "../types/custom.js";

export const verifyJWT = asyncHandler(async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as { _id?: string };
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken") as IUserDocument | null;
        if (!user) {
            throw new ApiError(401, "Invalid access token");
        }
        (req as any).user = user;
        next();
    } catch (error: any) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});