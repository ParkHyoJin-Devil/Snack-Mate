import { Router } from "express";
import { db } from "../db";
import { createGetAllHandler } from "../db/dbHandlers";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Recipe, Step, Ingredient, Tool, Image } from "../types/recipe";

const router = Router();

router.get("/", createGetAllHandler("recipes"));

// // 특정 레시피 상세 조회
// router.get("/:id", async (req, res) => {
//     const recipeId = req.params.id;
//     try {
//         const [recipeRows] = await db.query("SELECT * FROM recipes WHERE id = ?", [recipeId]);
//         const [steps] = await db.query("SELECT * FROM recipe_steps WHERE recipe_id = ? ORDER BY step_number", [
//             recipeId,
//         ]);
//         const [ingredients] = await db.query("SELECT * FROM recipe_ingredients WHERE recipe_id = ?", [recipeId]);
//         const [tools] = await db.query("SELECT * FROM recipe_tools WHERE recipe_id = ?", [recipeId]);
//         const [images] = await db.query("SELECT * FROM recipe_images WHERE recipe_id = ? ORDER BY step_number", [
//             recipeId,
//         ]);

//         const recipe = recipeRows[0];
//         res.json({
//             recipe: {
//                 id: recipe.id,
//                 name: recipe.name, // SnackCard에서 recipe.title로 접근하면 안됨
//                 author: recipe.author,
//                 license: recipe.license,
//             },
//             steps,
//             ingredients,
//             tools,
//             images,
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "DB 조회 실패" });
//     }
// });

// ✅ 단일 조회
router.get("/:id", async (req, res) => {
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
            "SELECT * FROM recipe_images WHERE recipe_id = ? ORDER BY step_number",
            [recipeId]
        );

        // 타입 단언
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
        res.status(500).json({ message: "DB 조회 실패" });
    }
});

// ✅ Create: 새 레시피 추가
router.post("/", async (req, res) => {
    const { name, author, license } = req.body;

    if (!name || !author) {
        return res.status(400).json({ message: "name과 author는 필수입니다." });
    }

    try {
        const [result] = await db.query<ResultSetHeader>(
            "INSERT INTO recipes (name, author, license) VALUES (?, ?, ?)",
            [name, author, license]
        );

        res.status(201).json({ id: result.insertId, name, author, license });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "레시피 추가 실패" });
    }
});

// ✅ Update: 특정 레시피 수정
router.put("/:id", async (req, res) => {
    const recipeId = req.params.id;
    const { name, author, license } = req.body;

    try {
        await db.query("UPDATE recipes SET name = ?, author = ?, license = ? WHERE id = ?", [
            name,
            author,
            license,
            recipeId,
        ]);
        res.json({ message: "레시피 수정 완료" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "레시피 수정 실패" });
    }
});

// ✅ Delete: 특정 레시피 삭제
router.delete("/:id", async (req, res) => {
    const recipeId = req.params.id;
    try {
        await db.query("DELETE FROM recipes WHERE id = ?", [recipeId]);
        res.json({ message: "레시피 삭제 완료" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "레시피 삭제 실패" });
    }
});

export default router;
