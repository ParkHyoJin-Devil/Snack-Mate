import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET as string;

export interface DecodedToken {
    id: number | string; // generateToken에서 넣은 userId
    role: string;
    iat?: number;
    exp?: number;
}

export function generateToken(user: { id: number; role: string }) {
    return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: "1h" });
}

// 반환 타입 명시
export const verifyToken = (token: string): DecodedToken | null => {
    try {
        return jwt.verify(token, SECRET_KEY) as DecodedToken;
    } catch {
        return null;
    }
};
