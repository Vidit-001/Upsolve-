import { Router } from "express";
import { getProfile } from "../controllers/profile.controllers.js";

const leetcodeRouter = Router();

// Public route - fetch LeetCode profile by username
leetcodeRouter
  .route("/:username")
  .get(getProfile);

export default leetcodeRouter;
