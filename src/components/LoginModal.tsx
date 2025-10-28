import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import {
    ModalBackground,
    ModalContent,
    Title,
    FormContainer,
    Input,
    LoginButton,
    ExtraLinks,
    Link,
} from "../styles/components/LoginModal.styles";
import { useAuth } from "../hooks/useAuth";

const API_URL = import.meta.env.VITE_SERVER_URL;

interface LoginModalProps {
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { login } = useAuth(); // 토큰 저장 훅
    const navigate = useNavigate(); // 화면 전환

    // 이메일 형식 검증 함수
    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async () => {
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
            console.log("로그인 API 응답:", data);

            if (!res.ok) {
                setError(data.message || "로그인 실패");
            } else {
                login(data.token, data.user);
                onClose();
                // 현재 페이지에 머물도록 navigate 제거
            }
        } catch (err) {
            console.error(err);
            setError("서버와 연결할 수 없습니다.");
        } finally {
            setLoading(false);
        }
    };

    const modalContent = (
        <ModalBackground onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <Title>로그인</Title>
                <FormContainer>
                    <Input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <LoginButton onClick={handleSubmit} disabled={loading}>
                        {loading ? "로그인 중..." : "로그인"}
                    </LoginButton>
                    {error && <p style={{ color: "red", fontSize: "0.875rem" }}>{error}</p>}
                </FormContainer>
                <ExtraLinks>
                    계정이 없으신가요?{" "}
                    <Link
                        onClick={() => {
                            onClose();
                            navigate("/signup");
                        }}
                    >
                        회원가입
                    </Link>
                </ExtraLinks>
            </ModalContent>
        </ModalBackground>
    );

    return ReactDOM.createPortal(modalContent, document.body);
};

export default LoginModal;
