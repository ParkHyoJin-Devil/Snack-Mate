import { db } from "../db";
import { Request, Response } from "express";
import { User } from "../types/user";
import { ResultSetHeader } from "mysql2";

/**
 * 특정 테이블 전체 데이터를 조회하는 핸들러를 생성하는 팩토리
 */
export function createGetAllHandler(tableName: string, columns: string[] = ["*"]) {
    return async (req: Request, res: Response) => {
        try {
            const query = `SELECT ${columns.join(", ")} FROM ${tableName}`;
            const [rows] = await db.query(query);
            res.json(rows);
        } catch (err) {
            console.error(`${tableName} 조회 실패:`, err);
            res.status(500).json({ message: "DB 조회 실패" });
        }
    };
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
    const [rows] = await db.query<User[]>("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0];
}

export async function createUser(
    email: string,
    hashedPassword: string,
    nickname: string
): Promise<Omit<User, "password" | "created_at">> {
    // db.query 타입 지정
    const [result] = await db.query<ResultSetHeader>("INSERT INTO users (email, password, nickname) VALUES (?, ?, ?)", [
        email,
        hashedPassword,
        nickname,
    ]);

    return {
        id: result.insertId,
        email,
        nickname,
        role: "user",
    };
}
