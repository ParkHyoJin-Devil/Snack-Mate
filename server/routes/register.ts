import { Router } from "express";
import { db } from "../db";
import { generateToken } from "../utils/jwt";
import { ResultSetHeader } from "mysql2";
import bcrypt from "bcrypt"; // ✅ 추가

const router = Router();

router.post("/", async (req, res) => {
    const { email, nickname, password } = req.body;

    try {
        // 1. 비밀번호 해시
        const hashedPassword = await bcrypt.hash(password, 10);

        // 2. DB에 저장 (해시된 비밀번호)
        const [result] = await db.query<ResultSetHeader>(
            "INSERT INTO users (email, nickname, password) VALUES (?, ?, ?)",
            [email, nickname, hashedPassword] // ✅ 평문 대신 해시
        );

        // 3. JWT 발급
        const userId = result.insertId;
        const token = generateToken(userId);

        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "회원가입 실패" });
    }
});

export default router;
