import { Router } from "express";
import { createGetAllHandler } from "../db/dbHandlers";

const router = Router();

// 전체 재료 조회
router.get("/", createGetAllHandler("ingredients"));

// 일부 재료만 조회
//router.get("/", createGetAllHandler("ingredients", ["id", "name", "url"]));

export default router;
