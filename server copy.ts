import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// 경로 관련 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// /images 요청 시 루트 images 폴더를 static으로 제공
app.use("/images", express.static(path.join(__dirname, "../images")));

app.use((req, res, next) => {
    console.log(req.url);
    next();
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
