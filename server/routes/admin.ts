import { Router } from "express";
import { db } from "../db";
import {
    createFullRecipe,
    updateFullRecipe,
    deleteFullRecipe,
    createGetAllHandler
} from "../db/dbHandlers";
import { adminMiddleware, AuthRequest } from "../middleware/authMiddleware";
import { RowDataPacket } from "mysql2";
import { Recipe, Step, Ingredient, Tool, Image } from "../types/recipe";

const router = Router();

// 모든 관리자 라우트에 관리자 미들웨어 적용
router.use(adminMiddleware);

// 전체 레시피 목록 조회 (관리자용)
router.get("/recipes", createGetAllHandler("recipes", ["id", "title", "author", "license", "created_at", "updated_at"]));

// 특정 레시피 상세 조회 (관련 데이터 모두 포함)
router.get("/recipes/:id", async (req: AuthRequest, res) => {
    const recipeId = req.params.id;

    try {
        const [recipeRows] = await db.query<RowDataPacket[]>("SELECT * FROM recipes WHERE id = ?", [recipeId]);
        const [steps] = await db.query<RowDataPacket[]>(
            "SELECT * FROM recipe_steps WHERE recipe_id = ? ORDER BY step_number",
            [recipeId]
        );
        const [ingredients] = await db.query<RowDataPacket[]>("SELECT * FROM recipe_ingredients WHERE recipe_id = ?", [
            recipeId,
        ]);
        const [tools] = await db.query<RowDataPacket[]>("SELECT * FROM recipe_tools WHERE recipe_id = ?", [recipeId]);
        const [images] = await db.query<RowDataPacket[]>(
            "SELECT * FROM recipe_images WHERE recipe_id = ? ORDER BY step_number, image_order",
            [recipeId]
        );

        const recipe = recipeRows[0] as Recipe;
        res.json({
            recipe,
            steps: steps as Step[],
            ingredients: ingredients as Ingredient[],
            tools: tools as Tool[],
            images: images as Image[],
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "레시피 조회 실패" });
    }
});

// 새 레시피 생성 (관련 데이터 모두 포함)
router.post("/recipes", async (req: AuthRequest, res) => {
    const {
        title,
        author,
        license,
        steps = [],
        ingredients = [],
        tools = [],
        images = []
    } = req.body;

    if (!title || !author) {
        return res.status(400).json({ message: "title과 author는 필수입니다." });
    }

    try {
        const recipeId = await createFullRecipe({
            title,
            author,
            license,
            steps,
            ingredients,
            tools,
            images
        });

        res.status(201).json({
            message: "레시피 생성 완료",
            id: recipeId
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "레시피 생성 실패" });
    }
});

// 레시피 수정 (관련 데이터 모두 포함)
router.put("/recipes/:id", async (req: AuthRequest, res) => {
    const recipeId = parseInt(req.params.id);
    const {
        title,
        author,
        license,
        steps = [],
        ingredients = [],
        tools = [],
        images = []
    } = req.body;

    if (!title || !author) {
        return res.status(400).json({ message: "title과 author는 필수입니다." });
    }

    try {
        await updateFullRecipe(recipeId, {
            title,
            author,
            license,
            steps,
            ingredients,
            tools,
            images
        });

        res.json({ message: "레시피 수정 완료" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "레시피 수정 실패" });
    }
});

// 레시피 삭제 (관련 데이터 모두 포함)
router.delete("/recipes/:id", async (req: AuthRequest, res) => {
    const recipeId = parseInt(req.params.id);

    try {
        await deleteFullRecipe(recipeId);
        res.json({ message: "레시피 삭제 완료" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "레시피 삭제 실패" });
    }
});

// 통계 정보
router.get("/stats", async (req: AuthRequest, res) => {
    try {
        const [recipeCount] = await db.query<RowDataPacket[]>("SELECT COUNT(*) as count FROM recipes");
        const [userCount] = await db.query<RowDataPacket[]>("SELECT COUNT(*) as count FROM users");
        const [recentRecipes] = await db.query<RowDataPacket[]>(
            "SELECT id, title, created_at FROM recipes ORDER BY created_at DESC LIMIT 5"
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