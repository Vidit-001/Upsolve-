import express, { urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { Request, Response, NextFunction } from "express";

const app = express();

// CORS configuration for production - allow all origins for now
const corsOrigins = process.env.CORS_ORIGIN === "*" 
  ? true 
  : process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL, process.env.CORS_ORIGIN].filter(Boolean) as string[]
    : [process.env.CORS_ORIGIN || "http://localhost:3000"];

app.use(cors({
    origin: corsOrigins,
    credentials: true
}));

app.use(express.json({limit : "50mb"}));
app.use(urlencoded({extended : true, limit : "50mb"}));
app.use(express.static('public'));
app.use(cookieParser());

// Health check endpoint for Render
app.get('/api/health', (req: Request, res: Response) => {
    res.status(200).json({ 
        status: 'OK', 
        message: 'LeetCode Helper Backend is running',
        timestamp: new Date().toISOString()
    });
});
 
// Routes import 
import leetcodeRouter from './routes/profile.routes.js';
import tagRouter from './routes/tag.routes.js';
import problemRouter from './routes/problem.routes.js';

// routes declaration
app.use("/api/v1/profile", leetcodeRouter);
app.use("/api/v1/tags", tagRouter);
app.use("/api/v1/problems", problemRouter);

export {app};
