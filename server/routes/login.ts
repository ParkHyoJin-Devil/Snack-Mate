import { Router } from "express";
import { db } from "../db";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";
import { RowDataPacket } from "mysql2";

interface UserRow extends RowDataPacket {
    id: number;
    nickname: string;
    email: string;
    password: string;
}

const router = Router();

router.post("/", async (req, res) => {
    const { email, password } = req.body;

    try {
        // nickname, email도 같이 SELECT
        const [rows] = await db.query<UserRow[]>("SELECT id, nickname, email, password FROM users WHERE email = ?", [
            email,
        ]);

        if (rows.length === 0) {
            return res.status(401).json({ message: "유저 없음" });
        }

        const user = rows[0];

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ message: "비밀번호 틀림" });
        }

        const token = generateToken(user.id);

        // 클라이언트로 user 정보 전체 전송
        res.json({
            token,
            user: {
                id: user.id,
                nickname: user.nickname,
                email: user.email,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "로그인 실패" });
    }
});

export default router;
