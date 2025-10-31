import { Router } from "express";
import { db } from "../db";
import {
    createFullRecipe,
    updateFullRecipe,
    deleteFullRecipe,
    createSnack,
    updateSnack,
    createGetAllHandler
} from "../db/dbHandlers";
import { adminMiddleware, AuthRequest } from "../middleware/authMiddleware";
import { RowDataPacket } from "mysql2";
import { Step, Ingredient, Tool, Image } from "../types/recipe";
// import multer from "multer";
// import path from "path";
// import fs from "fs";

const router = Router();

// 테스트용 레시피 상세 조회 엔드포인트 (인증 없이) - 미들웨어 앞에 추가
router.get("/test/recipes/:id", async (req, res) => {
    const recipeId = req.params.id;
    try {
        // snacks 테이블에서 기본 정보 조회
        const [snackRows] = await db.query<RowDataPacket[]>("SELECT * FROM snacks WHERE id = ?", [recipeId]);

        if (snackRows.length === 0) {
            return res.status(404).json({ message: "레시피를 찾을 수 없습니다." });
        }

        const snack = snackRows[0];

        const [steps] = await db.query<RowDataPacket[]>(
            "SELECT * FROM recipe_steps WHERE recipe_id = ? ORDER BY step_number",
            [recipeId]
        );
        const [ingredients] = await db.query<RowDataPacket[]>("SELECT * FROM recipe_ingredients WHERE recipe_id = ?", [recipeId]);
        const [tools] = await db.query<RowDataPacket[]>("SELECT * FROM recipe_tools WHERE recipe_id = ?", [recipeId]);
        const [images] = await db.query<RowDataPacket[]>(
            "SELECT * FROM recipe_images WHERE recipe_id = ? ORDER BY step_number, image_order",
            [recipeId]
        );

        
        res.json({
            recipe: {
                id: snack.id,
                title: snack.title,
                provider: snack.author,
                recipeLicense: snack.license,
                link: snack.link,
                category: snack.category,
                thumbnail_file_name: snack.thumbnail_file_name,
                created_at: snack.created_at,
                updated_at: snack.updated_at
            },
            steps: steps as Step[],
            ingredients: ingredients as Ingredient[],
            tools: tools as Tool[],
            images: images as Image[]
        });
    } catch (err) {
        console.error('[TEST] Error:', err);
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        res.status(500).json({ message: "서버 오류", error: errorMessage });
    }
});

// // Multer 설정 - 썸네일 이미지 업로드
// const thumbnailStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const uploadPath = path.join(process.cwd(), 'images', 'Thumbnail');
//         // 폴더가 없으면 생성
//         if (!fs.existsSync(uploadPath)) {
//             fs.mkdirSync(uploadPath, { recursive: true });
//         }
//         cb(null, uploadPath);
//     },
//     filename: (req, file, cb) => {
//         // 파일명: 타임스탬프_원본파일명
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         const fileExtension = path.extname(file.originalname);
//         const fileName = `thumbnail_${uniqueSuffix}${fileExtension}`;
//         cb(null, fileName);
//     }
// });

// const uploadThumbnail = multer({
//     storage: thumbnailStorage,
//     limits: {
//         fileSize: 10 * 1024 * 1024, // 10MB
//     },
//     fileFilter: (req, file, cb) => {
//         // 이미지 파일만 허용
//         if (file.mimetype.startsWith('image/')) {
//             cb(null, true);
//         } else {
//             cb(new Error('이미지 파일만 업로드 가능합니다.'));
//         }
//     }
// });

// 임시 테스트용 레시피 상세 조회 엔드포인트 (인증 우회)
router.get("/debug/recipes/:id", async (req, res) => {
    const recipeId = req.params.id;
    try {
        // snacks 테이블에서 기본 정보 조회
        const [snackRows] = await db.query<RowDataPacket[]>("SELECT * FROM snacks WHERE id = ?", [recipeId]);

        if (snackRows.length === 0) {
            return res.status(404).json({ message: "레시피를 찾을 수 없습니다." });
        }

        const snack = snackRows[0];

        // recipes 테이블과 관련 테이블에서 상세 정보 조회
        const [recipeRows] = await db.query<RowDataPacket[]>("SELECT * FROM recipes WHERE id = ?", [recipeId]);
        const [steps] = await db.query<RowDataPacket[]>(
            "SELECT * FROM recipe_steps WHERE recipe_id = ? ORDER BY step_number",
            [recipeId]
        );
        const [ingredients] = await db.query<RowDataPacket[]>("SELECT * FROM recipe_ingredients WHERE recipe_id = ?", [recipeId]);
        const [tools] = await db.query<RowDataPacket[]>("SELECT * FROM recipe_tools WHERE recipe_id = ?", [recipeId]);
        const [images] = await db.query<RowDataPacket[]>(
            "SELECT * FROM recipe_images WHERE recipe_id = ? ORDER BY step_number, image_order",
            [recipeId]
        );

        
  
        res.json({
            success: true,
            data: {
                snack: snack,
                recipe: recipeRows[0],
                steps: steps,
                ingredients: ingredients,
                tools: tools,
                images: images
            }
        });
    } catch (err) {
        console.error('[DEBUG] Error:', err);
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        res.status(500).json({ message: "서버 오류", error: errorMessage });
    }
});

// 모든 관리자 라우트에 관리자 미들웨어 적용
router.use(adminMiddleware);

// 전체 레시피 목록 조회 (관리자용) - snacks 테이블에서 조회
router.get("/recipes", createGetAllHandler("snacks", ["id", "title", "thumbnail_file_name", "link", "category", "author", "license", "views", "created_at"]));

// 특정 레시피 상세 조회 (recipes 테이블에서 상세 정보 가져오기)
router.get("/recipes/:id", async (req: AuthRequest, res) => {
    const recipeId = req.params.id;

    try {
        // snacks 테이블에서 기본 정보 조회
        const [snackRows] = await db.query<RowDataPacket[]>("SELECT * FROM snacks WHERE id = ?", [recipeId]);

        if (snackRows.length === 0) {
            return res.status(404).json({ message: "레시피를 찾을 수 없습니다." });
        }

        const snack = snackRows[0];

        const [steps] = await db.query<RowDataPacket[]>(
            "SELECT * FROM recipe_steps WHERE recipe_id = ? ORDER BY step_number",
            [recipeId]
        );

        const [ingredients] = await db.query<RowDataPacket[]>("SELECT * FROM recipe_ingredients WHERE recipe_id = ?", [recipeId]);

        const [tools] = await db.query<RowDataPacket[]>("SELECT * FROM recipe_tools WHERE recipe_id = ?", [recipeId]);

        const [images] = await db.query<RowDataPacket[]>(
            "SELECT * FROM recipe_images WHERE recipe_id = ? ORDER BY step_number, image_order",
            [recipeId]
        );

  
        res.json({
            recipe: {
                id: snack.id,
                title: snack.title,
                provider: snack.author,
                recipeLicense: snack.license,
                link: snack.link,
                category: snack.category,
                thumbnail_file_name: snack.thumbnail_file_name,
                created_at: snack.created_at,
                updated_at: snack.updated_at
            },
            steps: steps as Step[],
            ingredients: ingredients as Ingredient[],
            tools: tools as Tool[],
            images: images as Image[]
        });
    } catch (err) {
        console.error('[API] Error in recipe detail endpoint:', err);
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        res.status(500).json({ message: "레시피 조회 실패", error: errorMessage });
    }
});

// 새 레시피 생성 (snacks 테이블에 저장)
router.post("/recipes", async (req: AuthRequest, res) => {
    const {
        title,
        provider,
        recipeLicense,
        recipeLink,
        category,
        author,
        license
    } = req.body;

    if (!title) {
        return res.status(400).json({ message: "title은 필수입니다." });
    }

    try {
        const snackId = await createSnack({
            title,
            thumbnail_file_name: undefined, // 임시로 undefined 처리
            link: recipeLink,
            category,
            author: provider || author,
            license: recipeLicense || license
        });

        res.status(201).json({
            message: "레시피 생성 완료",
            id: snackId
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "레시피 생성 실패" });
    }
});

// 레시피 수정 (snacks 테이블과 recipes 테이블 모두 업데이트)
router.put("/recipes/:id", async (req: AuthRequest, res) => {
    const recipeId = parseInt(req.params.id);
    const {
        title,
        provider,
        recipeLicense,
        recipeLink,
        category,
        author,
        license,
        steps = [],
        ingredients = [],
        tools = [],
        images = []
    } = req.body;

    if (!title) {
        return res.status(400).json({ message: "title은 필수입니다." });
    }

    try {
        // 1. snacks 테이블 업데이트
        await updateSnack(recipeId, {
            title,
            thumbnail_file_name: undefined,
            link: recipeLink,
            category,
            author: provider || author,
            license: recipeLicense || license
        });

        // 2. recipes 테이블 관련 데이터 업데이트
        // 먼저 기존 레시피가 있는지 확인
        const [existingRecipe] = await db.query<RowDataPacket[]>("SELECT id FROM recipes WHERE id = ?", [recipeId]);

        if (existingRecipe.length > 0) {
            // 기존 레시피가 있으면 업데이트
            await updateFullRecipe(recipeId, {
                title,
                author: author || "",
                license: license,
                steps,
                ingredients,
                tools,
                images
            });
        } else {
            // 기존 레시피가 없으면 새로 생성
            await createFullRecipe({
                title,
                author: author || "",
                license: license,
                steps,
                ingredients,
                tools,
                images
            });
        }

        res.json({ message: "레시피 수정 완료" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "레시피 수정 실패" });
    }
});

// 레시피 삭제 (snacks 테이블과 recipes 테이블 모두 삭제)
router.delete("/recipes/:id", async (req: AuthRequest, res) => {
    const recipeId = parseInt(req.params.id);

    try {
        // 1. snacks 테이블에서 삭제
        await db.query("DELETE FROM snacks WHERE id = ?", [recipeId]);

        // 2. recipes 관련 데이터 모두 삭제
        await deleteFullRecipe(recipeId);

        res.json({ message: "레시피 삭제 완료" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "레시피 삭제 실패" });
    }
});

// 통계 정보
router.get("/stats", async (_req: AuthRequest, res) => {
    try {
        const [recipeCount] = await db.query<RowDataPacket[]>("SELECT COUNT(*) as count FROM snacks");
        const [userCount] = await db.query<RowDataPacket[]>("SELECT COUNT(*) as count FROM users");
        const [recentRecipes] = await db.query<RowDataPacket[]>(
            "SELECT id, title, created_at FROM snacks ORDER BY created_at DESC LIMIT 5"
        );

        res.json({
            totalRecipes: recipeCount[0].count,
            totalUsers: userCount[0].count,
            recentRecipes
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "통계 조회 실패" });
    }
});

export default router;