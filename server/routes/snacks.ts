import { Router } from "express";
import { createGetAllHandler } from "../db/dbHandlers";

const router = Router();

router.get("/", createGetAllHandler("snacks", ["id", "title", "thumbnail_file_name", "link", "category", "author", "license", "views", "created_at"]));

export default router;
