import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
    SignupContainer,
    SignupCard,
    Title,
    Subtitle,
    Form,
    InputGroup,
    Label,
    Input,
    PasswordContainer,
    PasswordToggle,
    SubmitButton,
    ErrorMessage,
    SuccessMessage,
    LoginLink,
    PasswordStrength,
    StrengthBar,
    FieldError,
} from "../styles/pages/Signup.styles";

const API_URL = import.meta.env.VITE_SERVER_URL;

interface FormErrors {
    email?: string;
    nickname?: string;
    password?: string;
    confirmPassword?: string;
    verificationCode?: string;
}

const SignupPage: React.FC = () => {
    const [formData, setFormData] = useState({
        email: "",
        nickname: "",
        password: "",
        confirmPassword: "",
        verificationCode: "",
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [generalError, setGeneralError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [isSendingCode, setIsSendingCode] = useState(false);
    const [verificationSent, setVerificationSent] = useState(false);

    // 비밀번호 강도 계산
    const calculatePasswordStrength = (password: string): number => {
        let strength = 0;
        if (password.length >= 8) strength += 30;
        if (/[a-zA-Z]/.test(password)) strength += 30; // 문자 포함
        if (/[0-9]/.test(password)) strength += 30; // 숫자 포함

        // 보너스 점수 (선택사항)
        if (/[A-Z]/.test(password)) strength += 5; // 대문자 포함 (보너스)
        if (/[a-z]/.test(password)) strength += 5; // 소문자 포함 (보너스)
        if (/[^A-Za-z0-9]/.test(password)) strength += 5; // 특수문자 포함 (보너스)

        return Math.min(strength, 100); // 최대 100%로 제한
    };

    const getPasswordStrengthText = (strength: number): string => {
        if (strength < 30) return "약함";
        if (strength < 70) return "보통";
        return "강함";
    };

    // 이메일 유효성 검사
    const validateEmail = (email: string): string | undefined => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) return "이메일을 입력해주세요.";
        if (!emailRegex.test(email)) return "올바른 이메일 형식이 아닙니다.";
        return undefined;
    };

    // 닉네임 유효성 검사
    const validateNickname = (nickname: string): string | undefined => {
        if (!nickname.trim()) return "닉네임을 입력해주세요.";
        if (nickname.trim().length < 2) return "닉네임은 2자 이상이어야 합니다.";
        if (nickname.trim().length > 20) return "닉네임은 20자 이하여야 합니다.";
        const nicknameRegex = /^[a-zA-Z0-9가-힣_]+$/;
        if (!nicknameRegex.test(nickname.trim())) return "닉네임은 영문, 한글, 숫자, 언더스코어만 사용 가능합니다.";
        return undefined;
    };

    // 비밀번호 유효성 검사
    const validatePassword = (password: string): string | undefined => {
        if (!password) return "비밀번호를 입력해주세요.";
        if (password.length < 8) return "비밀번호는 8자 이상이어야 합니다.";
        // 문자와 숫자 조합만 확인 (대소문자 구분은 선택사항)
        if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(password)) {
            return "비밀번호는 문자와 숫자를 포함해야 합니다.";
        }
        return undefined;
    };

    // 비밀번호 확인 유효성 검사
    const validateConfirmPassword = (password: string, confirmPassword: string): string | undefined => {
        if (!confirmPassword) return "비밀번호 확인을 입력해주세요.";
        if (password !== confirmPassword) return "비밀번호가 일치하지 않습니다.";
        return undefined;
    };

    // 인증번호 유효성 검사
    const validateVerificationCode = (code: string): string | undefined => {
        if (!code) return "인증번호를 입력해주세요.";
        if (code.length !== 6) return "인증번호는 6자리입니다.";
        if (!/^\d{6}$/.test(code)) return "인증번호는 숫자만 입력 가능합니다.";
        return undefined;
    };

    // 폼 유효성 검사
    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        newErrors.email = validateEmail(formData.email);
        newErrors.nickname = validateNickname(formData.nickname);
        newErrors.password = validatePassword(formData.password);
        newErrors.confirmPassword = validateConfirmPassword(formData.password, formData.confirmPassword);

        // 이메일 인증이 완료되지 않았으면 에러
        if (!isEmailVerified) {
            newErrors.verificationCode = "이메일 인증을 완료해주세요.";
        }

        setErrors(newErrors);
        return !Object.values(newErrors).some((error) => error !== undefined);
    };

    const handleInputChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFormData((prev) => ({ ...prev, [field]: value }));

        // 실시간 유효성 검사
        if (errors[field]) {
            let error: string | undefined;
            switch (field) {
                case "email":
                    error = validateEmail(value);
                    break;
                case "nickname":
                    error = validateNickname(value);
                    break;
                case "password":
                    error = validatePassword(value);
                    break;
                case "confirmPassword":
                    error = validateConfirmPassword(formData.password, value);
                    break;
                case "verificationCode":
                    error = validateVerificationCode(value);
                    break;
            }
            setErrors((prev) => ({ ...prev, [field]: error }));
        }
    };

    // 이메일 인증번호 발송
    const sendVerificationCode = async () => {
        if (!formData.email) {
            setErrors((prev) => ({ ...prev, email: "이메일을 먼저 입력해주세요." }));
            return;
        }

        const emailError = validateEmail(formData.email);
        if (emailError) {
            setErrors((prev) => ({ ...prev, email: emailError }));
            return;
        }

        setIsSendingCode(true);
        setErrors((prev) => ({ ...prev, email: undefined }));

        try {
            const res = await fetch(`${API_URL}/api/email/send-verification`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: formData.email }),
            });

            const data = await res.json();

            if (!res.ok) {
                setGeneralError(data.message || "인증번호 발송에 실패했습니다.");
            } else {
                setVerificationSent(true);
                setGeneralError("");
                setSuccessMessage("인증번호가 발송되었습니다. 이메일을 확인해주세요.");
            }
        } catch (err) {
            console.error(err);
            setGeneralError("서버와 연결할 수 없습니다. 잠시 후 다시 시도해주세요.");
        } finally {
            setIsSendingCode(false);
        }
    };

    // 인증번호 검증
    const verifyCode = async () => {
        const codeError = validateVerificationCode(formData.verificationCode);
        if (codeError) {
            setErrors((prev) => ({ ...prev, verificationCode: codeError }));
            return;
        }

        setIsLoading(true);
        setErrors((prev) => ({ ...prev, verificationCode: undefined }));

        try {
            const res = await fetch(`${API_URL}/api/email/verify-code`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: formData.email,
                    code: formData.verificationCode,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setErrors((prev) => ({ ...prev, verificationCode: data.message || "인증번호가 일치하지 않습니다." }));
            } else {
                setIsEmailVerified(true);
                setSuccessMessage("이메일 인증이 완료되었습니다!");
                setGeneralError("");
            }
        } catch (err) {
            console.error(err);
            setGeneralError("서버와 연결할 수 없습니다. 잠시 후 다시 시도해주세요.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setGeneralError("");
        setSuccessMessage("");

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            const res = await fetch(`${API_URL}/api/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: formData.email.trim(),
                    password: formData.password,
                    nickname: formData.nickname.trim(),
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setGeneralError(data.message || "회원가입에 실패했습니다.");
            } else {
                setSuccessMessage("회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.");
                localStorage.setItem("token", data.token);

                // 2초 후 홈으로 이동
                setTimeout(() => {
                    window.location.href = "/";
                }, 2000);
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error(err.message);
                setGeneralError("서버와 연결할 수 없습니다. 잠시 후 다시 시도해주세요.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const passwordStrength = calculatePasswordStrength(formData.password);

    return (
        <>
            <Header />
            <SignupContainer>
                <SignupCard>
                    <Title>회원가입</Title>
                    <Subtitle>스낵 메이트에 오신 것을 환영합니다!</Subtitle>

                    <Form onSubmit={handleSubmit}>
                        <InputGroup>
                            <Label htmlFor="email">이메일 *</Label>
                            <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange("email")}
                                    placeholder="example@email.com"
                                    className={errors.email ? "error" : ""}
                                    style={{ flex: 1 }}
                                />
                                <button
                                    type="button"
                                    onClick={sendVerificationCode}
                                    disabled={isSendingCode || isEmailVerified}
                                    style={{
                                        padding: "0.75rem 1rem",
                                        background: isEmailVerified
                                            ? "#28a745"
                                            : "linear-gradient(135deg, #4a2c2a 0%, #663333 100%)",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "8px",
                                        cursor: isSendingCode || isEmailVerified ? "not-allowed" : "pointer",
                                        fontSize: "0.8rem",
                                        fontWeight: "500",
                                        whiteSpace: "nowrap",
                                        opacity: isSendingCode || isEmailVerified ? 0.7 : 1,
                                        transition: "all 0.3s ease",
                                    }}
                                >
                                    {isSendingCode ? "발송 중..." : isEmailVerified ? "인증완료" : "인증번호 발송"}
                                </button>
                            </div>
                            {errors.email && <FieldError>{errors.email}</FieldError>}
                        </InputGroup>

                        {verificationSent && !isEmailVerified && (
                            <InputGroup>
                                <Label htmlFor="verificationCode">인증번호 *</Label>
                                <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                                    <Input
                                        id="verificationCode"
                                        type="text"
                                        value={formData.verificationCode}
                                        onChange={handleInputChange("verificationCode")}
                                        placeholder="6자리 인증번호"
                                        className={errors.verificationCode ? "error" : ""}
                                        style={{ flex: 1 }}
                                        maxLength={6}
                                    />
                                    <button
                                        type="button"
                                        onClick={verifyCode}
                                        disabled={isLoading}
                                        style={{
                                            padding: "0.75rem 1rem",
                                            background: "linear-gradient(135deg, #4a2c2a 0%, #663333 100%)",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "8px",
                                            cursor: isLoading ? "not-allowed" : "pointer",
                                            fontSize: "0.8rem",
                                            fontWeight: "500",
                                            whiteSpace: "nowrap",
                                            opacity: isLoading ? 0.7 : 1,
                                            transition: "all 0.3s ease",
                                        }}
                                    >
                                        {isLoading ? "확인 중..." : "인증 확인"}
                                    </button>
                                </div>
                                {errors.verificationCode && <FieldError>{errors.verificationCode}</FieldError>}
                            </InputGroup>
                        )}

                        <InputGroup>
                            <Label htmlFor="nickname">닉네임 *</Label>
                            <Input
                                id="nickname"
                                type="text"
                                value={formData.nickname}
                                onChange={handleInputChange("nickname")}
                                placeholder="사용할 닉네임을 입력하세요"
                                className={errors.nickname ? "error" : ""}
                            />
                            {errors.nickname && <FieldError>{errors.nickname}</FieldError>}
                        </InputGroup>

                        <InputGroup>
                            <Label htmlFor="password">비밀번호 *</Label>
                            <PasswordContainer>
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={handleInputChange("password")}
                                    placeholder="8자 이상, 문자와 숫자 포함 (대소문자 권장)"
                                    className={errors.password ? "error" : ""}
                                />
                                <PasswordToggle type="button" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? "숨기기" : "보기"}
                                </PasswordToggle>
                            </PasswordContainer>
                            {formData.password && (
                                <PasswordStrength>
                                    비밀번호 강도: {getPasswordStrengthText(passwordStrength)}
                                    <StrengthBar>
                                        <div
                                            className={`strength-fill ${
                                                passwordStrength < 30
                                                    ? "strength-weak"
                                                    : passwordStrength < 70
                                                    ? "strength-medium"
                                                    : "strength-strong"
                                            }`}
                                            style={{ width: `${passwordStrength}%` }}
                                        />
                                    </StrengthBar>
                                </PasswordStrength>
                            )}
                            {errors.password && <FieldError>{errors.password}</FieldError>}
                        </InputGroup>

                        <InputGroup>
                            <Label htmlFor="confirmPassword">비밀번호 확인 *</Label>
                            <PasswordContainer>
                                <Input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange("confirmPassword")}
                                    placeholder="비밀번호를 다시 입력하세요"
                                    className={errors.confirmPassword ? "error" : ""}
                                />
                                <PasswordToggle
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? "숨기기" : "보기"}
                                </PasswordToggle>
                            </PasswordContainer>
                            {errors.confirmPassword && <FieldError>{errors.confirmPassword}</FieldError>}
                        </InputGroup>

                        {generalError && <ErrorMessage>{generalError}</ErrorMessage>}
                        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}

                        <SubmitButton type="submit" disabled={isLoading || !isEmailVerified}>
                            {isLoading ? "가입 중..." : isEmailVerified ? "회원가입" : "이메일 인증 후 가입 가능"}
                        </SubmitButton>
                    </Form>

                    <LoginLink>
                        이미 계정이 있으신가요? <Link to="/login">로그인하기</Link>
                    </LoginLink>
                </SignupCard>
            </SignupContainer>
            <Footer />
        </>
    );
};

export default SignupPage;
