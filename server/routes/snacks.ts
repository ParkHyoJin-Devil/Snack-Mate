import { Router } from "express";
import { createGetAllHandler } from "../db/dbHandlers";

const router = Router();

router.get("/", createGetAllHandler("snacks"));

export default router;
