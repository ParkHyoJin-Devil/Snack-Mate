import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { db } from "./db";
import snacksRouter from "./routes/snacks";
import recipesRouter from "./routes/recipes";
import toolsRouter from "./routes/tools";
import ingredientsRouter from "./routes/ingredients";
import registerRouter from "./routes/register";
import loginRouter from "./routes/login";
import emailVerificationRouter from "./routes/emailVerification";
import adminRouter from "./routes/admin";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(cors());
app.use(express.json());

// DB 인스턴스를 라우트에서 접근 가능하도록 설정
app.locals.db = db;

// 로컬 이미지 제공
if (process.env.NODE_ENV !== "production") {
    const imagesPath = path.resolve(__dirname, "../../images");
    app.use("/images", express.static(imagesPath));
}

// API 라우트
app.use("/api/snacks", snacksRouter);
app.use("/api/recipes", recipesRouter);
app.use("/api/tools", toolsRouter);
app.use("/api/ingredients", ingredientsRouter);
app.use("/api/register", registerRouter);
app.use("/api/login", loginRouter);
app.use("/api/email", emailVerificationRouter);
app.use("/api/admin", adminRouter);

// 서버 시작 (한 번만)
app.listen(PORT, () => {
    console.log(`Backend running on ${process.env.VITE_SERVER_URL}`);
});
