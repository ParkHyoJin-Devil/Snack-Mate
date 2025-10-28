import { Router } from "express";
import nodemailer from "nodemailer";
import { db } from "../db";

const router = Router();

// 이메일 발송을 위한 transporter 설정 (Gmail 예시)
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER || "your-email@gmail.com", // 환경변수에서 이메일 주소
        pass: process.env.EMAIL_PASS || "your-app-password", // 환경변수에서 앱 비밀번호
    },
});

// 이메일 설정 확인
const isEmailConfigured = () => {
    return (
        process.env.EMAIL_USER &&
        process.env.EMAIL_PASS &&
        process.env.EMAIL_USER !== "your-email@gmail.com" &&
        process.env.EMAIL_PASS !== "your-app-password"
    );
};

// 인증번호 저장용 임시 테이블 (실제로는 Redis나 별도 테이블 사용 권장)
const verificationCodes = new Map<string, { code: string; expires: number }>();

// 이메일 인증번호 발송
router.post("/send-verification", async (req, res) => {
    try {
        const { email } = req.body;

        // 이메일 형식 검증
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "올바른 이메일 형식이 아닙니다." });
        }

        // 이미 가입된 이메일인지 확인
        const [existingUsers] = await db.query("SELECT id FROM users WHERE email = ?", [email]);
        if (existingUsers.length > 0) {
            return res.status(400).json({ message: "이미 가입된 이메일입니다." });
        }

        // 6자리 인증번호 생성
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        // 인증번호 저장 (5분 후 만료)
        verificationCodes.set(email, {
            code: verificationCode,
            expires: Date.now() + 5 * 60 * 1000, // 5분
        });

        // 이메일 발송
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "[Snack Mate] 이메일 인증번호",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #4a2c2a;">🍿 Snack Mate 이메일 인증</h2>
                    <p>안녕하세요! Snack Mate 회원가입을 위한 이메일 인증번호입니다.</p>
                    <div style="background-color: #f5f5f5; padding: 20px; text-align: center; margin: 20px 0;">
                        <h1 style="color: #4a2c2a; font-size: 32px; margin: 0;">${verificationCode}</h1>
                    </div>
                    <p>위 인증번호를 회원가입 페이지에 입력해주세요.</p>
                    <p style="color: #666; font-size: 14px;">※ 인증번호는 5분 후 만료됩니다.</p>
                    <hr style="margin: 30px 0;">
                    <p style="color: #999; font-size: 12px;">이 이메일을 요청하지 않으셨다면 무시하셔도 됩니다.</p>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);

        res.json({
            message: "인증번호가 발송되었습니다. 이메일을 확인해주세요.",
            success: true,
        });
    } catch (error) {
        console.error("이메일 발송 실패:", error);

        // 더 구체적인 오류 메시지 제공
        let errorMessage = "이메일 발송에 실패했습니다.";
        if (error instanceof Error) {
            if (error.message.includes("Invalid login")) {
                errorMessage = "이메일 계정 설정이 올바르지 않습니다. 관리자에게 문의하세요.";
            } else if (error.message.includes("Connection timeout")) {
                errorMessage = "네트워크 연결에 문제가 있습니다. 잠시 후 다시 시도해주세요.";
            }
        }

        res.status(500).json({ message: errorMessage });
    }
});

// 인증번호 검증
router.post("/verify-code", async (req, res) => {
    try {
        const { email, code } = req.body;

        const storedData = verificationCodes.get(email);

        if (!storedData) {
            return res.status(400).json({ message: "인증번호를 먼저 요청해주세요." });
        }

        if (Date.now() > storedData.expires) {
            verificationCodes.delete(email);
            return res.status(400).json({ message: "인증번호가 만료되었습니다. 다시 요청해주세요." });
        }

        if (storedData.code !== code) {
            return res.status(400).json({ message: "인증번호가 일치하지 않습니다." });
        }

        // 인증 성공 - 인증번호 삭제
        verificationCodes.delete(email);

        res.json({
            message: "이메일 인증이 완료되었습니다.",
            success: true,
        });
    } catch (error) {
        console.error("인증번호 검증 실패:", error);
        res.status(500).json({ message: "인증번호 검증에 실패했습니다." });
    }
});

export default router;
