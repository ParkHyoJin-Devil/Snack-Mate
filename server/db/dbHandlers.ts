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

// 레시피 관련 CRUD 핸들러들
export async function createRecipe(title: string, author: string, license?: string): Promise<number> {
    const [result] = await db.query<ResultSetHeader>(
        "INSERT INTO recipes (title, author, license) VALUES (?, ?, ?)",
        [title, author, license || null]
    );
    return result.insertId;
}

export async function updateRecipe(id: number, title: string, author: string, license?: string): Promise<void> {
    await db.query(
        "UPDATE recipes SET title = ?, author = ?, license = ? WHERE id = ?",
        [title, author, license || null, id]
    );
}

export async function deleteRecipe(id: number): Promise<void> {
    await db.query("DELETE FROM recipes WHERE id = ?", [id]);
}

// 스텝 관련 CRUD
export async function createSteps(recipeId: number, steps: Array<{ step_number: number; description: string; author?: string; license?: string }>): Promise<void> {
    if (steps.length === 0) return;

    const values = steps.map(step => [
        recipeId,
        step.step_number,
        step.description,
        step.author || null,
        step.license || null
    ]);

    await db.query(
        "INSERT INTO recipe_steps (recipe_id, step_number, description, author, license) VALUES ?",
        [values]
    );
}

export async function updateSteps(recipeId: number, steps: Array<{ id?: number; step_number: number; description: string; author?: string; license?: string }>): Promise<void> {
    for (const step of steps) {
        if (step.id) {
            await db.query(
                "UPDATE recipe_steps SET step_number = ?, description = ?, author = ?, license = ? WHERE id = ? AND recipe_id = ?",
                [step.step_number, step.description, step.author || null, step.license || null, step.id, recipeId]
            );
        } else {
            await db.query(
                "INSERT INTO recipe_steps (recipe_id, step_number, description, author, license) VALUES (?, ?, ?, ?, ?)",
                [recipeId, step.step_number, step.description, step.author || null, step.license || null]
            );
        }
    }
}

export async function deleteSteps(recipeId: number): Promise<void> {
    await db.query("DELETE FROM recipe_steps WHERE recipe_id = ?", [recipeId]);
}

// 재료 관련 CRUD
export async function createIngredients(recipeId: number, ingredients: Array<{ name: string; amount?: string }>): Promise<void> {
    if (ingredients.length === 0) return;

    const values = ingredients.map(ingredient => [recipeId, ingredient.name, ingredient.amount || null]);

    await db.query(
        "INSERT INTO recipe_ingredients (recipe_id, name, amount) VALUES ?",
        [values]
    );
}

export async function updateIngredients(recipeId: number, ingredients: Array<{ id?: number; name: string; amount?: string }>): Promise<void> {
    for (const ingredient of ingredients) {
        if (ingredient.id) {
            await db.query(
                "UPDATE recipe_ingredients SET name = ?, amount = ? WHERE id = ? AND recipe_id = ?",
                [ingredient.name, ingredient.amount || null, ingredient.id, recipeId]
            );
        } else {
            await db.query(
                "INSERT INTO recipe_ingredients (recipe_id, name, amount) VALUES (?, ?, ?)",
                [recipeId, ingredient.name, ingredient.amount || null]
            );
        }
    }
}

export async function deleteIngredients(recipeId: number): Promise<void> {
    await db.query("DELETE FROM recipe_ingredients WHERE recipe_id = ?", [recipeId]);
}

// 도구 관련 CRUD
export async function createTools(recipeId: number, tools: Array<{ name: string }>): Promise<void> {
    if (tools.length === 0) return;

    const values = tools.map(tool => [recipeId, tool.name]);

    await db.query(
        "INSERT INTO recipe_tools (recipe_id, name) VALUES ?",
        [values]
    );
}

export async function updateTools(recipeId: number, tools: Array<{ id?: number; name: string }>): Promise<void> {
    for (const tool of tools) {
        if (tool.id) {
            await db.query(
                "UPDATE recipe_tools SET name = ? WHERE id = ? AND recipe_id = ?",
                [tool.name, tool.id, recipeId]
            );
        } else {
            await db.query(
                "INSERT INTO recipe_tools (recipe_id, name) VALUES (?, ?)",
                [recipeId, tool.name]
            );
        }
    }
}

export async function deleteTools(recipeId: number): Promise<void> {
    await db.query("DELETE FROM recipe_tools WHERE recipe_id = ?", [recipeId]);
}

// 이미지 관련 CRUD
export async function createImages(recipeId: number, images: Array<{ folder: string; file_name: string; step_number?: number; image_order?: number }>): Promise<void> {
    if (images.length === 0) return;

    const values = images.map(image => [recipeId, image.folder, image.file_name, image.step_number || null, image.image_order || null]);

    await db.query(
        "INSERT INTO recipe_images (recipe_id, folder, file_name, step_number, image_order) VALUES ?",
        [values]
    );
}

export async function updateImages(recipeId: number, images: Array<{ id?: number; folder: string; file_name: string; step_number?: number; image_order?: number }>): Promise<void> {
    for (const image of images) {
        if (image.id) {
            await db.query(
                "UPDATE recipe_images SET folder = ?, file_name = ?, step_number = ?, image_order = ? WHERE id = ? AND recipe_id = ?",
                [image.folder, image.file_name, image.step_number || null, image.image_order || null, image.id, recipeId]
            );
        } else {
            await db.query(
                "INSERT INTO recipe_images (recipe_id, folder, file_name, step_number, image_order) VALUES (?, ?, ?, ?, ?)",
                [recipeId, image.folder, image.file_name, image.step_number || null, image.image_order || null]
            );
        }
    }
}

export async function deleteImages(recipeId: number): Promise<void> {
    await db.query("DELETE FROM recipe_images WHERE recipe_id = ?", [recipeId]);
}

// 전체 레시피 데이터 (관련 데이터 포함) 생성
export async function createFullRecipe(recipeData: {
    title: string;
    author: string;
    license?: string;
    steps: Array<{ step_number: number; description: string; author?: string; license?: string }>;
    ingredients: Array<{ name: string; amount?: string }>;
    tools: Array<{ name: string }>;
    images: Array<{ folder: string; file_name: string; step_number?: number }>;
}): Promise<number> {
    const recipeId = await createRecipe(recipeData.title, recipeData.author, recipeData.license);

    await Promise.all([
        createSteps(recipeId, recipeData.steps),
        createIngredients(recipeId, recipeData.ingredients),
        createTools(recipeId, recipeData.tools),
        createImages(recipeId, recipeData.images)
    ]);

    return recipeId;
}

// 전체 레시피 데이터 (관련 데이터 포함) 수정
export async function updateFullRecipe(recipeId: number, recipeData: {
    title: string;
    author: string;
    license?: string;
    steps: Array<{ id?: number; step_number: number; description: string; author?: string; license?: string }>;
    ingredients: Array<{ id?: number; name: string; amount?: string }>;
    tools: Array<{ id?: number; name: string }>;
    images: Array<{ id?: number; folder: string; file_name: string; step_number?: number }>;
}): Promise<void> {
    await updateRecipe(recipeId, recipeData.title, recipeData.author, recipeData.license);

    await Promise.all([
        updateSteps(recipeId, recipeData.steps),
        updateIngredients(recipeId, recipeData.ingredients),
        updateTools(recipeId, recipeData.tools),
        updateImages(recipeId, recipeData.images)
    ]);
}

// 전체 레시피 삭제 (관련 데이터 포함)
export async function deleteFullRecipe(recipeId: number): Promise<void> {
    await Promise.all([
        deleteSteps(recipeId),
        deleteIngredients(recipeId),
        deleteTools(recipeId),
        deleteImages(recipeId),
        deleteRecipe(recipeId)
    ]);
}
