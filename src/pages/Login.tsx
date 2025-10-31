// src/pages/Login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../hooks/useAuth";
import {
    LoginContainer,
    LoginCard,
    Title,
    Form,
    Input,
    LoginButton,
    ErrorMessage,
    SignupLink,
} from "../styles/pages/Login.styles";

const API_URL = import.meta.env.VITE_SERVER_URL;

export default function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();

    // 이메일 형식 검증 함수
    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // 이메일 형식 검증
        if (!isValidEmail(email)) {
            setError("올바른 이메일 형식을 입력해주세요.");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(`${API_URL}/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "로그인 실패");
            } else {
                login(data.token, data.user);
                navigate("/");
            }
        } catch (err) {
            console.error(err);
            setError("서버와 연결할 수 없습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <LoginContainer>
                <LoginCard>
                    <Title>로그인</Title>
                    <Form onSubmit={handleSubmit}>
                        <Input
                            type="email"
                            placeholder="이메일"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Input
                            type="password"
                            placeholder="비밀번호"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <LoginButton type="submit" disabled={loading}>
                            {loading ? "로그인 중..." : "로그인"}
                        </LoginButton>
                        {error && <ErrorMessage>{error}</ErrorMessage>}
                    </Form>
                    <SignupLink>
                        계정이 없으신가요?{" "}
                        <a onClick={() => navigate("/signup")} style={{ cursor: "pointer" }}>
                            회원가입
                        </a>
                    </SignupLink>
                </LoginCard>
            </LoginContainer>
            <Footer />
        </>
    );
}
