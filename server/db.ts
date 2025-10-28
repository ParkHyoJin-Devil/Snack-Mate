import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config(); // .env 읽기

export const db = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "snackmate",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
