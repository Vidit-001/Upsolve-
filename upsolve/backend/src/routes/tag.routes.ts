import express from "express";
import { getUserTags } from "../controllers/tag.controllers.js";

const tagRouter = express.Router();

// GET /api/tags/:username
tagRouter.get("/:username", getUserTags);

export default tagRouter;
