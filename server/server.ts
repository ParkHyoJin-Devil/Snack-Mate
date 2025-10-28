import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import snacksRouter from "./routes/snacks";
import recipesRouter from "./routes/recipes";
import toolsRouter from "./routes/tools";
import ingredientsRouter from "./routes/ingredients";
import registerRouter from "./routes/register";
import loginRouter from "./routes/login";
import emailVerificationRouter from "./routes/emailVerification";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// API 라우트
app.use("/api/snacks", snacksRouter);
app.use("/api/recipes", recipesRouter);
app.use("/api/tools", toolsRouter);
app.use("/api/ingredients", ingredientsRouter);
app.use("/api/register", registerRouter);
app.use("/api/login", loginRouter);
app.use("/api/email", emailVerificationRouter);

// 로컬 이미지 제공
if (process.env.NODE_ENV !== "production") {
    const imagesPath = path.resolve(__dirname, "../../images");

    // 이미지 요청 확인용 로그
    app.use("/images", (req, res, next) => {
        const imagesPath = path.resolve(__dirname, "../images");
        const requestedPath = path.join(imagesPath, req.path);
        console.log("Requested image URL:", req.url);
        console.log("Resolved file path:", requestedPath);
        next();
    });

    app.use("/images", express.static(imagesPath));
}

// 요청 로깅
app.use((req, res, next) => {
    console.log(req.url);
    next();
});

// 서버 시작 (한 번만)
app.listen(PORT, () => {
    console.log(`Backend running on ${process.env.VITE_SERVER_URL}`);
});
