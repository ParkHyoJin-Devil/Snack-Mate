import { Router } from "express";
import { createGetAllHandler } from "../db/dbHandlers";

const router = Router();

// 전체 도구 조회
router.get("/", createGetAllHandler("tools"));

export default router;
