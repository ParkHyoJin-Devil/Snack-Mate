// server/routes/auth.ts
import { Router } from "express";
import { getUserByEmail, createUser } from "../db/dbHandlers";
import { generateToken } from "../utils/jwt";
import bcrypt from "bcrypt";

const router = Router();

// 회원가입
router.post("/register", async (req, res) => {
    try {
        const { email, password, nickname } = req.body;

        const existingUser = await getUserByEmail(email);
        if (existingUser) return res.status(400).json({ message: "이미 존재하는 이메일입니다." });

        const newUser = await createUser(email, password, nickname);

        const token = generateToken(newUser.id);
        res.status(201).json({ token, user: { id: newUser.id, email: newUser.email, nickname: newUser.nickname } });
    } catch (err) {
        console.error("회원가입 처리 중 오류:", err);
        res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
});

// 로그인 코드
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await getUserByEmail(email);

        if (!user) return res.status(404).json({ message: "회원정보가 없습니다." });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });

        const token = generateToken(user.id);
        res.json({ token, user: { id: user.id, email: user.email, nickname: user.nickname } });
    } catch (err) {
        console.error("로그인 처리 중 오류:", err);
        res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
});

export default router;
