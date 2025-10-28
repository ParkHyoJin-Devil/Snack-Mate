import React, { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

// JWT 페이로드 타입 (실제로는 id만 들어있음)
interface JwtPayload {
    id: number;
    exp: number;
}

export interface AuthContextType {
    token: string | null;
    user: { id: number; nickname: string; email: string } | null;
    login: (token: string, user: { id: number; nickname: string; email: string }) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
    const [user, setUser] = useState<AuthContextType["user"]>(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // JWT 만료 체크만 수행 (user 정보는 localStorage에서 가져옴)
    useEffect(() => {
        if (!token) return;

        try {
            const decoded = jwtDecode<JwtPayload>(token);
            const now = Date.now() / 1000;

            if (decoded.exp < now) {
                logout(); // 토큰 만료 시 자동 로그아웃
            }
            // user 정보는 이미 localStorage에서 로드됨
        } catch {
            logout();
        }
    }, [token]);

    const login = (newToken: string, newUser: { id: number; nickname: string; email: string }) => {
        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(newUser));
        setToken(newToken);
        setUser(newUser); // ✅ API에서 받은 user 정보 그대로 저장
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
    };

    return <AuthContext.Provider value={{ token, user, login, logout }}>{children}</AuthContext.Provider>;
};

export { AuthContext };
