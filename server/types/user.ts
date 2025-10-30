import { RowDataPacket } from "mysql2";

export interface User extends RowDataPacket {
    id: number;
    email: string;
    password: string;
    nickname: string;
    role: string;
    created_at?: string;
}
