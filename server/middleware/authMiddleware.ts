import { Request as ExRequest, Response, NextFunction } from "express";
import { verifyToken, DecodedToken } from "../utils/jwt";

export interface AuthRequest extends ExRequest {
    user?: DecodedToken;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "토큰이 없습니다." });

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token) as DecodedToken | null;

    if (!decoded) return res.status(401).json({ message: "유효하지 않은 토큰입니다." });

    req.user = decoded;
    next();
};

export const adminMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    authMiddleware(req, res, () => {
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ message: "관리자 권한이 필요합니다." });
        }
        next();
    });
};
