import { Router } from "express";
import { getRecentSubmissions,getRecentProblemNumbers } from "../controllers/problem.controllers.js";

const problemRouter = Router();

// GET /api/leetcode/recent/:username?limit=20
problemRouter.route("/recent/:username").get(getRecentSubmissions);
problemRouter.route("/recent-problems/:username").get(getRecentProblemNumbers);

export default problemRouter;
