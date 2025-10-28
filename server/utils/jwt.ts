import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET as string;

export interface DecodedToken {
    id: number | string; // generateToken에서 넣은 userId
    iat?: number;
    exp?: number;
}

export const generateToken = (userId: number | string) => {
    return jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: "1h" });
};

// 반환 타입 명시
export const verifyToken = (token: string): DecodedToken | null => {
    try {
        return jwt.verify(token, SECRET_KEY) as DecodedToken;
    } catch {
        return null;
    }
};
