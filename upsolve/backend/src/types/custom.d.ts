import { Request } from "express";
import { Document } from "mongoose";

// Extend Express Request to include user, files, and file
export interface AuthenticatedRequest extends Request {
  user?: any;
  files?: any;
  file?: any;
}

// Example: Extend Mongoose User Document for custom methods/properties
export interface IUserDocument extends Document {
  username: string;
  email: string;
  fullName: string;
  avatar: string;
  watchHistory: any[];
  password: string;
  refreshToken?: string;
  accessToken?: string;
  generateAccessToken?: () => string;
  generateRefreshToken?: () => string;
  isPasswordCorrect?: (password: string) => Promise<boolean>;
}
